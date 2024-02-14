import { Button } from './Button';
import { TrashIcon } from './icons/TrashIcon';
import { Modal } from './Modal';

interface IConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  onConfirm,
  onClose,
  title,
  description,
  isLoading,
}: IConfirmDeleteModalProps) {
  return (
    <Modal open title="Excluir" onClose={onClose}>
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-red-0">
          <TrashIcon className="h-6 w-6 text-red-900" />
        </div>

        <p className="w-[180px] font-bold tracking-[-0.5px] text-gray-800">{title}</p>

        {description && <p className="tracking-[-0.5px] text-gray-800">{description}</p>}
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Sim, desejo excluir
        </Button>

        <Button className="w-full" variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
