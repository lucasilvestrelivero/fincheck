import { TrashIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { ITransaction } from '@app/entities/Transaction';
import { Button } from '@ui/components/Button';
import { ConfirmDeleteModal } from '@ui/components/ConfirmDeleteModal';
import { DatePickerInput } from '@ui/components/DatePickerInput';
import { Input } from '@ui/components/Input';
import { InputCurrency } from '@ui/components/InputCurrency';
import { Modal } from '@ui/components/Modal';
import { PrimitiveSelect } from '@ui/components/Select';

import { useEditTransactionModalController } from './useEditTransactionModalController';

interface IEditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: ITransaction | null;
}

export function EditTransactionModal({ transaction, onClose, open }: IEditTransactionModalProps) {
  const {
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      leftAction={
        <button type="button" onClick={handleOpenDeleteModal} aria-label="delete">
          <TrashIcon className="h-6 w-6 text-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-xs tracking-[-0.5px] text-gray-600">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency error={errors.value?.message} onChange={onChange} value={value} />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <PrimitiveSelect
                placeholder="Categoria"
                onChange={onChange}
                value={value}
                error={errors.categoryId?.message}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <PrimitiveSelect
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                onChange={onChange}
                value={value}
                error={errors.bankAccountId?.message}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput error={errors.date?.message} value={value} onChange={onChange} />
            )}
          />
        </div>

        <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
