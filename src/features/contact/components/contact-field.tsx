type TContactFieldProps = {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    multiline?: boolean;
}

export function ContactField(props: TContactFieldProps) {
  
    return (
      <label htmlFor={props.id} className="contact-line block">
        <span className="chip-mono mb-2 block text-bone-500">{props.label}</span>
        {props.multiline ? (
          <textarea
            id={props.id}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            required={props.required}
            rows={4}
            className="block w-full resize-none border-b border-rule bg-transparent py-3 font-display text-2xl leading-snug text-bone-100 placeholder:text-bone-500 focus:border-signal focus:outline-none"
          />
        ) : (
          <input
            id={props.id}
            type={props.type}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            required={props.required}
            className="block w-full border-b border-rule bg-transparent py-3 font-display text-2xl text-bone-100 placeholder:text-bone-500 focus:border-signal focus:outline-none"
          />
        )}
      </label>
    );
  }