import style from '@/components/button/publicButton/PublicButton.module.scss';
import Image from 'next/image';

interface ButtonProps {
  type: 'solid' | 'outline';
  disable: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface IconProps {
  src: string;
  height: number;
  width: number;
}

interface TextProps {
  children: React.ReactNode;
}

const PublicButton = ({ type, disable, onClick, children }: ButtonProps) => {
  const buttonClass = `${style.default} ${style[type]}`;

  return (
    <button className={buttonClass} disabled={disable} onClick={onClick}>
      {children}
    </button>
  );
};

const ButtonIcon = ({ src, height, width }: IconProps) => {
  return (
    <Image
      src={src}
      alt="Icon"
      width={width}
      height={height}
      className={style.icon}
    />
  );
};

const ButtonText = ({ children }: TextProps) => {
  return <span>{children}</span>;
};

PublicButton.Icon = ButtonIcon;
PublicButton.Text = ButtonText;

export default PublicButton;
