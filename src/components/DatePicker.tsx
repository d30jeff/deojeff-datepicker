import { useWindowSize } from '@uidotdev/usehooks';
import { Dayjs } from 'dayjs';
import { FC, InputHTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useClickOutside from '@hooks/use-click-outside.hook';
import { Input } from 'components/Input';
import { Picker } from '@components/Picker';
import { useDatePickerContext } from 'context/DatePicker.context';

type Classes = {
  container?: string;
  input?: string;
  picker?: string;
}

type Props = {
  date?: Dayjs | null;
  onChange: (params?: Dayjs | null) => void;
  format?: string;
  defaultToToday?: boolean
  classes?: Classes
} & InputHTMLAttributes<HTMLInputElement>;

export const DatePicker: FC<PropsWithChildren<Props>> = (props) => {
  const { classes, date: value, format = 'DD/MM/YYYY', onChange } = props;

  const containerRef = useRef<HTMLInputElement | null>(null);
  const [cls, setCls] = useState<string[]>([]);
  const size = useWindowSize();
  const { ref, isVisible, setVisibility } = useClickOutside();
  const { state, setState } = useDatePickerContext();

  useEffect(() => {
    setState({
      date: value
    });
  }, []);

  useEffect(() => {
    onChange(state.date);
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
        className={twMerge('h-[40px] border rounded', props.className)}
        value={value?.format(format)}
        onFocus={() => {
          const rect = containerRef.current!.getBoundingClientRect();
          const clsShallowCopy = [...cls];
          if (size.height && rect.bottom) {
            const shouldBottom = Math.floor((size.height / 2)) >= rect.bottom;
            if (shouldBottom) {
              clsShallowCopy.push('top-0 mt-[42px]');
            } else {
              clsShallowCopy.push('bottom-0 mb-[2px]');
            }
          }

          if (size.width && rect.right) {
            const shouldRight = Math.floor((size.width / 2)) >= rect.right;
            if (shouldRight) {
              clsShallowCopy.push('left-0');
            } else {
              clsShallowCopy.push('right-0');
            }
          }
          setCls(clsShallowCopy);
          setVisibility(true);
        }}
        onBlur={() => {
          setState({
            isYearPickerVisible: false,
          });
        }}
      />

      {isVisible && (
        <Picker
          className={twMerge('absolute  h-auto', cls, classes?.picker)}
        />
      )}
    </div>
  );
};
