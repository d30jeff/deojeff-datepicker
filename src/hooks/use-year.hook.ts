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

    let [initial = today] = state.years;

    if (isUp) {
      [initial] = state.years;
      if (options?.disablePastDates && initial.isBefore(today)) {
        return;
      }
    } else if (isDown) {
      [initial] = state.years.slice(-1);
      if (options?.disableFutureDates && initial.isAfter(today)) {
        return;
      }
    }

    const newYears = [initial];

    for (let i = 1; i <= YEARS_OFFSET; i++) {
      const previous = initial.subtract(i, 'year');
      const next = initial.add(i, 'year');

      if (Boolean(options?.disablePastDates && previous.isBefore(today)) === false) {
        newYears.unshift(previous);
      }

      if (Boolean(options?.disableFutureDates && next.isAfter(today)) === false) {
        newYears.push(next);
      }
    }

    setState({
      years: newYears,
    });
  };

  // TODO: Implement method to update head

  // useEffect(() => {
  //   setYears(years);
  // }, [state.date]);

  return {
    years: state.years,
    update,
  };
};
