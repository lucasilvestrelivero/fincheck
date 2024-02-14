import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSwiper } from 'swiper/react';

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-gradient-to-r from-gray-100 to-transparent"
        onClick={() => swiper.slidePrev()}
        aria-label="previous"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
      </button>

      <button
        type="button"
        className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-gradient-to-l from-gray-100 to-transparent"
        onClick={() => swiper.slideNext()}
        aria-label="next"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-800" />
      </button>
    </>
  );
}
