import Button from "./button";

type CardAction = {
  key?: string | number;
  label: React.ReactNode;
  variant?: "primary" | "danger" | "success" | "outline" | "outlineBlack";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

type CardProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  actions?: CardAction[];
  className?: string;
};

export function Card({
  title,
  subtitle,
  children,
  actions,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 w-full border border-[#999999] ${className}`}
    >
      {title && (
        <h2 className="text-[22px] font-semibold text-black mb-4">{title}</h2>
      )}

      {subtitle && <p className="text-[16px] text-gray-600 mb-2">{subtitle}</p>}

      <div className="w-full">{children}</div>

      <div className="flex items-center gap-3 justify-end">
        {actions && actions.length > 0
          ? actions.map((a, idx) => (
              <Button
                key={a.key ?? idx}
                variant={a.variant}
                onClick={a.onClick}
                ariaLabel={a.ariaLabel}
                disabled={a.disabled}
              >
                {a.label}
              </Button>
            ))
          : null}
      </div>
    </div>
  );
}

export default Card;
