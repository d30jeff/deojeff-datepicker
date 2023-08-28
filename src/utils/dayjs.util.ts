import Dayjs from 'dayjs';
import IsToday from 'dayjs/plugin/isToday';
import LocaleData from 'dayjs/plugin/localeData';

Dayjs.extend(IsToday);
Dayjs.extend(LocaleData);
export const dayjs = Dayjs;

export const getCurrentYear = () => {
  return dayjs().year();
};
