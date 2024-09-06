import styles from './HamburgerButton.module.scss';
import IconHamburger from '/public/icons/ic-menu.svg';

interface HamburgerButtonProps {
  onClick?: () => void;
}

const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
  return (
    <button className={styles.hamburger} onClick={onClick}>
      <IconHamburger />
    </button>
  );
};
export default HamburgerButton;
