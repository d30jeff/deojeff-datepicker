import { FC } from 'react';
import { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { dayjs } from '@utils/dayjs.util';
import { DAYS } from '@constants/days.constant';
import { useDatePickerContext } from '@context/DatePicker.context';

type Props = {
  container: '';
};
export const DaySelector: FC<Props> = (props) => {
  const { state, setState } = useDatePickerContext();
  const ROWS = 6;
  const rows: Array<Dayjs[]> = [];

  while (rows.length < ROWS) {
    const chunks: Dayjs[] = [];

    for (let i = 0; i < DAYS.length; i++) {
      const start = state.date!.startOf('month').subtract(state.date!.startOf('month').day() - i, 'day').add(rows.length * DAYS.length, 'days');

      chunks.push(start);
    }

    rows.push(chunks);
  }

  return (
    <div className={twMerge('mt-[20px] grid w-full grid-cols-7')}>

      {DAYS.map(day => {
        return <span
          key={day}
          className="p-[4px] text-center"
        >{day}</span>;
      })}

      {rows.map((row, i) => {
        return row.map(day => {
          const isBeforeOrAfter = day.isBefore(state.date?.startOf('month')) || day.isAfter(state.date?.endOf('month'));

          return <button
            onClick={() => {
              const stateShallowCopy = { ...state };
              stateShallowCopy.date = day;
              setState(stateShallowCopy);
            }}
            key={day.format('DD/MM/YYYY')}
            className={twMerge('h-[40px] rounded p-[2px] text-[16px] hover:bg-gray-400 hover:text-white hover:shadow',
              isBeforeOrAfter ? ' text-gray-300' : ''
            )}
          >{day?.format('D')}</button>;
        });

      })}
    </div>
  );
};
