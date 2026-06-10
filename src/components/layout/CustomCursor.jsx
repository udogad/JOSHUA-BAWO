import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!canHover.matches) return undefined;

    let frameId;
    let currentX = -40;
    let currentY = -40;
    let targetX = -40;
    let targetY = -40;

    const updateTarget = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const updateHover = (event) => {
      const interactive = event.target.closest(
        "a, button, input, select, textarea, [data-cursor]"
      );
      cursorRef.current?.classList.toggle("is-hovering", Boolean(interactive));
    };

    const render = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", updateTarget, { passive: true });
    document.addEventListener("mouseover", updateHover, { passive: true });
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", updateTarget);
      document.removeEventListener("mouseover", updateHover);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
