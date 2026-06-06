"use client";

interface Props {
  label: string;
  className?: string;
}

export function CookieSettingsLink({ label, className }: Props) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    window.dispatchEvent(new Event("reopen-cookie-banner"));
  }

  return (
    <button onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
