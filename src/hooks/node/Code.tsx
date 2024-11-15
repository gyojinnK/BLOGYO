import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

type CodeProps = {
  isBlock?: boolean
  children: ReactNode
} & HTMLAttributes<HTMLElement>

const InlineCode = styled.code`
  padding: 2px 5px;
  border-radius: 3px;
  font-family: 'Nanum Gothic Coding', monospace;
  background: #f1f3f5;
`

const BlockCode = styled.pre`
  margin: 30px 0 !important;
  border-radius: 8px;

  & + * {
    font-family: 'Nanum Gothic Coding', monospace !important;
  }
`

const Code = ({ children, isBlock = false, ...props }: CodeProps) => {
  if (!isBlock) {
    return (
      <InlineCode>
        <code {...props}>{children}</code>
      </InlineCode>
    )
  } else
    return (
      <BlockCode>
        <code {...props}>{children}</code>
      </BlockCode>
    )
}

export default Code
