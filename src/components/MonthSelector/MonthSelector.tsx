import { FC, useCallback } from 'react';
import { useDatePickerContext } from '@context/DatePicker.context';
import { MonthPicker } from '@components/MonthSelector/MonthPicker';
import { Button } from '@components/Button';
import { dayjs } from '@utils/dayjs.util';

type Props = {};
export const MonthSelector: FC<Props> = (props) => {
  const { state, setState, options, today } = useDatePickerContext();

  const shouldDisablePreviousMonth = useCallback(() => {
    if (options?.disablePastDates) {
      return state.date!.isSame(today, 'month') || state.date!.isBefore(today, 'month');
    }
    return false;
  }, [options?.disablePastDates, state.date]);

  const shouldDisableNextMonth = useCallback(() => {
    if (options?.disableFutureDates) {
      return state.date!.isSame(today, 'month') || state.date!.isAfter(today, 'month');
    }
    return false;
  }, [options?.disableFutureDates, state.date]);

  return (
    <div className="grid grid-cols-3 gap-x-[10px] overflow-hidden rounded">
      <Button
        type="button"
        className="text-[12px] disabled:cursor-not-allowed"
        disabled={shouldDisablePreviousMonth()}
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
        disabled={shouldDisableNextMonth()}
        onClick={() => {
          const stateShallowCopy = { ...state };
          stateShallowCopy.date = stateShallowCopy.date?.add(1, 'month');
          setState(stateShallowCopy);
        }}
      >Next</Button>
    </div>
  );
};
