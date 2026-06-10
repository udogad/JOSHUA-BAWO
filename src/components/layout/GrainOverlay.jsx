export function GrainOverlay() {
  return (
    <svg className="grain-overlay" aria-hidden="true">
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
