import { XCircle } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/utils/cn';
import { formatDate } from '@app/utils/formatDate';

import { Popover, PopoverContent, PopoverTrigger } from './custom/popover';
import { DatePicker } from './DatePicker';

interface IDatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({ className, value, onChange, error }: IDatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <button
            type="button"
            className={cn(
              'relative h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 pt-4 text-left text-gray-700 outline-none transition-all focus:border-gray-800',
              error && '!border-red-900',
              className,
            )}
          >
            <span className="pointer-events-none absolute left-[13px] top-2 text-xs text-gray-700">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </PopoverContent>
      </Popover>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircle />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
