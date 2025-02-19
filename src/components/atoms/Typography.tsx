import { PropsWithChildren, createElement } from 'react';

interface TypographyProps extends PropsWithChildren {
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'paragraph' | 'paragraph-xs' | 'paragraph-2xs';
  style?: React.CSSProperties;
}

function Typography(props: TypographyProps) {
  const {
    variant = 'paragraph', children, className = '', style,
  } = props;
  const headingElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const typographiesClassName = {
    h1: 'heading1',
    h2: 'heading2',
    h3: 'heading3',
    h4: 'heading4',
    h5: 'heading5',
    h6: 'heading6',
    lead: 'lead',
    paragraph: 'paragraph',
    'paragraph-xs': 'paragraph-xs',
    'paragraph-2xs': 'paragraph-2xs',
  };
  return createElement(
    headingElements.includes(variant) ? variant : 'p',
    { className: `base-font ${typographiesClassName[variant]} ${className}`, style },
    children,
  );
}

export default Typography;
