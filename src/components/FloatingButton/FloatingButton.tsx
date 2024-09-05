import Image from 'next/image';
import React, { ReactNode } from 'react';

import styles from './FloatingButton.module.scss';

interface FloatingButtonProps {
  children?: ReactNode;
  size?: 'small' | 'medium';
  onClick?: () => void;
  mode?: 'default' | 'bookmark';
}

const FloatingButton = ({
  children,
  size = 'medium',
  onClick,
  mode = 'default',
}: FloatingButtonProps) => {
  const hasText = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === FloatingButtonText,
  );

  const buttonClass = `${styles['floating-button']} ${
    size === 'small' && hasText
      ? styles['small-with-children'] // small이면서 텍스트가 있을 때
      : size === 'small'
        ? styles.small // small이면서 텍스트가 없을 때
        : ''
  } ${mode === 'bookmark' ? styles.bookmark : ''} ${
    hasText ? styles['with-children'] : ''
  }`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

interface IconProps {
  iconSrc: string;
  altText: string;
  size?: 'small' | 'medium';
}

const FloatingButtonIcon = ({
  iconSrc,
  altText,
  size = 'medium',
}: IconProps) => (
  <Image
    src={iconSrc}
    alt={altText}
    className={size === 'small' ? styles['small-img'] : ''}
    width="36"
    height="36"
  />
);

interface TextProps {
  children: ReactNode;
  size?: 'small' | 'medium';
}

const FloatingButtonText = ({ children, size = 'medium' }: TextProps) => (
  <span
    className={size === 'small' ? styles['small-text'] : styles['medium-text']}
  >
    {children}
  </span>
);

FloatingButton.Icon = FloatingButtonIcon;
FloatingButton.Text = FloatingButtonText;

export default FloatingButton;
