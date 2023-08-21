import { FC } from 'react';
import { useDatePickerContext } from '@context/DatePicker.context';

type Props = {};
export const MonthSelector: FC<Props> = (props) => {
  const { state, setState } = useDatePickerContext();

  return (
    <div className="grid grid-cols-3">
      <button
        type="button"
        onClick={() => {
          const stateShallowCopy = { ...state };
          stateShallowCopy.date = stateShallowCopy.date?.subtract(1, 'month');
          setState(stateShallowCopy);
        }}
      >Previous</button>

      <span className="text-center">
        {state.date?.format('MMMM')}
      </span>


      <button
        type="button"
        onClick={() => {
          const stateShallowCopy = { ...state };
          stateShallowCopy.date = stateShallowCopy.date?.add(1, 'month');
          setState(stateShallowCopy);
        }}
      >Next</button>
    </div>
  );
};
