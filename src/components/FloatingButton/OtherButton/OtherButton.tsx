//컴포넌트 immport
import BookmarkDisabled from '@/public/icons/ic-bookmark-fill.svg';
import Bookmark from '@/public/icons/ic-bookmark.svg';
import WritingForm from '@/public/icons/ic-edit2.svg';
import Share from '@/public/icons/ic-share2.svg';
import Image from 'next/image';

import styles from './OtherButton.module.scss';

/** 함수 타입 지정 */
interface Props {
  size?: 'small' | 'medium';
  onClick?: () => void;
  mode?: 'edit' | 'bookmark' | 'bookmarkDisabled' | 'share';
}

/** FloatingButton 컴포넌트 생성
 * 글(알바토크) 생성, 북마크, 공유 버튼
 */
const OtherButton = ({ size = 'medium', onClick, mode = 'edit' }: Props) => {
  let buttonClass = styles.OtherButton;

  if (size === 'small') buttonClass += ` ${styles.small}`;

  const renderMode = {
    edit: (
      <button className={buttonClass} onClick={onClick}>
        <Image
          src={WritingForm}
          className={styles.otherbuttonImg}
          alt="글 작성하기"
          width="36"
          height="36"
        />
      </button>
    ),
    bookmark: (
      <button className={styles.bookmark} onClick={onClick}>
        <Image
          src={Bookmark}
          className={styles.otherbuttonImg}
          alt="북마크"
          width="36"
          height="36"
        />
      </button>
    ),
    bookmarkDisabled: (
      <button className={styles.bookmark} onClick={onClick}>
        <Image
          src={BookmarkDisabled}
          className={styles.otherbuttonImg}
          alt="북마크 취소"
          width="36"
          height="36"
        />
      </button>
    ),
    share: (
      <button className={buttonClass} onClick={onClick}>
        <Image
          src={Share}
          className={styles.otherbuttonImg}
          alt="공유"
          width="36"
          height="36"
        />
      </button>
    ),
  };

  return <>{renderMode[mode]}</>;
};

export default OtherButton;
