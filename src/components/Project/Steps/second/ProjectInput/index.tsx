import styled from 'styled-components'

export const ProjectInput = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--base-box-shadow);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  

  .main {
    margin-bottom: 19px;
    .ant-form-item {
      margin-bottom: 1rem;
    }

    .ant-form-item-label {
      padding: 0;
    }
  }

  .footer {
    display: flex;
    justify-content: space-evenly;

    button {
      width: 133px;
      height: 44px !important;
      border-radius: 10px !important;
    }
  }
`
