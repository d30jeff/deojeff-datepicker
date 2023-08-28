import { FC, HtmlHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {} & HtmlHTMLAttributes<HTMLDivElement>;
export const PickerContainer: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <div className={twMerge('border absolute p-[10px] w-[320px] rounded shadow-lg', props.className)}>
      {props.children}
    </div>
  );
};
