import React from 'react';

// Fix: Correctly type the polymorphic component props using React.PropsWithChildren and Omit.
// This resolves the ambiguity for the 'children' prop that causes a TypeScript error
// when spreading props onto a generic component element.
type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<{
  as?: E;
  variant?: 'purple' | 'green';
} & Omit<React.ComponentPropsWithoutRef<E>, 'children'>>;


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
