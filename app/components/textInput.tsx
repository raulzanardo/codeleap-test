import React, { forwardRef } from "react";

type TextInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  ariaLabel?: string;
  onEnter?: () => void;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      className = "",
      autoFocus,
      ariaLabel,
      onEnter,
    },
    ref,
  ) => {
    return (
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
        className={`w-full border border-[#777777] rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
      />
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
