import React from 'react'
import AnsModal from '../../../Forms/Modal'
import styled from 'styled-components'
import { ConfirmModalType } from '../../../../types/global'
import { AsnButton } from '../../Button'

const ConfirmModal = styled(AnsModal)`
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

const ConfirmModalWrapper: React.FC<ConfirmModalType> = ({ open, title, onSubmit, onCancel, styles }) => {
  return (
        <ConfirmModal
            open={open}
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
                    <AsnButton type="primary" onClick={onSubmit}>Delete</AsnButton>
                    <AsnButton onClick={onCancel}>Cancel</AsnButton>
                </div>
            </div>
        </ConfirmModal>
  )
}

export default ConfirmModalWrapper
