import { FC, InputHTMLAttributes, PropsWithChildren, Ref, forwardRef } from 'react';

type Props = {
  ref?: Ref<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>;
export const Input: FC<PropsWithChildren<Props>> = forwardRef((props, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      {...props}
    />
  );
});
