import Dayjs from 'dayjs';

export const dayjs = Dayjs;

export const getCurrentYear = () => {
  return dayjs().year();
};
