import { ReactNode } from 'react'

export interface CustomMessage {
  title?: string
  message?: string
}

export interface Params {
  params: {
    formId?: number
    applicationId?: string
    talkId?: number
    code?: string
    error?: string
    error_description?: string
  }
}

export interface ClickProps {
  onClick?: () => void
}

export type LayoutProps = Readonly<{
  children: ReactNode
}>

export interface ChildrenProps {
  children: ReactNode
}

export interface ComponentProps {
  children?: ReactNode
  className?: string
}

export type MyContentMenuType = 'posts' | 'comments' | 'scrap'

export interface MyContentMenu {
  value: MyContentMenuType
  label: string
}

export type ScrapListSortConditionType =
  | 'mostRecent'
  | 'highestWage'
  | 'mostApplied'
  | 'mostScrapped'

export interface ScrapListSortCondition {
  value: ScrapListSortConditionType
  label: string
}

export type RecrutingSortConditionType = null | boolean
export interface RecrutingSortCondition {
  value: RecrutingSortConditionType
  label: string
}

export type PublicSortConditionType = boolean
export interface PublicSortCondition {
  value: PublicSortConditionType
  label: string
}
