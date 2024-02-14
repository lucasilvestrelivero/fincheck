import { XCircle } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

import { cn } from '../../app/utils/cn';

interface IInputCurrencyProps {
  error?: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({ error, value, onChange }: IInputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value)}
        className={cn(
          'w-full text-[32px] font-bold tracking-[-1px] text-gray-800 outline-none',
          error && 'text-red-900',
        )}
      />

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircle />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
