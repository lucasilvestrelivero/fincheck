import { Controller } from 'react-hook-form';

import { Button } from '@ui/components/Button';
import { ColorsDropdownInput } from '@ui/components/ColorsDropdownInput';
import { Input } from '@ui/components/Input';
import { InputCurrency } from '@ui/components/InputCurrency';
import { Modal } from '@ui/components/Modal';
import { PrimitiveSelect } from '@ui/components/Select';

import { useNewAccountModalController } from './useNewAccountModalController';

export function NewAccountModal() {
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
  } = useNewAccountModalController();

  return (
    <Modal title="Nova Conta" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-xs tracking-[-0.5px] text-gray-600">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-lg tracking-[-0.5px] text-gray-600">R$</span>

            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CHECKING"
            render={({ field: { onChange, value } }) => (
              <PrimitiveSelect
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    value: 'CHECKING',
                    label: 'Conta Corrente',
                  },
                  {
                    value: 'INVESTMENT',
                    label: 'Investimentos',
                  },
                  {
                    value: 'CASH',
                    label: 'Dinheiro Físico',
                  },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
          Criar
        </Button>
      </form>
    </Modal>
  );
}
