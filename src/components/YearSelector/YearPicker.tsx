import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Dayjs } from 'dayjs';
import { useDatePickerContext } from '@context/DatePicker.context';
import { getYears } from '@utils/years.util';
import { getCurrentYear } from '@utils/dayjs.util';



const Container: FC<PropsWithChildren> = (props) => {
  return (
    <div className={twMerge(`absolute top-0 left-0 h-full
    w-full grid grid-cols-3 bg-gray-50 gap-[4px]`)}
    >
      {props.children}
    </div>
  );
};

type PickerProps = {
  date: Dayjs;
}

const Picker: FC<PickerProps> = (props) => {
  const { date } = props;
  const { setState, state } = useDatePickerContext();

  return (
    <button
      type="button"
      className={twMerge('border text-black', state.date?.year() === date.year() ? 'bg-orange-500' : '')}
      onClick={() => {
        setState({
          date,
          isYearPickerVisible: false,
        });
      }}
    >{date.get('year')}</button>
  );
};

type YearPickerProps = {}

export const YearPicker: FC<YearPickerProps> = (props) => {
  const { state } = useDatePickerContext();
  const years = getYears(state.date);
  return <Container>
    {years.map(year => {
      return <Picker
        date={year}
        key={year.toString()}
      />;
    })}
  </Container >;
};
