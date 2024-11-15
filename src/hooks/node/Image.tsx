import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styled from 'styled-components'

type ImageProps = {
  image: IGatsbyImageData
  alt: string
}

const Component = styled(GatsbyImage)`
  width: 100%;
  margin: 30px 0;

  & + & {
    margin: -20px 0 30px 0;
  }
`

const Image = ({ image, alt }: ImageProps) => {
  return <Component image={image} alt={alt} />
}

export default Image
