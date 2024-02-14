import { FilterIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MONTHS } from '@app/config/constants';
import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { formatDate } from '@app/utils/formatDate';
import emptyStateImage from '@assets/empty-state.svg';
import { CategoryIcon } from '@ui/components/icons/categories/CategoryIcon';
import { Spinner } from '@ui/components/Spinner';

import { EditTransactionModal } from '../../modals/EditTransactionModal';

import { FiltersModal } from './FiltersModal';
import { SliderNavigation } from './SliderNavigation';
import { SliderOption } from './SliderOption';
import { TransactionTypeDropdown } from './TransactionTypeDropdown';
import { useTransactionsController } from './useTransactionsController';

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    isEditModalOpen,
    transactionBeingEdited,
    handleCloseEditModal,
    handleOpenEditModal,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-gray-100 p-10">
      {isInitialLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-10 w-10" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />

          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters('type')}
                selectedType={filters.type}
              />

              <button type="button" onClick={handleOpenFiltersModal} aria-label="filter menu">
                <FilterIcon />
              </button>
            </div>

            <div className="relative mt-6">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters('month')(swiper.realIndex);
                }}
              >
                <SliderNavigation />

                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption isActive={isActive} month={month} index={index} />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
            {isLoading && (
              <div className="flex h-full flex-col items-center justify-center">
                <Spinner className="h-10 w-10" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex h-full flex-col items-center justify-center">
                <img src={emptyStateImage} alt="Empty state" />
                <p className="text-gray-700">Não encontramos nenhuma transação!</p>
              </div>
            )}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    open={isEditModalOpen}
                    onClose={handleCloseEditModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4"
                    role="button"
                    onClick={() => handleOpenEditModal(transaction)}
                    aria-hidden
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <CategoryIcon
                        type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="block font-bold tracking-[-0.5px]">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        'font-medium tracking-[-0.5px]',
                        transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                        !areValuesVisible && 'blur-sm',
                      )}
                    >
                      {transaction.type === 'EXPENSE' ? '-' : '+'}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
