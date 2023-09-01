import { useWindowSize } from '@uidotdev/usehooks';
import { Dayjs } from 'dayjs';
import { DetailedHTMLProps, FC, HTMLAttributes, InputHTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Picker } from '@components/Picker';
import { YearSelectorProps } from '@components/YearSelector/YearSelector';
import useClickOutside from '@hooks/use-click-outside.hook';
import { Input } from 'components/Input';
import { DatePickerOptions, DatePickerProvider, useDatePickerContext } from 'context/DatePicker.context';
import '../css/index.css';

type Classes = {
  container?: string;
  input?: string;
  picker?: {
    container?: string;
    year?: {
      picker?: {};
      selector?: YearSelectorProps;
      elements?: {
        previous?: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      };
      container?: string;
    };
    month?: {};
    day?: {

    };
  };
};

type Props = {
  options: DatePickerOptions;
  date?: Dayjs | null;
  onDateChange: (params?: Dayjs | null) => void;
  format?: string;
  defaultToToday?: boolean;
  classes?: Classes;
} & InputHTMLAttributes<HTMLInputElement>;

const DatePickerContainer: FC<PropsWithChildren<Props>> = (props) => {
  const { classes, date: value, format = 'DD/MM/YYYY', onDateChange } = props;
  const containerRef = useRef<HTMLInputElement | null>(null);
  const [cls, setCls] = useState<string[]>([]);
  const size = useWindowSize();
  const { state, setState } = useDatePickerContext();
  const { ref, isVisible, setVisibility } = useClickOutside(state.isDatePickerVisible);

  useEffect(() => {
    setState({
      date: value,
      isYearPickerVisible: false,
    });
  }, []);

  useEffect(() => {
    setVisibility(state.isDatePickerVisible);
  }, [state.isDatePickerVisible, state.isYearPickerVisible]);

  useEffect(() => {
    if (!isVisible) {
      setState({
        isDatePickerVisible: false,
        isYearPickerVisible: false,
      });
    }
  }, [isVisible]);

  useEffect(() => {
    onDateChange(state.date);
  }, [state.date]);

  useEffect(() => {
    setState({
      date: value,
    });
  }, [value]);

  return (
    <div
      className={twMerge('relative h-0', classes?.container)}
      ref={ref}
    >
      <Input
        ref={containerRef}
        placeholder="Select Date"
        className={twMerge('h-[40px] border rounded px-[10px]', props?.classes?.input)}
        value={state.date?.format(format)}
        readOnly
        onFocus={() => {
          const rect = containerRef.current!.getBoundingClientRect();
          const clsShallowCopy = [...cls];
          if (size.height && rect.bottom) {
            const shouldBottom = Math.floor(size.height / 2) >= rect.bottom;
            if (shouldBottom) {
              clsShallowCopy.push('top-0 mt-[42px]');
            } else {
              clsShallowCopy.push('bottom-0 mb-[2px]');
            }
          }

          if (size.width && rect.right) {
            const shouldRight = Math.floor(size.width / 2) >= rect.right;
            if (shouldRight) {
              clsShallowCopy.push('left-0');
            } else {
              clsShallowCopy.push('right-0');
            }
          }
          setCls(clsShallowCopy);
          setState({
            isDatePickerVisible: true,
          });

          if (state.isYearPickerVisible) {
            setState({
              isYearPickerVisible: false,
            });
          }
        }}
        onBlur={() => {
          setState({
            isYearPickerVisible: false,
          });
        }}
      />

      {state.isDatePickerVisible && <Picker className={twMerge('absolute h-auto', cls, classes?.picker?.container)} />}
    </div>
  );
};

export const DatePicker: FC<Props> = (props) => {
  return (
    <DatePickerProvider {...props}>
      <DatePickerContainer {...props} />
    </DatePickerProvider>
  );
};
