import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { YearPicker } from '@components/YearSelector/YearPicker';

type Props = {};
export const YearSelector: FC<Props> = (props) => {
  const { state, setState } = useDatePickerContext();

  return (
    <div className={twMerge('grid grid-cols-3')}>
      <button
        type="button"
        onClick={() => {
          setState({
            date: state.date?.subtract(1, 'year')
          });
        }}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={() => {
          setState({
            isYearPickerVisible: true,
          });
        }}
      >
        {state.date?.format('YYYY')}
      </button>

      {state.isYearPickerVisible && (
        <YearPicker />
      )}

      <button
        type="button"
        onClick={() => {
          setState({
            date: state.date?.add(1, 'year')
          });
        }}
      >
        Next
      </button>
    </div>
  );
};
