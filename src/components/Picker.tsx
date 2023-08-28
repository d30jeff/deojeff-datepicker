import { FC, HtmlHTMLAttributes, PropsWithChildren, Ref, forwardRef } from 'react';
import { DaySelector } from '@components/DaySelector/DaySelector';
import { MonthSelector } from '@components/MonthSelector/MonthSelector';
import { PickerContainer } from '@components/PickerContainer';
import { YearSelector } from '@components/YearSelector/YearSelector';
import { Divider } from '@components/Divider';

type Props = {} & HtmlHTMLAttributes<HTMLDivElement>;
export const Picker: FC<PropsWithChildren<Props>> = forwardRef((props, ref?: Ref<HTMLInputElement>) => {

  return (
    <PickerContainer
      {...ref}
      {...props}
    >
      <YearSelector />
      <Divider />
      <MonthSelector />
      <DaySelector />
    </PickerContainer>
  );
});
