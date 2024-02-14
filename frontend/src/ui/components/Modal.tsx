import { X } from 'lucide-react';

import { cn } from '../../app/utils/cn';

import { Dialog, DialogContent } from './custom/dialog';

interface IModalProps {
  open: boolean;
  children: React.ReactNode;
  title: string;
  leftAction?: React.ReactNode;
  onClose?(): void;
}

export function Modal({ open, title, onClose, leftAction, children }: IModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'fixed left-1/2 top-1/2 z-[51] w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 space-y-6 rounded-2xl bg-white p-6 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] outline-none',
          'data-[state=open]:animate-content-show',
        )}
      >
        <header className="flex h-12 items-center justify-between text-gray-800">
          <div className="flex h-12 w-12 items-center justify-center">{leftAction}</div>

          <span className="text-lg font-bold tracking-[-1px]">{title}</span>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center outline-none"
            onClick={onClose}
            aria-label="close"
          >
            <X className="h-6 w-6" />
          </button>
        </header>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
