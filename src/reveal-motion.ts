/** Animate visible content, never whole sections or the document on scroll. */
export function observeRevealMotion(root: HTMLElement) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const known = new Set<Element>();
  const animations = new Map<Element, Animation>();
  const active = new WeakSet<Element>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const element = entry.target;
        if (element.classList.contains("r-moving-band")) {
          element.classList.toggle("f-visible", entry.isIntersecting);
          continue;
        }
        if (!entry.isIntersecting) {
          active.delete(element);
          animations.get(element)?.cancel();
          animations.delete(element);
          continue;
        }
        element.classList.add("f-visible");
        if (active.has(element)) continue;
        active.add(element);
        if (reduced.matches || document.hidden) continue;
        // Large photographs fade; small text/cards also travel a short distance.
        const translate =
          entry.boundingClientRect.height > 500
            ? 0
            : entry.boundingClientRect.top < 0
              ? -14
              : 14;
        const animation = element.animate(
          [
            { opacity: 0.25, transform: `translateY(${translate}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 480, easing: "cubic-bezier(.2,.65,.3,1)" },
        );
        animations.set(element, animation);
        animation.onfinish = () => {
          if (animations.get(element) === animation) animations.delete(element);
        };
      }
    },
    { threshold: 0, rootMargin: "0px 0px -24px 0px" },
  );
  function register(element: Element) {
    if (known.has(element)) return;
    known.add(element);
    observer.observe(element);
  }
  function scan() {
    for (const element of known) {
      if (!element.isConnected) {
        observer.unobserve(element);
        animations.get(element)?.cancel();
        animations.delete(element);
        known.delete(element);
      }
    }
    root.querySelectorAll(".f-reveal").forEach((section) => {
      if (!section.classList.contains("r-moving-band"))
        section.classList.add("f-visible");
      if (section.matches(".r-moving-band, .r-catalog-item, .f-detail-photo")) {
        register(section);
        return;
      }
      // Do not animate a parent and its descendants simultaneously.
      section
        .querySelectorAll("h2, h3, p, img, .f-button, .f-text-link")
        .forEach((element) => {
          if (!element.closest(".r-catalog-item, .f-detail-photo"))
            register(element);
        });
    });
  }
  scan();
  const mutation = new MutationObserver(scan);
  mutation.observe(root, { childList: true, subtree: true });
  const stop = () => {
    if (reduced.matches || document.hidden) {
      animations.forEach((a) => a.cancel());
      animations.clear();
    }
  };
  reduced.addEventListener("change", stop);
  document.addEventListener("visibilitychange", stop);
  return () => {
    observer.disconnect();
    mutation.disconnect();
    animations.forEach((a) => a.cancel());
    reduced.removeEventListener("change", stop);
    document.removeEventListener("visibilitychange", stop);
  };
}
