import React from 'react';

type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  variant?: 'purple' | 'green';
} & React.ComponentPropsWithoutRef<E>;

const defaultElement = 'button';

const GooeyButton = <E extends React.ElementType = typeof defaultElement>({
  as,
  children,
  variant = 'purple',
  className,
  ...props
}: PolymorphicProps<E>) => {
  const Component = as || defaultElement;

  return (
    <Component className={`gooey-button ${variant} ${className || ''}`} {...props}>
      {children}
      <div className="blob"></div>
      <div className="blob"></div>
      <div className="blob"></div>
      <div className="blob"></div>
    </Component>
  );
};

export default GooeyButton;
