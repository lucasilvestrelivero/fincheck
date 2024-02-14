import { ChevronDownIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/components/custom/dropdown-menu';
import { ExpensesIcon } from '@ui/components/icons/ExpensesIcon';
import { IncomeIcon } from '@ui/components/icons/IncomeIcon';
import { TransactionsIcon } from '@ui/components/icons/TransactionsIcon';

interface ITransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionTypeDropdown({ onSelect, selectedType }: ITransactionTypeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button type="button" className="flex items-center gap-2">
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === undefined && <TransactionsIcon />}

          <span className="text-sm font-medium tracking-[-0.5px] text-gray-800">
            {selectedType === 'EXPENSE' && 'Despesas'}
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === undefined && 'Transações'}
          </span>

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[279px]">
        <DropdownMenuItem className="gap-2" onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2" onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
