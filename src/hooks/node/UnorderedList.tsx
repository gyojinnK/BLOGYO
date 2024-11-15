import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type ListProps = {
  children: React.ReactNode
} & HTMLAttributes<HTMLUListElement>

const List = styled.ul`
  margin-left: 20px;
  padding: 30px 0;
`

const UnorderedList = ({ children, ...props }: ListProps) => {
  return <List {...props}>{children}</List>
}

export default UnorderedList
