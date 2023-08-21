import { Dayjs } from 'dayjs';
import { dayjs } from '@utils/dayjs.util';

export const getYears = (date?: Dayjs | null) => {
  const dates: Dayjs[] = [];

  const instance = date || dayjs();

  const century = Number(instance.get('year').toString().slice(-1));

  const start = instance?.subtract(century, 'year');

  for (let i = 0; i < 10; i++) {
    dates.push(start.add(i, 'year'));
  }
  console.log(dates);

  return dates;
};
