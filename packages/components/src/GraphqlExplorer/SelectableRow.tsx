import type { ReactNode } from 'react'

import { AddOutlined, ArrowFilled, CheckedFilled } from './Icons'

interface SelectableRowProps {
  selected?: boolean
  expandedContent?: ReactNode
  name: string
  type?: string
  onSelect: () => void
  onClick: () => void
}

const SelectableRow = ({ selected, expandedContent, name, type }: SelectableRowProps) => {
  return (
    <div className="graphql-explorer-row">
      <div className="graphql-explorer-row_check-icon">
        {selected ? <CheckedFilled /> : <AddOutlined />}
      </div>
      <div className="graphql-explorer-row_hover-row">
        <span>{name}</span>
        {expandedContent && <span className="argument-more">(...)</span>}
        {expandedContent && <span>{expandedContent}</span>}
        {type && <span>{type}</span>}
        <ArrowFilled className="graphql-explorer-row_arrow" />
      </div>
    </div>
  )
}

export default SelectableRow
