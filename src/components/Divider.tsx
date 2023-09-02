import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export type DividerProps = {
  classes?: string;
};
export const Divider: FC<DividerProps> = (props) => {
  const { classes } = props;
  return (
    <div className={twMerge('my-[10px] h-[0.5px] w-full bg-gray-100', classes)} />
  );
};
