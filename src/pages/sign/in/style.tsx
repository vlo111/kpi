import styled from 'styled-components'
import img from '../../../assets/icons/login-background.svg'
import { Flex } from '../../../types/pages'

const flex: Flex = (content, direction?) => ({
  display: 'flex',
  justifyContent: content,
  alignItems: 'center',
  flexDirection: direction ?? 'initial'
})

export const Wrapper = styled.div`
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-position-y: 100%;
  width: ${window.innerWidth}px;
  height: 70%;
  ${flex('center')}
`

export const Container = styled.div`
  width: 31.8%;
  min-width: 300px;
  height: 60%;
  top: clamp(130px,7vw, 30%);
  left: ${(50 - (31.8 / 2))}%;
  user-select: none;
  ${flex('flex-start', 'column')}
  position: fixed;

  .logo {
    margin-bottom: var(--interval);

    svg {
      max-width: ${window.innerWidth * 0.13}px;
      height: ${window.innerHeight * 0.08}px;
      min-width: 100px;
    }
  }

  form {
    ${flex('flex-start', 'column')}
    width: 100%;
    
    label {
      margin-top: var(--interval);
    }
  }

  .title {
    font-weight: var(--font-bold);
    font-size: clamp(25px, 3vw, 50px);
    text-transform: capitalize;
    color: var(--primary-dark-gray);
    margin-bottom: var(--interval);
  }
`
