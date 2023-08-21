import { FC, HtmlHTMLAttributes, PropsWithChildren, Ref, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDatePickerContext } from '@context/DatePicker.context';
import { MonthSelector } from '@components/MonthSelector/MonthSelector';
import { DaySelector } from '@components/DaySelector/DaySelector';
import { YearSelector } from '@components/YearSelector/YearSelector';

type Props = {} & HtmlHTMLAttributes<HTMLDivElement>;
export const Picker: FC<PropsWithChildren<Props>> = forwardRef((props, ref?: Ref<HTMLInputElement>) => {

  const { state, setState } = useDatePickerContext();

  return (
    <div className={twMerge('border relative p-[10px] w-[320px]', props.className)}>
      <YearSelector />
      <MonthSelector />
      <div>
        <DaySelector />
      </div>
    </div>
  );
});
