import { HTMLAttributes } from 'react'
import styled from 'styled-components'

type ListProps = {
  children: React.ReactNode
} & HTMLAttributes<HTMLOListElement>

const List = styled.ol`
  margin-left: 20px;
  padding: 30px 0;
`

const OrderedList = ({ children, ...props }: ListProps) => {
  return <List {...props}></List>
}

export default OrderedList
