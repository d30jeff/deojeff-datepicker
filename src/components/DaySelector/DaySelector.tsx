import dayjs, { Dayjs } from 'dayjs';
import { FC, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { DAYS, DAY_ROWS, WEEKEND_INDICES } from '@constants/days.constant';

type Props = {
  container?: '';
};
export const DaySelector: FC<Props> = memo((props) => {
  const { state, setState, options, today } = useDatePickerContext();
  const rows: Array<Dayjs[]> = [];

  while (rows.length < DAY_ROWS) {
    const chunks: Dayjs[] = [];

    for (let i = 0; i < DAYS.length; i++) {
      const start = state.date!.startOf('month').subtract(state.date!.startOf('month').day() - i, 'day').add(rows.length * DAYS.length, 'days');
      chunks.push(start);
    }

    rows.push(chunks);
  }

  return (
    <div className={twMerge('mt-[20px] grid w-full grid-cols-7')}>
      {dayjs.weekdaysShort().map((day, index) => {
        const isWeekEnd = WEEKEND_INDICES.includes(index);
        return <span
          key={day}
          className={twMerge('p-[4px] text-center text-[12px]', isWeekEnd ? 'text-red-500' : '')}
        >{day}</span>;
      })}


      {rows.map((row, i) => {
        return row.map(day => {
          const isBeforeOrAfter = day.isBefore(state.date?.startOf('month')) || day.isAfter(state.date?.endOf('month'));
          const isToday = day.isToday();
          const isSelected = day.isSame(state.date);
          const isWeekEnd = WEEKEND_INDICES.includes(day.day());
          const isDisabled = options?.disablePastDates && day.startOf('day').isBefore(today.startOf('day'));

          return <button
            disabled={isDisabled}
            onClick={() => {
              const stateShallowCopy = { ...state };
              stateShallowCopy.date = day;
              stateShallowCopy.isDatePickerVisible = false;
              setState(stateShallowCopy);
            }}
            key={day.format('DD/MM/YYYY')}
            className={twMerge('h-[40px] rounded p-[2px] text-[16px] hover:bg-purple-400 text-gray-700',
              isDisabled ? 'disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-300' : 'hover:text-white hover:shadow',
              isBeforeOrAfter ? ' text-gray-300' : '',
              isToday ? 'font-semibold text-purple-600 ' : '',
              isWeekEnd ? 'bg-gray-50 disabled:bg-gray-100' : '',
              isSelected ? 'bg-purple-500 hover:bg-purple-700 text-white' : '',
            )}
          >{day?.format('D')}</button>;
        });

      })}
    </div >
  );
});
