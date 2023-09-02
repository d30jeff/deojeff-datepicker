import { FC, HtmlHTMLAttributes, PropsWithChildren, Ref, forwardRef } from 'react';
import { DaySelector, DaySelectorProps } from '@components/DaySelector/DaySelector';
import { Divider, DividerProps } from '@components/Divider';
import { MonthSelector, MonthSelectorProps } from '@components/MonthSelector/MonthSelector';
import { PickerContainer } from '@components/PickerContainer';
import { YearSelector, YearSelectorProps } from '@components/YearSelector/YearSelector';

export type PickerProps = {
  classes?: {
    container?: string;
    year?: YearSelectorProps;
    divider?: DividerProps;
    month?: MonthSelectorProps;
    day?: DaySelectorProps;
  }
} & HtmlHTMLAttributes<HTMLDivElement>;
export const Picker: FC<PropsWithChildren<PickerProps>> = forwardRef((props, ref?: Ref<HTMLInputElement>) => {
  const { classes } = props;

  return (
    <PickerContainer
      {...ref}
      {...props}
      classes={classes?.container}
    >
      <YearSelector
        classes={classes?.year?.classes}
        picker={classes?.year?.picker}
      />
      <Divider classes={classes?.divider?.classes} />
      <MonthSelector
        classes={classes?.month?.classes}
        picker={classes?.month?.picker}
      />
      <DaySelector classes={classes?.day?.classes} />
    </PickerContainer>
  );
});
