import { useEffect, useState } from "react";
import Button from "./button";

type ModalProps = {
  open: boolean;
  title?: string;
  onClose?: () => void;
  onSubmit?: (value: string) => void;

  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  showOverlay?: boolean;
  subtitle?: string;
  width?: string;
  actions?: Array<{
    key?: string | number;
    label: React.ReactNode;
    variant?: "primary" | "danger" | "success" | "outline" | "outlineBlack";
    onClick?: (value?: string) => void;
    disabled?: boolean;
    ariaLabel?: string;
  }>;
  children?: React.ReactNode;
};

export function Modal({
  open,
  title = "Welcome to CodeLeap network!",
  onClose,
  onSubmit,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  showOverlay = true,
  subtitle,
  width = "w-lg",
  actions,
  children,
}: ModalProps) {
  const [value, setValue] = useState("");
  const [mouseDownOnOverlay, setMouseDownOnOverlay] = useState(false);

  useEffect(() => {
    if (open) setValue("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && closeOnEsc && onClose) onClose();
    }
    if (open && closeOnEsc) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, closeOnEsc]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: showOverlay ? "rgba(119,119,119,0.8)" : "transparent",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setMouseDownOnOverlay(true);
        }
      }}
      onClick={(e) => {
        if (
          e.target === e.currentTarget &&
          closeOnOverlayClick &&
          mouseDownOnOverlay &&
          onClose
        ) {
          onClose();
        }
        setMouseDownOnOverlay(false);
      }}
    >
      <div className={`bg-white rounded-2xl p-6 ${width} max-w-[95vw]`}>
        <h2 className="text-[22px] font-semibold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[16px] text-gray-600 mb-2">{subtitle}</p>
        )}

        <div className="w-full">{children}</div>

        <div className="flex items-center gap-3 justify-end">
          {actions && actions.length > 0 ? (
            actions.map((a, idx) => (
              <Button
                key={a.key ?? idx}
                variant={a.variant}
                onClick={() => a.onClick?.(value)}
                ariaLabel={a.ariaLabel}
                disabled={a.disabled}
              >
                {a.label}
              </Button>
            ))
          ) : (
            <Button
              variant="primary"
              onClick={() => onSubmit?.(value)}
              ariaLabel="Enter"
            >
              <span>ENTER</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
