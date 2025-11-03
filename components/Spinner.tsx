interface SpinnerProps {
  size?: number; // px
  className?: string;
  ariaLabel?: string;
}

export default function Spinner({
  size = 48,
  className = "",
  ariaLabel = "loading"
}: SpinnerProps) {
  const px = `${size}px`;
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      className={`animate-spin h-(--spinner-size) w-(--spinner-size) ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ ["--spinner-size" as any]: px }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );
}
