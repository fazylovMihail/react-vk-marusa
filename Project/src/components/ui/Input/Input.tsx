import { forwardRef, InputHTMLAttributes } from "react";

import "./custom-input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconId?: string;
  modificators?: string[];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ iconId, modificators, children, ...props }, ref) => {
    const classNames = `custom-input ${modificators ? modificators.map((mod) => `custom-input--${mod}`).join(" ") : ""}`;

    return (
      <div className={classNames}>
        <input ref={ref} className="custom-input__field" {...props} />
        {iconId && (
          <svg className="custom-input__icon" width={24} height={24}>
            <use xlinkHref={`/sprite.svg#${iconId}`} />
          </svg>
        )}
        {children}
      </div>
    );
  },
);
