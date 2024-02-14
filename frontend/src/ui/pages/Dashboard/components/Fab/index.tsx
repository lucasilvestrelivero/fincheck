import { PlusIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/custom/dropdown-menu';
import { BankAccountIcon } from '@ui/components/icons/BankAccountIcon';
import { CategoryIcon } from '@ui/components/icons/categories/CategoryIcon';

import { useDashboard } from '../DashboardContext/useDashboard';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <div className="fixed bottom-4 right-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white"
            aria-label="Open menu"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2" onSelect={openNewAccountModal}>
            <BankAccountIcon />
            Nova Conta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
