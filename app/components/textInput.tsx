import { forwardRef } from "react";

type TextInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  title?: string; // label shown above input
  className?: string;
  autoFocus?: boolean;
  ariaLabel?: string;
  onEnter?: () => void;
  multiline?: boolean;
  rows?: number;
};

const TextInput = forwardRef<any, TextInputProps>(
  (
    {
      value,
      onChange,
      title,
      placeholder,
      className = "",
      autoFocus,
      ariaLabel,
      onEnter,
      multiline = false,
      rows = 6,
    },
    ref,
  ) => {
    return (
      <div>
        {title ? <p className="text-base text-gray-600 mb-2">{title}</p> : null}
        {multiline ? (
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            autoFocus={autoFocus}
            rows={rows}
            className={`w-full border border-[#777777] rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary resize-vertical placeholder-[#CCCCCC] ${className} text-sm`}
          />
        ) : (
          <input
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            autoFocus={autoFocus}
            onKeyDown={(e) => {
              if (e.key === "Enter") onEnter?.();
            }}
            className={`w-full border border-[#777777] rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary placeholder-[#CCCCCC] ${className} text-sm`}
          />
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
