import { Dayjs } from 'dayjs';
import { FC, PropsWithChildren, createContext, memo, useContext, useState } from 'react';
import { dayjs } from '@utils/dayjs.util';

export type DatePickerOptions = {
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
};

type DatePickerContextProps = {
  state: State;
  today: Dayjs;
  setState: (params: Partial<State>) => void;
  options?: DatePickerOptions;
};

export const DatePickerContext = createContext<DatePickerContextProps | null>(null);

export const useDatePickerContext = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error('useDatePickerContext must be used within DatePickerProvider');
  }

  return context;
};

type State = {
  date: Dayjs | undefined | null;
  years: Dayjs[];
  isDatePickerVisible: boolean;
  isYearPickerVisible: boolean;
  isMonthPickerVisible: boolean;
};

type DatePickerProviderProps = {
  date?: Dayjs | null;
  options?: DatePickerOptions;
};

export const DatePickerProvider: FC<PropsWithChildren<DatePickerProviderProps>> = memo((props) => {
  const { date, options } = props;
  const today = dayjs();
  const [state, updateState] = useState<State>({
    date,
    years: [],
    isDatePickerVisible: false,
    isYearPickerVisible: false,
    isMonthPickerVisible: false,
  });

  const setState = (newState: Partial<State>) => {
    const stateShallowCopy = { ...state, ...newState };
    if (options?.disablePastDates) {
      if (stateShallowCopy.date?.isBefore(today, 'month')) {
        stateShallowCopy.date = stateShallowCopy.date.month(today.month());
      }

      if (stateShallowCopy.date?.isBefore(today, 'day')) {
        stateShallowCopy.date = stateShallowCopy.date.date(today.date());
      }
    }

    if (options?.disableFutureDates) {
      if (stateShallowCopy.date?.isAfter(today, 'month')) {
        stateShallowCopy.date = stateShallowCopy.date.month(today.month());
      }

      if (stateShallowCopy.date?.isAfter(today, 'day')) {
        stateShallowCopy.date = stateShallowCopy.date.date(today.date());
      }
    }

    updateState(stateShallowCopy);
  };

  return (
    <DatePickerContext.Provider value={{
      state, setState, options, today
    }}
    >
      {props.children}
    </DatePickerContext.Provider>
  );
});
