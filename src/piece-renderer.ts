import * as THREE from "three";

/** Small product studio: one model, no shadows or post-processing, demand rendering. */
export function createPieceRenderer(
  host: HTMLDivElement,
  slug: string,
  initialPaused: boolean,
  onPause: () => void,
) {
  const coarse = matchMedia("(pointer:coarse)").matches;
  const renderer = new THREE.WebGLRenderer({
    antialias: !coarse,
    alpha: true,
    powerPreference: "default",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.25 : 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  // Six tiny studio light cards, generated once. No downloaded HDR or room scene.
  const faces = Array.from({ length: 6 }, (_, i) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 128, 128);
    gradient.addColorStop(0, "#29323d");
    gradient.addColorStop(0.48, i === 2 ? "#d5e1ec" : "#728393");
    gradient.addColorStop(1, "#151e2a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = i % 2 ? "#eaf2ff" : "#ffffff";
    ctx.fillRect(i % 2 ? 20 : 65, 4, i % 2 ? 25 : 45, 120);
    ctx.fillStyle = "#202c38";
    ctx.fillRect(105, 0, 23, 128);
    return canvas;
  });
  const cube = new THREE.CubeTexture(faces);
  cube.colorSpace = THREE.SRGBColorSpace;
  cube.needsUpdate = true;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromCubemap(cube);
  cube.dispose();
  pmrem.dispose();
  scene.environment = environment.texture;
  const metal = new THREE.MeshStandardMaterial({
    color: 0xe0e5eb,
    metalness: 1,
    roughness: 0.12,
  });
  const group = new THREE.Group();
  scene.add(group);
  const geometries: THREE.BufferGeometry[] = [];
  const add = (g: THREE.BufferGeometry) => {
    geometries.push(g);
    const m = new THREE.Mesh(g, metal);
    group.add(m);
    return m;
  };
  if (slug === "hastes") {
    // Flat strap with rounded ends and a real through-hole, based on supplied photos.
    const shape = new THREE.Shape();
    shape.moveTo(-0.23, -1.65);
    shape.lineTo(-0.23, 1.42);
    shape.quadraticCurveTo(-0.23, 1.65, 0, 1.65);
    shape.quadraticCurveTo(0.23, 1.65, 0.23, 1.42);
    shape.lineTo(0.23, -1.65);
    shape.quadraticCurveTo(0.23, -1.74, 0.14, -1.74);
    shape.lineTo(-0.14, -1.74);
    shape.quadraticCurveTo(-0.23, -1.74, -0.23, -1.65);
    const hole = new THREE.Path();
    hole.absellipse(0, 1.36, 0.105, 0.14, 0, Math.PI * 2, true, 0);
    shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
      steps: 1,
      curveSegments: 18,
    });
    geometry.center();
    add(geometry);
    const second = new THREE.Mesh(geometry, metal);
    second.position.set(0.58, -0.17, -0.12);
    second.rotation.z = -0.08;
    group.add(second);
    group.position.x = -0.25;
    group.rotation.set(0.15, -0.6, -0.43);
  } else if (slug === "canoplas") {
    // Open cylindrical skirt and top flange, matching the real reference family.
    const points = [
      [0.92, -0.65],
      [0.94, -0.63],
      [0.94, 0.5],
      [0.92, 0.56],
      [0.86, 0.59],
      [0.64, 0.59],
      [0.62, 0.57],
      [0.62, 0.53],
      [0.85, 0.53],
      [0.88, 0.49],
      [0.88, -0.63],
      [0.9, -0.65],
      [0.92, -0.65],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    add(new THREE.LatheGeometry(points, 64));
    group.rotation.set(0.48, -0.25, -0.14);
  } else {
    const points = [
      [-1.8, 0.9, 0],
      [-1.35, 0.9, 0],
      [-1.1, 0.83, 0],
      [-0.82, 0.28, 0.13],
      [-0.62, -0.23, 0.18],
      [-0.4, -0.3, 0.2],
      [0.4, -0.3, 0.2],
      [0.62, -0.23, 0.18],
      [0.82, 0.28, 0.13],
      [1.1, 0.83, 0],
      [1.35, 0.9, 0],
      [1.8, 0.9, 0],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
    add(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        72,
        0.085,
        16,
        false,
      ),
    );
    group.rotation.set(0.3, -0.25, -0.16);
  }
  const initial = group.rotation.clone();
  const bounds = new THREE.Box3().setFromObject(group);
  const center = bounds.getCenter(new THREE.Vector3());
  group.position.sub(center);
  const extent = bounds.getSize(new THREE.Vector3());
  let paused = initialPaused,
    visible = false,
    disposed = false,
    dragging = false,
    frame = 0,
    last = 0,
    phase = 0;
  let targetX = initial.x,
    targetY = initial.y,
    lastX = 0,
    lastY = 0;
  const motion = matchMedia("(prefers-reduced-motion:reduce)");
  function requestFrame() {
    if (!frame && !disposed && visible && !document.hidden)
      frame = requestAnimationFrame(draw);
  }
  function draw(time: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const delta = last ? Math.min((time - last) / 1000, 0.05) : 1 / 60;
    last = time;
    if (!paused && !dragging) {
      phase += delta * 0.65;
      targetY = initial.y + Math.sin(phase) * 0.7;
    }
    const ease = motion.matches ? 1 : 1 - Math.exp(-14 * delta);
    group.rotation.x += (targetX - group.rotation.x) * ease;
    group.rotation.y += (targetY - group.rotation.y) * ease;
    renderer.render(scene, camera);
    if (
      !paused ||
      Math.abs(targetY - group.rotation.y) +
        Math.abs(targetX - group.rotation.x) >
        0.001
    )
      requestFrame();
  }
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestFrame();
    else stop();
  });
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    const fov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.set(
      0,
      0,
      Math.max(
        extent.y / (2 * fov * 0.88),
        extent.x / (2 * fov * camera.aspect * 0.85),
      ) +
        extent.z * 0.35,
    );
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    requestFrame();
  });
  function pause(v: boolean) {
    paused = v;
    if (v) onPause();
    last = 0;
    requestFrame();
  }
  const down = (e: PointerEvent) => {
    dragging = true;
    paused = true;
    onPause();
    lastX = e.clientX;
    lastY = e.clientY;
    renderer.domElement.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    targetY += (e.clientX - lastX) * 0.009;
    if (e.pointerType === "mouse")
      targetX = THREE.MathUtils.clamp(
        targetX + (e.clientY - lastY) * 0.006,
        -1.1,
        1.1,
      );
    lastX = e.clientX;
    lastY = e.clientY;
    requestFrame();
  };
  const up = () => {
    dragging = false;
  };
  const visibility = () => {
    if (document.hidden) stop();
    else requestFrame();
  };
  const reduce = () => {
    if (motion.matches) pause(true);
  };
  renderer.domElement.addEventListener("pointerdown", down);
  renderer.domElement.addEventListener("pointermove", move);
  renderer.domElement.addEventListener("pointerup", up);
  renderer.domElement.addEventListener("pointercancel", up);
  document.addEventListener("visibilitychange", visibility);
  motion.addEventListener("change", reduce);
  host.appendChild(renderer.domElement);
  observer.observe(host);
  resize.observe(host);
  return {
    rotate(value: number) {
      pause(true);
      targetY += value;
      requestFrame();
    },
    reset() {
      pause(true);
      targetX = initial.x;
      targetY = initial.y;
      phase = 0;
      requestFrame();
    },
    pause,
    dispose() {
      disposed = true;
      stop();
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", reduce);
      geometries.forEach((g) => g.dispose());
      metal.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
