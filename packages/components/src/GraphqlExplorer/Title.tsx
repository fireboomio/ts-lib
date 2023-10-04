import type { ReactNode } from 'react'

interface TitleProps {
  children?: ReactNode
  size?: 'lg' | 'default'
  prefix?: ReactNode
  suffix?: ReactNode
}

const Title = ({ children, size, prefix, suffix }: TitleProps) => {
  return <div className={`graphql-explorer-title ${`size-${size} ?? 'default`}`}>{children}</div>
}

export default Title
