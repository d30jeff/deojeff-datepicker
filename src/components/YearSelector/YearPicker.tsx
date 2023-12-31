import { FC, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { useYears } from '@hooks/use-year.hook';
import { isElementVisible } from '@utils/dom.util';

export type YearPickerProps = {
  classes?: {
    label?: string;
    selected?: string;
    current?: string;
  }
};

export const YearPicker: FC<YearPickerProps> = (props) => {
  const { classes } = props;
  const { state, setState, today } = useDatePickerContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<HTMLButtonElement[]>([]);
  const { update, years } = useYears();

  useEffect(() => {
    if (state.isYearPickerVisible) {
      update();
    }
  }, [state.isYearPickerVisible]);

  useEffect(() => {
    scrollToMiddle();
  }, [years]);

  const scrollToMiddle = () => {
    const buttonRef = buttonRefs.current[Math.floor(buttonRefs.current.length / 2)];

    if (buttonRef) {
      buttonRef.scrollIntoView({
        behavior: 'auto',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const listener = () => {
    const buttons = [...document.querySelectorAll('button[name="year"]')];
    const [head] = buttons.slice(0);
    const [tail] = buttons.slice(-1);

    if (containerRef.current) {
      const isHead = isElementVisible(head, containerRef.current);
      const isTail = isElementVisible(tail, containerRef.current);

      if (isHead) {
        update('up');
      } else if (isTail) {
        update('down');
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.addEventListener('scroll', listener);
    // eslint-disable-next-line consistent-return
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', listener);
      }
    };
  }, [years, state.isYearPickerVisible]);

  if (!state.isYearPickerVisible) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded">
      <div
        className="grid h-auto max-h-full grid-cols-1 overflow-scroll bg-white"
        ref={containerRef}
      >
        {years.map((date, index) => {
          const isSelected = state.date?.year() === date!.year();
          const isThisYear = date.isSame(today, 'year');
          return (
            <button
              name="year"
              ref={el => {
                if (el) {
                  buttonRefs.current[index] = el;
                }
              }}
              key={date!.year().toString()}
              id={date!.year().toString()}
              type="button"
              className={twMerge('text-black h-[40px] border-b-[1px] hover:bg-gray-300',
                classes?.label,
                isThisYear ? twMerge('font-semibold', props.classes?.current) : '',
                isSelected ? twMerge('bg-gray-300 font-semibold', classes?.selected) : '')
              }
              onClick={() => {
                setState({
                  date,
                  isYearPickerVisible: false,
                });
              }}
            >
              {date!.get('year')}
            </button>
          );
        })}
      </div>
    </div >
  );
};
