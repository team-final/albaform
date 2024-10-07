import React from 'react'

import Styles from './SearchInput.module.scss'
import SearchIc from '/public/icons/ic-search.svg'

interface InputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnter?: () => void
  placeholder?: string
}

const SearchInput = ({ value, onChange, onEnter, placeholder }: InputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter()
    }
  }

  return (
    <div className={Styles['input-container']}>
      <input
        type="text"
        className={Styles['input-container-searchbar']}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || '검색어를 입력하세요'}
      />
      <SearchIc
        width={36}
        height={36}
        className={Styles['input-container-searchbar-ic']}
      />
    </div>
  )
}

export default SearchInput
