//컴포넌트 immport
import BookmarkDisabled from '@/public/icons/ic-bookmark-fill.svg';
import Bookmark from '@/public/icons/ic-bookmark.svg';
import WritingForm from '@/public/icons/ic-edit2.svg';
import Share from '@/public/icons/ic-share2.svg';
import Image from 'next/image';

import styles from './FloatingButton.module.scss';

/** 함수 타입 지정 */
interface Props {
  size?: 'small' | 'medium';
  interaction?: 'default' | 'hovered' | 'clicked';
  onClick?: () => void;
  mode?: 'edit' | 'bookmark' | 'bookmarkDisabled' | 'share';
}

/** FloatingButton 컴포넌트 생성
 * 글(알바토크) 생성, 북마크, 공유 버튼
 */
const OtherButton = ({
  size = 'medium',
  interaction = 'default',
  onClick,
  mode = 'edit',
}: Props) => {
  let buttonClass = styles.button;

  if (size === 'small') buttonClass += ` ${styles.small}`;
  if (interaction === 'hovered') buttonClass += ` ${styles.hovered}`;
  if (interaction === 'clicked') buttonClass += `${styles.clicked}`;

  const renderMode = {
    edit: (
      <button className={buttonClass} onClick={onClick}>
        <Image src={WritingForm} alt="글 작성하기" />
      </button>
    ),
    bookmark: (
      <button className={`${buttonClass} ${styles.bookmark}`} onClick={onClick}>
        <Image src={Bookmark} alt="북마크" />
      </button>
    ),
    bookmarkDisabled: (
      <button className={`${buttonClass} ${styles.bookmark}`} onClick={onClick}>
        <Image src={BookmarkDisabled} alt="북마크 취소" />
      </button>
    ),
    share: (
      <button className={buttonClass} onClick={onClick}>
        <Image src={Share} alt="공유" />
      </button>
    ),
  };

  return <>{renderMode[mode]}</>;
};

export default OtherButton;
