import { IBankAccount } from '@app/entities/BankAccount';
import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { BankAccountTypeIcon } from '@ui/components/icons/BankAccountTypeIcon';

import { useDashboard } from '../DashboardContext/useDashboard';

interface IAccountCardProps {
  data: IBankAccount;
}

export function AccountCard({ data }: IAccountCardProps) {
  const { color, name, currentBalance, type } = data;

  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <div
      className="flex h-[200px] flex-col justify-between rounded-2xl border-b-4 border-b-teal-950 bg-white p-4"
      style={{ borderBottomColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
      aria-hidden
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="mt-4 block font-medium tracking-[-0.5px] text-gray-800">{name}</span>
      </div>

      <div>
        <span
          className={cn(
            'block font-medium tracking-[-0.5px] text-gray-800',
            !areValuesVisible && 'blur-sm',
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  );
}
