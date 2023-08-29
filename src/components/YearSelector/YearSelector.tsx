import { Dayjs } from 'dayjs';
import { FC, ReactNode, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@components/Button';
import { YearPicker } from '@components/YearSelector/YearPicker';
import { useDatePickerContext } from '@context/DatePicker.context';

export type YearSelectorClasses = {
  container?: string;
};

export type YearSelectorProps = {
  classes?: YearSelectorClasses;
  elements?: {
    previous?: ReactNode;
    current?: (params: Dayjs) => ReactNode;
    next?: ReactNode;
  };
};

export const YearSelector: FC<YearSelectorProps> = (props) => {
  const { classes, elements } = props;
  const { state, setState, options, today } = useDatePickerContext();

  const shouldDisablePreviousYear = useCallback(() => {
    if (options?.disablePastDates) {
      return state.date!.isSame(today, 'year') || state.date!.isBefore(today, 'year');
    }

    return false;
  }, []);

  const shouldDisableNextYear = useCallback(() => {
    if (options?.disableFutureDates) {
      return state.date!.isSame(today, 'year') || state.date!.isAfter(today, 'year');
    }

    return false;
  }, []);

  return (
    <div className={twMerge('grid grid-cols-3 gap-x-2 rounded', classes?.container)}>
      <Button
        type="button"
        className="text-[12px] disabled:cursor-not-allowed"
        disabled={shouldDisablePreviousYear()}
        onClick={() => {
          setState({
            date: state.date?.subtract(1, 'year'),
          });
        }}
      >
        {elements?.previous ? elements.previous : 'Previous'}
      </Button>

      <button
        type="button"
        className="rounded text-[16px] font-semibold hover:bg-gray-300"
        onClick={() => {
          setState({
            isYearPickerVisible: true,
          });
        }}
      >
        {elements?.current ? elements.current(state.date as Dayjs) : state.date?.format('YYYY')}
      </button>

      <YearPicker />

      <Button
        type="button"
        className="text-[12px] disabled:cursor-not-allowed"
        disabled={shouldDisableNextYear()}
        onClick={() => {
          setState({
            date: state.date?.add(1, 'year'),
          });
        }}
      >
        {elements?.next ? elements.next : 'Next'}
      </Button>
    </div>
  );
};
