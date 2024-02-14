import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { cn } from '@app/utils/cn';
import { Button } from '@ui/components/Button';
import { Modal } from '@ui/components/Modal';

import { useFiltersModalController } from './useFiltersModalController';

interface IFiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: { bankAccountId: string | undefined; year: number }): void;
}

export function FiltersModal({ open, onClose, onApplyFilters }: IFiltersModalProps) {
  const {
    selectedBankAccountId,
    handleSelectBankAccount,
    selectedYear,
    handleChangeYear,
    accounts,
  } = useFiltersModalController();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div>
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">Conta</span>

        <div className="mt-2 space-y-2">
          {accounts.map((account) => (
            <button
              type="button"
              key={account.id}
              onClick={() => handleSelectBankAccount(account.id)}
              className={cn(
                'w-full rounded-2xl p-2 text-left text-gray-800 transition-colors hover:bg-gray-50',
                account.id === selectedBankAccountId && '!bg-gray-200',
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px]">Ano</span>

        <div className="mt-2 flex w-52 items-center justify-between">
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center"
            onClick={() => handleChangeYear(-1)}
            aria-label="previous"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">{selectedYear}</span>
          </div>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center"
            onClick={() => handleChangeYear(1)}
            aria-label="next"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Button
        className="mt-10 w-full"
        onClick={() =>
          onApplyFilters({
            bankAccountId: selectedBankAccountId,
            year: selectedYear,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal>
  );
}
