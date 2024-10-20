import Image from 'next/image'
import { ReactElement } from 'react'

import styles from './EmptyContent.module.scss'
import IconEmptyBookmark from '/public/icons/ic-empty-bookmark.svg'
import IconEmptyComment from '/public/icons/ic-empty-comment.svg'
import IconEmptyFormfrom from '/public/icons/ic-empty-form.svg'
import IconInfo from '/public/icons/ic-info.svg'
import ImagePrepareContent from '/public/images/prepare-content.jpg'

type EmptyContentType =
  | 'bookmark'
  | 'post'
  | 'comment'
  | 'form'
  | 'apply'
  | 'nodata'
  | 'prepare'
interface EmptyContentProps {
  type: EmptyContentType
}

const EMPTY_CONTENT_PRESET: Record<
  EmptyContentType,
  { icon: ReactElement; desc: ReactElement }
> = {
  bookmark: {
    icon: <IconEmptyBookmark />,
    desc: <p>스크랩한 알바폼이 없어요.</p>,
  },
  post: {
    icon: <IconEmptyComment />,
    desc: (
      <p>
        작성한 게시글이 없어요.
        <br />
        궁금한 점, 고민 등의 게시글을 올려보세요.
      </p>
    ),
  },
  comment: { icon: <IconEmptyComment />, desc: <p>작성한 댓글이 없어요.</p> },
  form: {
    icon: <IconEmptyFormfrom />,
    desc: (
      <p>
        등록된 알바폼이 없어요.
        <br />
        1분 만에 등록하고 알바를 구해보세요!
      </p>
    ),
  },
  apply: {
    icon: <IconEmptyFormfrom />,
    desc: <p>지원한 알바폼이 없어요.</p>,
  },
  nodata: { icon: <IconInfo />, desc: <p>등록된 데이터가 없어요.</p> },
  prepare: {
    icon: (
      <Image
        src={ImagePrepareContent}
        alt={'콘텐츠 준비중 이미지'}
        fill
        priority
        sizes={'20vw'}
      />
    ),
    desc: <p>콘텐츠를 만들고 있어요.</p>,
  },
}

export default function EmptyContent({ type = 'nodata' }: EmptyContentProps) {
  const { icon, desc } = EMPTY_CONTENT_PRESET[type]

  return (
    <article className={styles.container}>
      <section className={styles.inner}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.desc}>{desc}</div>
      </section>
    </article>
  )
}
