import { FC } from 'react';

type Props = {};
export const Divider: FC<Props> = (props) => {
  return (
    <div className="my-[10px] h-[0.5px] w-full bg-gray-100" />
  );
};
