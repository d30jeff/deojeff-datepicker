import { Dayjs } from 'dayjs';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@components/Button';
import { YearPicker, YearPickerProps } from '@components/YearSelector/YearPicker';
import { useDatePickerContext } from '@context/DatePicker.context';


export type YearSelectorProps = {
  classes?: {
    container?: string;
    buttons?: {
      previous?: string;
      label?: string;
      next?: string;
    }
  };
  picker?: YearPickerProps;
  elements?: {
    previous?: ReactNode;
    current?: (params: Dayjs) => ReactNode;
    next?: ReactNode;
  };
};

export const YearSelector: FC<YearSelectorProps> = (props) => {
  const { classes, elements } = props;
  const { state, setState, options, today } = useDatePickerContext();

  const shouldDisablePreviousYear = useMemo(() => {
    if (options?.disablePastDates) {
      return state.date!.isSame(today, 'year') || state.date!.isBefore(today, 'year');
    }

    return false;
  }, [state.date?.get('year')]);

  const shouldDisableNextYear = useMemo(() => {
    if (options?.disableFutureDates) {
      return state.date!.isSame(today, 'year') || state.date!.isAfter(today, 'year');
    }

    return false;
  }, [state.date?.get('year')]);

  return (
    <div className={twMerge('grid grid-cols-3 gap-x-2 rounded', classes?.container)}>
      <Button
        type="button"
        className={twMerge('text-[12px] disabled:cursor-not-allowed', props.classes?.buttons?.previous)}
        disabled={shouldDisablePreviousYear}
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
        className={twMerge('rounded text-[16px] font-semibold hover:bg-gray-300', props.classes?.buttons?.label)}
        onClick={() => {
          setState({
            isYearPickerVisible: true,
          });
        }}
      >
        {elements?.current ? elements.current(state.date as Dayjs) : state.date?.format('YYYY')}
      </button>

      <YearPicker classes={props.picker?.classes} />

      <Button
        type="button"
        className={twMerge('text-[12px] disabled:cursor-not-allowed', props.classes?.buttons?.next)}
        disabled={shouldDisableNextYear}
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
