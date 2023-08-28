import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: FC<PropsWithChildren<Props>> = (props) => {
  return (
    <button
      {...props}
      className={twMerge(
        'rounded bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-300 py-[10px]',
        props.className)}
    >
      {props.children}
    </button>
  );
};
