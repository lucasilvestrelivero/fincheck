/* eslint-disable react/button-has-type */
import { ComponentProps } from 'react';

import { cn } from '../../app/utils/cn';

import { Spinner } from './Spinner';

interface IButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
}

export function Button({
  className,
  isLoading,
  disabled,
  children,
  variant,
  type,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'flex h-12 items-center justify-center rounded-2xl bg-teal-900 px-6 font-medium text-white transition-all hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        variant === 'danger' && 'bg-red-900 hover:bg-red-800',
        variant === 'ghost' &&
          'border border-gray-800 bg-transparent text-gray-800 hover:bg-gray-800/5',
        className,
      )}
    >
      {!isLoading && children}
      {isLoading && <Spinner className="h-6 w-6" />}
    </button>
  );
}
