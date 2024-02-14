import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSwiper } from 'swiper/react';

interface ISliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({ isBeginning, isEnd }: ISliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div>
      <button
        type="button"
        className="rounded-full py-3 pl-2.5 pr-3.5 transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
        aria-label="previous"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button
        type="button"
        className="rounded-full py-3 pl-2.5 pr-3.5 transition-colors enabled:hover:bg-black/10 disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
        aria-label="next"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
