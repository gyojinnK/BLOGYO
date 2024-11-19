import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 425px) {
    margin-top: 20%;
  }
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #545454;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 425px) {
    width: 30px;
    height: 30px;
    border-width: 4px;
  }
`

const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}

export default Loading
