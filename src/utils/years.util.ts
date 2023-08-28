import { Dayjs } from 'dayjs';
import { YEARS_OFFSET } from '@constants/years.constant';

export class YearsUtil {
  static fill(years: Dayjs[], direction: 'up' | 'down'): Dayjs[] {
    let [initial] = years;

    if (direction === 'down') {
      [initial] = years.slice(-1);
    }

    const populatedYears = [initial];
    for (let i = 1; i <= YEARS_OFFSET; i++) {
      populatedYears.unshift(initial!.subtract(i, 'year'));
      populatedYears.push(initial!.add(i, 'year'));
    }

    return populatedYears;
  }
}
