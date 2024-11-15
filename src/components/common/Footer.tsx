import styled from 'styled-components'

const Wrapper = styled.footer`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const Footer = () => {
  return (
    <Wrapper>
      <div>Thank You for Visiting gyojinnk's Blog, Keep Growing 🔥</div>
      <div>Copyright © 2024 Developer gyojinnk</div>
    </Wrapper>
  )
}

export default Footer
