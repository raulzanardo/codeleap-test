// No default React import required with the automatic JSX runtime

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "success" | "outline" | "outlineBlack";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  ariaLabel,
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[8px] text-[14px] w-[120px] h-[32px]";

  const variants: Record<string, string> = {
    primary: "bg-[#7695EC] hover:bg-[#5a75d6] text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    outline: "bg-white border border-gray-300 text-black",
    outlineBlack: "bg-white border-2 border-black text-black",
  };

  const variantClassRaw = variants[variant] ?? variants.primary;

  // when disabled, apply a neutral grey style overriding variant colors
  const variantClass = disabled
    ? "bg-gray-200 text-gray-500 border-gray-200"
    : variantClassRaw;

  const disabledClasses = disabled ? "cursor-not-allowed" : "";

  const classes = `${base} ${variantClass} ${disabledClasses} ${className}`;

  return (
    <button
      aria-label={ariaLabel}
      type={type}
      onClick={(e) => {
        if (disabled) return;
        onClick?.();
      }}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
