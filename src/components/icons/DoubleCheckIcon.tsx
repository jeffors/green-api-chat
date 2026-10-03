export default function DoubleCheckIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 24 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 9.5l5 5L16 3" />
      <path d="M10 13.5l1 1L22 3" />
    </svg>
  );
}
