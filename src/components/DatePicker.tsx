import { useWindowSize } from '@uidotdev/usehooks';
import { Dayjs } from 'dayjs';
import React, { DetailedHTMLProps, FC, HTMLAttributes, InputHTMLAttributes, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Picker } from '@components/Picker';
import useClickOutside from '@hooks/use-click-outside.hook';
import { Input } from 'components/Input';
import { DatePickerProvider, useDatePickerContext } from 'context/DatePicker.context';
import { useYears } from '@hooks/use-year.hook';

type Options = {
  disablePastDates?: boolean;
  disableFutureDates?: boolean;
}

type Classes = {

  container?: string;
  input?: string;
  picker?: {
    container?: string;
    year?: {
      elements?: {
        previous?: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      };
      previous?: ReactNode
      container?: string;
    };
  };
};

type Props = {
  options?: Options;
  date?: Dayjs | null;
  onDateChange: (params?: Dayjs | null) => void;
  format?: string;
  defaultToToday?: boolean;
  classes?: Classes;
} & InputHTMLAttributes<HTMLInputElement>;

export const DatePickerContainer: FC<PropsWithChildren<Props>> = (props) => {
  const { classes, date: value, format = 'DD/MM/YYYY', onDateChange } = props;
  const containerRef = useRef<HTMLInputElement | null>(null);
  const [cls, setCls] = useState<string[]>([]);
  const size = useWindowSize();
  const { state, setState, options, today } = useDatePickerContext();
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
        className={twMerge(props?.classes?.input || 'h-[40px] border rounded px-[10px]')}
        value={state.date?.format(format)}
        defaultValue={state.date?.format(format)}
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

      {state.isDatePickerVisible && <Picker className={twMerge('absolute  h-auto', cls, classes?.picker?.container)} />}
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
