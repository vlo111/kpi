import React, { useState } from 'react'
import { Form } from '../../../Forms/Form'
import styled from 'styled-components'
import { Items } from './Items'
import { ConfirmModal } from '../../../Forms/Modal/ConfirmModal'
import { AsnButton } from '../../../Forms/Button'
import { useProject } from '../../../../hooks/project/useProject'
import { Col, Row } from 'antd'
import { VALIDATE_PROJECT_DETAILS_MESSAGES } from '../../../../helpers/constants'

const Collapses = styled.div`
  #dynamic_form_item > .ant-row {
    margin-bottom: 54px;
  }
  
  .last-item-footer .ant-form-item {
    margin: 0;

    button {
      width: 100%;
      background: var(--white) !important;
      font-size: var(--base-font-size) !important;
      color: var(--dark-2) !important;
      border: 1px solid var(--dark-5) !important;
    }
  }
  
  .delete-item {
    width: 100%;
    height: 65%;
    justify-content: center;
    cursor: pointer;
  }
  
  input {
    border: 1px solid var(--dark-5) !important;
    box-shadow: none;
    
    &:focus, &:hover {
      border: 1px solid var(--dark-5) !important;
      box-shadow: none;
    }
  }

  .accept-buttons {
    display: flex;
    justify-content: end;
    gap: 5rem;
`

export const Last: React.FC = () => {
  const [form] = Form.useForm()

  const { prevCurrent } = useProject()

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<any>()

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    // publish
  }

  return (
    <Collapses>
      <Form validateMessages={VALIDATE_PROJECT_DETAILS_MESSAGES} form={form} name="dynamic_form_item" onFinish={onFinish}>
        <Items name={'Organisations'} onDelete={(remove, fields) => {
          setOpenDeleteResultModal({ remove, fields })
        }}/>
        <Items name={'Regions'} onDelete={(remove, fields) => {
          setOpenDeleteResultModal({ remove, fields })
        }}/>
        <Items name={'Sectors'} onDelete={(remove, fields) => {
          setOpenDeleteResultModal({ remove, fields })
        }}/>
          <Row className="accept-buttons">
              <Col>
                  <AsnButton
                      onClick={() => {
                        prevCurrent()
                      }}
                  >
                      Previous
                  </AsnButton>
              </Col>
              <Col>
                  <AsnButton>Save as Draft</AsnButton>
              </Col>
              <Col>
                  <AsnButton type="primary" htmlType="submit">
                      Publish
                  </AsnButton>
              </Col>
          </Row>
      </Form>
      <ConfirmModal
          styles={{ gap: '6rem' }}
          yes="Delete"
          no="Cancel"
          open={openDeleteResultModal}
          title="Are you sure you want to delete  the field?"
          onSubmit={() => {
            openDeleteResultModal.remove(openDeleteResultModal.fields)
            setOpenDeleteResultModal(null)
          }}
          onCancel={() => setOpenDeleteResultModal(null)}
      />
    </Collapses>
  )
}
