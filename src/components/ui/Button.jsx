import { ArrowDownRight } from "lucide-react";

export function Button({
  children,
  href,
  variant = "primary",
  icon = true,
  className = "",
  ...props
}) {
  const classes = `button button--${variant} ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        <span>{children}</span>
        {icon && <ArrowDownRight aria-hidden="true" size={18} />}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      <span>{children}</span>
      {icon && <ArrowDownRight aria-hidden="true" size={18} />}
    </button>
  );
}
