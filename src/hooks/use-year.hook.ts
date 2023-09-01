import { YEARS_OFFSET } from '@constants/years.constant';
import { useDatePickerContext } from '@context/DatePicker.context';

export const useYears = () => {
  const { options, today, state, setState } = useDatePickerContext();

  const update = (direction?: 'up' | 'down') => {
    if (!state.date) {
      return;
    }

    const isUp = direction === 'up';
    const isDown = direction === 'down';

    let [initial = state.date] = state.years;

    if (isUp) {
      [initial] = state.years;
      if (options?.disablePastDates && (initial.isBefore(today, 'year') || initial.isSame(today, 'year'))) {
        return;
      }
    } else if (isDown) {
      [initial] = state.years.slice(-1);
      if (options?.disableFutureDates && (initial.isAfter(today, 'year') || initial.isSame(today, 'year'))) {
        return;
      }
    }

    let newYears = [initial];

    for (let i = 1; i <= YEARS_OFFSET; i++) {
      const previous = initial.subtract(i, 'year');
      const next = initial.add(i, 'year');
      newYears.unshift(previous);
      newYears.push(next);
    }

    if (options?.disablePastDates) {
      newYears = newYears.filter((date) => {
        return date.isSame(today, 'year') || date.isAfter(today);
      });
    }

    if (options?.disableFutureDates) {
      newYears = newYears.filter((date) => {
        return date.isSame(today) || date.isBefore(today);
      });
    }

    setState({
      years: newYears,
    });
  };

  return {
    years: state.years,
    update,
  };
};
