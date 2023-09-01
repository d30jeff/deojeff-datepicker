import { FC, useMemo } from 'react';
import { Button } from '@components/Button';
import { MonthPicker } from '@components/MonthSelector/MonthPicker';
import { useDatePickerContext } from '@context/DatePicker.context';

type Props = {};
export const MonthSelector: FC<Props> = (props) => {
  const { state, setState, options, today } = useDatePickerContext();

  const shouldDisablePreviousMonth = useMemo(() => {
    if (options?.disablePastDates) {
      return state.date?.isBefore(today) || state.date!.isSame(today, 'month');
    }

    return false;
  }, [state.date]);

  const shouldDisableNextMonth = useMemo(() => {
    if (options?.disableFutureDates) {
      return state.date!.isSame(today, 'month') || state.date!.isAfter(today, 'month');
    }
    return false;
  }, [state.date]);

  return (
    <div className="grid grid-cols-3 gap-x-[10px] overflow-hidden rounded">
      <Button
        type="button"
        className="text-[12px] disabled:cursor-not-allowed"
        disabled={shouldDisablePreviousMonth}
        onClick={() => {
          const stateShallowCopy = { ...state };
          stateShallowCopy.date = stateShallowCopy.date?.subtract(1, 'month');
          setState(stateShallowCopy);
        }}
      >Previous</Button>

      <Button
        type="button"
        className="text-center text-[12px]"
        onClick={() => {
          setState({
            isMonthPickerVisible: true,
          });
        }}
      >
        {state.date?.format('MMMM')}
      </Button>

      <MonthPicker />

      <Button
        type="button"
        className="text-[12px] disabled:cursor-not-allowed"
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
