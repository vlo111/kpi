import React from 'react'
import { AsnModal } from '../../../Forms/Modal'
import styled from 'styled-components'
import { ConfirmModalType } from '../../../../types/global'
import { AsnButton } from '../../Button'

const ConfirmModalWrapper = styled(AsnModal)`
   .ant-modal-content{
    padding: 70px 96px 60px 96px !important;
    }
  .wrapper {
    display: flex;
    flex-direction: column;

    .title {
      font-size: var(--headline-font-size);
      color: var(--dark-2);
      text-align: center;
    }
    
    .buttons {
      display: flex;
      justify-content: space-around;

      button {
        border-radius: 10px !important;
      }
    }
  }
`

export const ConfirmModal: React.FC<ConfirmModalType> = ({ open, title, onSubmit, onCancel, yes, no, styles }) => {
  return (
        <ConfirmModalWrapper
            open={Boolean(open)}
            width={'600px'}
            onCancel={onCancel}
            footer={false}
            centered
        >
            <div className="wrapper" style={styles}>
                <div className="title">
                    {title}
                </div>
                <div className="buttons">
                    <AsnButton onClick={onCancel}>{no}</AsnButton>
                    <AsnButton type="primary" onClick={onSubmit}>{yes}</AsnButton>
                </div>
            </div>
        </ConfirmModalWrapper>
  )
}
