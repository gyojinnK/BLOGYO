import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type BlockquoteProps = {
  children: React.ReactNode
} & HTMLAttributes<HTMLQuoteElement>

const Component = styled.blockquote`
  margin: 20px 0;
  padding: 20px;
  border-radius: 8px;
  background: #f1f3f5;
`

const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  return <Component {...props}>{children}</Component>
}

export default Blockquote
