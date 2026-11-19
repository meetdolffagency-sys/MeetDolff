import { Link } from "react-router-dom";
import { CHROME_STORE_URL, IS_PUBLISHED } from "@/config";

interface Props {
  variant?: "primary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  onClick?: () => void;
}

const VARIANT = { primary: "btn-primary", ghost: "btn-ghost", dark: "btn-dark" } as const;
const SIZE = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;

function Icon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
    </svg>
  );
}

/**
 * The single download entry point. If VITE_CHROME_STORE_URL is configured it is
 * a real external link to the Chrome Web Store. Otherwise it routes to the
 * download page, which states honestly that the listing is not published.
 */
export function DownloadButton({ variant = "primary", size = "md", label = "Download for Chrome", className = "", onClick }: Props) {
  const cls = `btn ${VARIANT[variant]} ${SIZE[size]} ${className}`;
  if (IS_PUBLISHED) {
    return (
      <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} data-cta="download">
        <Icon />
        {label}
        <span className="sr-only"> (opens the Chrome Web Store in a new tab)</span>
      </a>
    );
  }
  return (
    <Link to="/download#release-status" className={cls} onClick={onClick} data-cta="download">
      <Icon />
      {label}
    </Link>
  );
}
