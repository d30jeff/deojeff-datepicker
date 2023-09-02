import { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export type PickerContainerProps = {
  classes?: string;
};
export const PickerContainer: FC<PropsWithChildren<PickerContainerProps>> = (props) => {
  return (
    <div className={twMerge('border absolute p-[10px] w-[320px] rounded shadow-lg', props.classes)}>
      {props.children}
    </div>
  );
};
