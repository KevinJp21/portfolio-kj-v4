import { type UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib";

type TContactFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "textarea" | "radio";
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: string;
  options?: string[];
  selectedValue?: string;
  radioLayout?: "pill" | "grid" | "list";
};

export function ContactField({
  id,
  label,
  placeholder,
  type,
  required,
  registration,
  error,
  options,
  selectedValue,
  radioLayout = "pill",
}: TContactFieldProps) {
  const { ref, ...reg } = registration;

  if (type === "radio" && options) {
    const containerClass =
      radioLayout === "grid"
        ? "grid grid-cols-2 gap-2"
        : radioLayout === "list"
          ? "space-y-2"
          : "flex flex-wrap gap-2";

    return (
      <div className="contact-line block">
        <span className="chip-mono mb-3 block text-bone-500">{label}</span>
        <div className={containerClass}>
          {options.map((option) => {
            const active = selectedValue === option;
            return (
              <label
                key={option}
                className={cn(
                  "cursor-pointer border text-sm transition-colors",
                  radioLayout === "grid"
                    ? cn(
                        "w-full rounded-xl px-3 py-3",
                        active
                          ? "border-signal bg-signal/10 text-bone-100"
                          : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                      )
                    : radioLayout === "list"
                      ? cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-3",
                          active
                            ? "border-signal bg-signal/10 text-bone-100"
                            : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                        )
                      : cn(
                          "rounded-full px-3 py-2",
                          active
                            ? "border-signal bg-signal/10 text-bone-100"
                            : "border-rule text-bone-400 hover:border-rule-strong hover:text-bone-100"
                        )
                )}
              >
                <input
                  type="radio"
                  value={option}
                  {...reg}
                  ref={ref}
                  className="sr-only"
                />
                <span>{option}</span>
                {radioLayout === "list" && (
                  <span
                    aria-hidden
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      active ? "bg-signal" : "bg-rule-strong"
                    )}
                  />
                )}
              </label>
            );
          })}
        </div>
        {error && (
          <p className="mt-2 text-xs font-medium text-red-400">{error}</p>
        )}
      </div>
    );
  }

  return (
    <label htmlFor={id} className="contact-line block">
      <span className="chip-mono mb-2 block text-bone-500">{label}</span>
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="block w-full resize-none border-b border-rule bg-transparent py-3 font-display text-2xl leading-snug text-bone-100 placeholder:text-bone-500 focus:border-signal focus:outline-none"
          {...reg}
          ref={ref}
        />
      ) : (
        <input
          id={id}
          type={type || "text"}
          placeholder={placeholder}
          required={required}
          className="block w-full border-b border-rule bg-transparent py-3 font-display text-2xl text-bone-100 placeholder:text-bone-500 focus:border-signal focus:outline-none"
          {...reg}
          ref={ref}
        />
      )}
      {error && (
        <p className="mt-2 text-xs font-medium text-red-400">{error}</p>
      )}
    </label>
  );
}