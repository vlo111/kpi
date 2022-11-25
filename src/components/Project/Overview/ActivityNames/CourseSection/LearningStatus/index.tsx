import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Space, Checkbox, Form } from 'antd'
import { courseSectionData } from '../../../../../../helpers/fakeData'
import { AsnButton } from '../../../../../Forms/Button'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg'
import AddRequiredDocumentModal from '../AddRequiredDocumentModal'
import { ILearningStatus } from '../../../../../../types/project'

const SectionContainer = styled(Row)`
  width: 100%;
  gap: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;

  .dynamic-delete-button{
    margin-left: 11px;
    cursor: pointer;
  }
`
const SectionHeader = styled(Col)`
  background: var(--dark-7);
  box-shadow: 0px 4px 4px rgba(17, 27, 35, 0.05),
    0px 8px 8px rgba(17, 27, 35, 0.05);
  border-radius: 10px;
  width: 88%;
  padding: 1rem;
  font-size: var(--headline-font-size);
  color: var(--dark-2);
  position: relative;
  z-index: 1;
`
const SectionContent = styled(Col)`
  background: var(--dark-7);
  box-shadow: 0px 8px 8px rgba(17, 27, 35, 0.05);
  border-radius: 0 0 20px 20px;
  width: 84%;
  padding: 1rem 2rem 2.5rem;
`

const SectionRow = styled(Space)`
  border: 0.5px solid #edf0f4;
  padding: 11px 15px 11px 8px;
  background-color: var(--white);
  font-size: var(--headline-font-size);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  .ant-space-item {
    height: 30px;
  }

  .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    border: 1px solid var(--dark-border-ultramarine);

    ::after {
      width: 6px;
      height: 10px;
      border: 2px solid var(--white);
      border-top: 0;
      border-left: 0;
      top: 6px;
      left: 3px;
    }
  }

  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: var(--dark-border-ultramarine);
      border: 2px solid var(--dark-border-ultramarine);
    }
  }

  .ant-checkbox-wrapper {
    margin-left: 0px;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
`

const LearningStatus: React.FC<ILearningStatus> = ({ fields, remove, field }) => {
  const [isOpenAddDocumentsModal, setIsOpenAddDocumentsModal] = useState(false)

  return (
    <SectionContainer>
      <SectionHeader>Section 1:</SectionHeader>
      {fields.length > 1
        ? (
        <DeleteIcon
          className="dynamic-delete-button"
          onClick={() => remove(field.name)}
        />
          )
        : null}
      <SectionContent>
        {courseSectionData.map((item) => (
          <SectionRow key={item.id} direction="horizontal">
            {item.name}
            <Form.Item name="statuses">
              <Checkbox
                style={{
                  color: 'var(--dark-2)'
                }}
                defaultChecked={item.checked}
                disabled={item.disabled}
              ></Checkbox>
            </Form.Item>
          </SectionRow>
        ))}
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem'
          }}
        >
          <AsnButton
            type="primary"
            onClick={() => setIsOpenAddDocumentsModal(true)}
          >
            Add required documents
          </AsnButton>
        </Space>
      </SectionContent>
      <AddRequiredDocumentModal
        isOpenAddDocumentsModal={isOpenAddDocumentsModal}
        setIsOpenAddDocumentsModal={setIsOpenAddDocumentsModal}
      />
    </SectionContainer>
  )
}

export default LearningStatus
