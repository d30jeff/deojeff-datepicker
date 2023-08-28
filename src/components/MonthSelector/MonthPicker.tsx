import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { dayjs } from '@utils/dayjs.util';

type Props = {};
export const MonthPicker: FC<Props> = (props) => {
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
          const isActive = state.date?.get('month') === i;
          console.log(dayjs().month(i).month(), today.month());
          const isDisabled = (options?.disablePastDates && today.isBefore(dayjs().month(i), 'month') ||
            today.isSame(dayjs().month(i), 'month')
          ) === false;

          return <button
            disabled={isDisabled}
            type="button"
            className={twMerge('rounded border bg-white hover:bg-purple-500 hover:text-white',
              isActive ? 'bg-purple-500 text-white' : '',
              'disabled:cursor-not-allowed'
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
