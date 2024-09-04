import Image from 'next/image';
import { ReactNode } from 'react';

import styles from './FloatingButton.module.scss';

interface Props {
  iconSrc: string;
  altText: string;
  children?: ReactNode;
  size?: 'small' | 'medium';
  onClick?: () => void;
  mode?: 'default' | 'bookmark';
}

const FloatingButton = ({
  iconSrc,
  altText,
  children,
  size = 'medium',
  onClick,
  mode = 'default',
}: Props) => {
  const buttonClass = `${styles['floating-button']} ${
    size === 'small' && children
      ? styles['small-with-children']
      : size === 'small'
        ? styles.small
        : ''
  } ${mode === 'bookmark' ? styles.bookmark : ''} ${
    children ? styles['with-children'] : ''
  }`;

  return (
    <button className={buttonClass} onClick={onClick}>
      <Image
        src={iconSrc}
        alt={altText}
        className={size === 'small' ? styles['small-img'] : ''}
        width="36"
        height="36"
      />
      <span
        className={
          size === 'small' ? styles['small-text'] : styles['medium-text']
        }
      >
        {children}
      </span>
    </button>
  );
};

export default FloatingButton;
