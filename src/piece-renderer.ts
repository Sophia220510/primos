import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createPieceRenderer(
  host: HTMLDivElement,
  slug: string,
  initialPaused: boolean,
) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
  camera.position.set(0, 0.5, 8.3);
  camera.lookAt(0, 0, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const material = new THREE.MeshStandardMaterial({
    color: 0xc6d2e0,
    metalness: 1,
    roughness: 0.17,
  });
  const group = new THREE.Group();
  scene.add(group);
  const geometries: THREE.BufferGeometry[] = [];
  function mesh(geometry: THREE.BufferGeometry, x = 0, y = 0, z = 0) {
    geometries.push(geometry);
    const object = new THREE.Mesh(geometry, material);
    object.position.set(x, y, z);
    group.add(object);
    return object;
  }
  if (slug === "canoplas") {
    const points = [
      [0.28, -0.28],
      [0.28, 0.32],
      [0.34, 0.36],
      [0.42, 0.31],
      [0.56, 0.18],
      [0.85, 0.02],
      [1.1, -0.06],
      [1.13, -0.12],
      [1.1, -0.2],
      [0.84, -0.16],
      [0.5, 0.03],
      [0.34, 0.18],
      [0.34, -0.28],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    mesh(new THREE.LatheGeometry(points, 64));
    group.rotation.set(0.65, 0, 0.15);
  } else if (slug === "guidoes") {
    const points = [
      [-1.6, 0.7, 0],
      [-1.1, 0.7, 0],
      [-0.85, 0.6, 0],
      [-0.65, 0.05, 0.15],
      [-0.4, 0, 0.2],
      [0.4, 0, 0.2],
      [0.65, 0.05, 0.15],
      [0.85, 0.6, 0],
      [1.1, 0.7, 0],
      [1.6, 0.7, 0],
    ].map((p) => new THREE.Vector3(...(p as [number, number, number])));
    mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        80,
        0.075,
        16,
        false,
      ),
    );
    group.position.y = -0.3;
  } else {
    for (let i = -1; i <= 1; i++) {
      mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 2.45, 16),
        i * 0.45,
        -0.3,
        0,
      );
      mesh(new THREE.TorusGeometry(0.21, 0.035, 12, 48), i * 0.45, 1.12, 0);
    }
    group.rotation.z = -0.45;
  }
  const initial = group.rotation.clone();
  let paused = initialPaused,
    visible = true,
    disposed = false,
    dragging = false,
    lastX = 0,
    lastTime = 0;
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const render = () => renderer.render(scene, camera);
  const sync = () => {
    renderer.setAnimationLoop(
      !paused && visible && !document.hidden
        ? (time) => {
            if (time - lastTime < 32) return;
            const delta = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;
            if (!dragging) group.rotation.y += delta * 0.2;
            render();
          }
        : null,
    );
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(host);
  const resize = new ResizeObserver(() => {
    if (disposed) return;
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    render();
  });
  resize.observe(host);
  const down = (event: PointerEvent) => {
    dragging = true;
    lastX = event.clientX;
    renderer.domElement.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (!dragging) return;
    group.rotation.y += (event.clientX - lastX) * 0.012;
    lastX = event.clientX;
    render();
  };
  const up = () => {
    dragging = false;
  };
  const reduce = () => {
    if (motion.matches) {
      paused = true;
      sync();
    }
  };
  renderer.domElement.addEventListener("pointerdown", down);
  renderer.domElement.addEventListener("pointermove", move);
  renderer.domElement.addEventListener("pointerup", up);
  renderer.domElement.addEventListener("pointercancel", up);
  document.addEventListener("visibilitychange", sync);
  motion.addEventListener("change", reduce);
  sync();
  return {
    rotate(v: number) {
      group.rotation.y += v;
      render();
    },
    reset() {
      group.rotation.copy(initial);
      render();
    },
    pause(v: boolean) {
      paused = v;
      sync();
    },
    dispose() {
      disposed = true;
      observer.disconnect();
      resize.disconnect();
      renderer.setAnimationLoop(null);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", reduce);
      geometries.forEach((g) => g.dispose());
      material.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
