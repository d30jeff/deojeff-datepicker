import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@components/Button';
import { MonthPicker, MonthPickerProps } from '@components/MonthSelector/MonthPicker';
import { useDatePickerContext } from '@context/DatePicker.context';

export type MonthSelectorProps = {
  classes?: {
    container?: string;
    buttons?: {
      previous?: string;
      label?: string;
      next?: string;
    }
  };
  picker?: MonthPickerProps;
};
export const MonthSelector: FC<MonthSelectorProps> = (props) => {
  const { state, setState, options, today } = useDatePickerContext();

  console.log(props);

  const shouldDisablePreviousMonth = useMemo(() => {
    if (options?.disablePastDates) {
      return state.date?.isBefore(today) || state.date!.isSame(today, 'month');
    }

    return false;
  }, [state.date?.get('month')]);

  const shouldDisableNextMonth = useMemo(() => {
    if (options?.disableFutureDates) {
      return state.date!.isSame(today, 'month') || state.date!.isAfter(today, 'month');
    }
    return false;
  }, [state.date?.get('month')]);

  return (
    <div className={twMerge('grid grid-cols-3 gap-x-[10px] overflow-hidden rounded', props.classes?.container)}>
      <Button
        type="button"
        className={twMerge('text-[12px] disabled:cursor-not-allowed', props.classes?.buttons?.previous)}
        disabled={shouldDisablePreviousMonth}
        onClick={() => {
          const stateShallowCopy = { ...state };
          stateShallowCopy.date = stateShallowCopy.date?.subtract(1, 'month');
          setState(stateShallowCopy);
        }}
      >Previous</Button>

      <Button
        type="button"
        className={twMerge('text-center text-[12px]', props.classes?.buttons?.label)}
        onClick={() => {
          setState({
            isMonthPickerVisible: true,
          });
        }}
      >
        {state.date?.format('MMMM')}
      </Button>

      <MonthPicker classes={props.picker?.classes} />

      <Button
        type="button"
        className={twMerge('text-[12px] disabled:cursor-not-allowed', props.classes?.buttons?.next)}
        disabled={shouldDisableNextMonth}
        onClick={() => {
          const stateShallowCopy = { ...state };
          stateShallowCopy.date = stateShallowCopy.date?.add(1, 'month');
          setState(stateShallowCopy);
        }}
      >Next</Button>
    </div>
  );
};
