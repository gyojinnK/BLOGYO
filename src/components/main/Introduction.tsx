import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const ProfileImage = styled.div`
  overflow: hidden;
  width: 140px;
  height: 140px;
  margin-bottom: 30px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`

const SubText = styled.div`
  font-size: 30px;
  font-weight: 100;

  @media (max-width: 1024px) {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

const MainText = styled.div`
  font-size: 40px;
  font-weight: 800;

  @media (max-width: 1024px) {
    font-size: 30px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const Introduction = () => {
  return (
    <div>
      <ProfileImage>
        <StaticImage src="../../images/gyojinnk-thumb.png" alt="profile" />
      </ProfileImage>

      <SubText>Nice to Meet you!</SubText>
      <MainText>I'm Junior Frontend Developer gyojinnk</MainText>
    </div>
  )
}

export default Introduction
