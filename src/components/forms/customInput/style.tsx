import styled from 'styled-components'

interface Props {
  error: string
}

export const InputContainer = styled.div<Props>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;

  input {
    padding: clamp(8px, 0.8vw, 50px);
    background: #FFFFFF;
    border-radius: 5px;
    outline: none;
    width: calc(100% - 1.4vw);
    font-size: clamp(12px, 0.8vw, 50px);
    ${(props) => (props.error !== undefined) ? ('border: 1px solid var(--error)') : ('border: 1px solid var(--primary-dark-gray)')};
  }

  * {
    width: 100%;
  }

  label {
    color: var(--dark-2);
    font-weight: var(--font-normal);
    font-size: var(--base-font-size);
    margin-bottom: 3px;
    margin-left: 5px;
  }

  .error {
    color: var(--error);
    margin-top: 5px;
    font-size: var(--font-size-semismall);
  }
`
