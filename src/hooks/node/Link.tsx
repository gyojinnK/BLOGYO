import { HTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

type LinkProps = {
  children: ReactNode
} & HTMLAttributes<HTMLAnchorElement>

const Component = styled.a`
  color: #4263eb;
  text-decoration: underline;
`

const Link = ({ children, ...props }: LinkProps) => {
  return <Component {...props}>{children}</Component>
}

export default Link
