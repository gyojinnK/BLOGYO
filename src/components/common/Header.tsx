import { Link } from 'gatsby'
import styled from 'styled-components'
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineInstagram,
} from 'react-icons/ai'

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`
const Title = styled(Link)`
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
`

const Menu = styled.nav`
  display: flex;
  gap: 15px;
  font-size: 25px;

  & > a {
    display: flex;
    color: inherit;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const Header = () => {
  return (
    <Wrapper>
      <Title to="/">Developer gyojinnk</Title>

      <Menu>
        <a href="https://github.com/gyojinnK" target="_blank">
          <AiFillGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/%EA%B5%90%EC%A7%84-%EA%B0%95-68a6282b7/"
          target="_blank"
        >
          <AiFillLinkedin />
        </a>
      </Menu>
    </Wrapper>
  )
}

export default Header
