import type { NextPage } from 'next';
import { ReactElement } from 'react';

interface ContainerType {
  children: ReactElement;
  className?: string;
  parentClass?: string;
}

const Container: NextPage<ContainerType> = ({
  children,
  className,
  parentClass,
}) => {
  return (
    <div className={`flex justify-center ${parentClass}`}>
      <div className={`flex-1 max-w-screen-2xl px-4 py-14 ${className}`}>
        {children}
      </div>
    </div>
  );
};
export default Container;
