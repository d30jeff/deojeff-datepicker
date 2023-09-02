import dayjs, { Dayjs } from 'dayjs';
import { FC, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { DAY_ROWS, NUMBER_OF_DAYS, WEEKEND_INDICES } from '@constants/days.constant';

export type DaySelectorProps = {
  classes?: {
    container?: string;
    today?: string,
    days?: {
      labels?: {
        days?: string;
        weekend?: string;
      };
      label?: string;
      today?: string;
      weekend?: string;
      disabled?: string;
      selected?: string;
      past?: {
        label?: string;
        disabled?: string;
      };
      future?: {
        label?: string;
        disabled?: string;
      };
    }
  }
};
export const DaySelector: FC<DaySelectorProps> = memo((props) => {
  const { state, setState, options, today } = useDatePickerContext();
  const rows: Array<Dayjs[]> = [];

  while (rows.length < DAY_ROWS) {
    const chunks: Dayjs[] = [];

    for (let i = 0; i < NUMBER_OF_DAYS; i++) {
      const start = state.date!.startOf('month').subtract(state.date!.startOf('month').day() - i, 'day').add(rows.length * NUMBER_OF_DAYS, 'days');
      chunks.push(start);
    }

    rows.push(chunks);
  }

  return (
    <div className={twMerge('mt-[20px] grid w-full grid-cols-7', props.classes?.container)}>
      {dayjs.weekdaysShort().map((day, index) => {
        const isWeekEnd = WEEKEND_INDICES.includes(index);
        return <span
          key={day}
          className={twMerge('p-[4px] text-center text-[12px]',
            props.classes?.days?.labels?.days,
            isWeekEnd ? twMerge('text-red-500', props.classes?.days?.labels?.weekend) : '')}
        >{day}</span>;
      })}

      {rows.map((row) => {
        return row.map(day => {
          const isBefore = day.isBefore(state.date?.startOf('month'));
          const isAfter = day.isAfter(state.date?.endOf('month'));
          const isToday = day.isToday();
          const isSelected = day.isSame(state.date);
          const isWeekEnd = WEEKEND_INDICES.includes(day.day());
          const isPastDisabled = options?.disablePastDates && day.startOf('day').isBefore(today.startOf('day'));
          const isFutureDisabled = options?.disableFutureDates && day.startOf('day').isAfter(today.startOf('day'));

          return <button
            disabled={isPastDisabled || isFutureDisabled}
            onClick={() => {
              const stateShallowCopy = { ...state };
              stateShallowCopy.date = day;
              stateShallowCopy.isDatePickerVisible = false;
              setState(stateShallowCopy);
            }}
            key={day.format('DD/MM/YYYY')}
            className={twMerge('h-[40px] rounded p-[2px] text-[16px] hover:bg-purple-400 text-gray-700',
              props.classes?.days?.label,
              isPastDisabled ? twMerge('disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-300', props.classes?.days?.past?.disabled) : '',
              isFutureDisabled ? twMerge('disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-300', props.classes?.days?.future?.disabled) : '',
              isBefore ? twMerge('text-gray-300', props.classes?.days?.past?.label) : '',
              isAfter ? twMerge('text-gray-300', props.classes?.days?.future?.label) : '',
              isToday ? twMerge('font-semibold text-purple-600', props.classes?.days?.today) : '',
              isWeekEnd ? twMerge('bg-gray-50 disabled:bg-gray-100', props.classes?.days?.weekend) : '',
              isSelected ? twMerge('bg-purple-500 hover:bg-purple-700 text-white', props.classes?.days?.selected) : '',
            )}
          >{day?.format('D')}</button>;
        });

      })}
    </div >
  );
});
