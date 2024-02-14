import { ChevronDownIcon, XCircle } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@app/utils/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './custom/dropdown-menu';
import { ColorIcon } from './icons/ColorIcon';

interface IColorsDropdownInputProps {
  error?: string;
  className?: string;
  value?: string;
  onChange?(value: string): void;
}

type Color = {
  color: string;
  bg: string;
};

const colors: Color[] = [
  { color: '#868E96', bg: '#F8F9FA' },
  { color: '#FA5252', bg: '#FFF5F5' },
  { color: '#E64980', bg: '#FFF0F6' },
  { color: '#BE4BDB', bg: '#F8F0FC' },
  { color: '#7950F2', bg: '#F3F0FF' },
  { color: '#4C6EF5', bg: '#EDF2FF' },
  { color: '#228BE6', bg: '#E7F5FF' },
  { color: '#15AABF', bg: '#E3FAFC' },
  { color: '#12B886', bg: '#E6FCF5' },
  { color: '#40C057', bg: '#EBFBEE' },
  { color: '#82C91E', bg: '#F4FCE3' },
  { color: '#FAB005', bg: '#FFF9DB' },
  { color: '#FD7E14', bg: '#FFF4E6' },
  { color: '#212529', bg: '#F8F9FA' },
];

export function ColorsDropdownInput({
  error,
  className,
  onChange,
  value,
}: IColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(() => {
    if (!value) {
      return null;
    }

    return colors.find((c) => c.color === value) ?? null;
  });

  function handleSelect(color: Color) {
    setSelectedColor(color);
    onChange?.(color.color);
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              'relative h-[52px] w-full rounded-lg border border-gray-500 bg-white px-3 text-left text-gray-700 outline-none transition-all focus:border-gray-800',
              error && '!border-red-900',
              className,
            )}
          >
            <div className="flex items-center gap-2">
              Cor
              {selectedColor && <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />}
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="h-5 w-5 text-gray-800" />
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="grid grid-cols-4">
          {colors.map((color) => (
            <DropdownMenuItem key={color.color} onSelect={() => handleSelect(color)}>
              <ColorIcon color={color.color} bg={color.bg} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-900">
          <XCircle />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
