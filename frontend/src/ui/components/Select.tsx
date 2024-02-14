import { XCircle } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/utils/cn';

import {
  SelectContentRadix,
  SelectItemRadix,
  SelectRadix,
  SelectTriggerRadix,
  SelectValueRadix,
} from './custom/select';

interface ISelectProps {
  placeholder: string;
  className?: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?(value: string): void;
}

export function PrimitiveSelect({
  placeholder,
  className,
  options,
  error,
  onChange,
  value,
}: ISelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  function handleSelect(valueSelected: string) {
    setSelectedValue(valueSelected);
    onChange?.(valueSelected);
  }

  return (
    <div>
      <div className="relative">
        <label
          htmlFor={`select-${placeholder}`}
          className={cn(
            'pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-gray-700',
            selectedValue && 'left-[13px] top-2 translate-y-0 text-xs transition-all',
          )}
        >
          {placeholder}
        </label>

        <SelectRadix value={value} onValueChange={handleSelect}>
          <SelectTriggerRadix
            id={`select-${placeholder}`}
            className={cn(
              'relative h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left text-gray-800 outline-none transition-all focus:border-gray-800',
              error && '!border-red-900',
              className,
            )}
          >
            <SelectValueRadix />
          </SelectTriggerRadix>

          <SelectContentRadix className="z-[99] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
            {options.map((option) => (
              <SelectItemRadix
                key={option.value}
                value={option.value}
                className="rounded-lg text-sm text-gray-800 outline-none transition-colors data-[highlighted]:bg-gray-50 data-[state=checked]:font-bold"
              >
                {option.label}
              </SelectItemRadix>
            ))}
          </SelectContentRadix>
        </SelectRadix>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircle />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
