import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { dayjs } from '@utils/dayjs.util';

export type MonthPickerProps = {
  classes?: {
    label?: string;
    selected?: string;
    disabled?: string;
  }
};

export const MonthPicker: FC<MonthPickerProps> = (props) => {
  const { state, setState, options, today } = useDatePickerContext();


  if (!state.isMonthPickerVisible) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded">
      <div
        className="grid h-full grid-cols-2 gap-[10px] overflow-scroll bg-white p-[10px]"
      >
        {dayjs.monthsShort().map((month, i) => {
          const isSelected = state.date?.get('month') === i;
          const shouldDisablePastMonths = !options?.disablePastDates ? false : dayjs().month(i).isBefore(dayjs(), 'month');
          const shouldDisableFutureMonths = !options?.disableFutureDates ? false : dayjs().month(i).isAfter(dayjs(), 'month');
          const isDisabled = shouldDisablePastMonths || shouldDisableFutureMonths;

          return <button
            disabled={isDisabled}
            type="button"
            className={twMerge('rounded border bg-white hover:text-white',
              props.classes?.label,
              isDisabled ? twMerge('disabled:cursor-not-allowed disabled:hover:bg-gray-300', props.classes?.disabled) : '',
              isSelected ? twMerge('bg-gray-500 text-white', props.classes?.selected) : '',
            )}
            key={month}
            onClick={() => {
              setState({
                date: state.date!.month(i),
                isMonthPickerVisible: false,
              });
            }}
          >{month}</button>;
        })}
      </div>
    </div>
  );
};
