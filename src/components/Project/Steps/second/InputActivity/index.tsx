import React from 'react'
import styled from 'styled-components'

const ActivityContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-top: 3px solid #f3c262;
  box-shadow: -4px -4px 4px rgb(42 85 120 / 5%), 4px 4px 4px rgb(42 85 120 / 5%);
  border-radius: 20px;
  padding: 32px;

  input,
  textarea {
    height: 58px !important;
  }

  .ant-row {
    > div:nth-child(1) input {
      width: 78px;
    }

    > div:nth-child(2) {
      width: calc(100% - 78px - 148px - 58px - 48px);

      .ant-col {
        width: 100%;
      }
    }

    > div:nth-child(3) input {
      width: 148px;
    }

    > div:nth-child(4) input {
      width: 58px;
    }
  }
`

const InputActivity: any = () => {
  return (
        <ActivityContainer>
            activity
        </ActivityContainer>
  )
}

export default InputActivity
