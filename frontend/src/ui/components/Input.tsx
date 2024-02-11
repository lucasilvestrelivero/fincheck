import { XCircleIcon } from 'lucide-react';
import { ComponentProps, forwardRef } from 'react';

import { cn } from '../../app/utils/cn';

interface IInputProps extends ComponentProps<'input'> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ placeholder, name, id, error, className, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          placeholder=" "
          className={cn(
            'peer h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-gray-800 outline-none transition-all placeholder-shown:pt-0 focus:border-gray-800',
            error && '!border-red-900',
            className,
          )}
        />

        <label
          htmlFor={inputId}
          className="pointer-events-none absolute left-[13px] top-2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base"
        >
          {placeholder}
        </label>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-red-900">
            <XCircleIcon />
            <span className="text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
