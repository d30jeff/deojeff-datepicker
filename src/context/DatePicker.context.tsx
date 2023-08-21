import { Dayjs } from 'dayjs';
import { FC, PropsWithChildren, createContext, memo, useContext, useEffect, useState } from 'react';

type DatePickerContextProps = {
  state: State;
  setState: (params: Partial<State>) => void;
  // update: (date?: Dayjs | null) => void;
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
  isDatePickerVisible: boolean;
  isYearPickerVisible: boolean;
}

export const DatePickerProvider: FC<PropsWithChildren> = memo((props) => {
  const [state, updateState] = useState<State>({
    date: null,
    isDatePickerVisible: false,
    isYearPickerVisible: false,
  });

  const setState = (newState: Partial<State>) => {
    const stateShallowCopy = { ...state, ...newState };
    updateState(stateShallowCopy);
  };

  return <DatePickerContext.Provider value={{ state, setState }}>{props.children}</DatePickerContext.Provider>;
});
