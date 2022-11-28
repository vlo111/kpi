import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Space, Checkbox, Form } from 'antd'
import { courseSectionData } from '../../../../../../helpers/fakeData'
import { AsnButton } from '../../../../../Forms/Button'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg'
import AddRequiredDocumentModal from '../AddRequiredDocumentModal'
import {
  ILearningStatus,
  IRequiredDocuments
} from '../../../../../../types/project'

const SectionContainer = styled(Row)`
  width: 100% !important;
  gap: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .dynamic-delete-button {
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

const DocumentsCountContainer = styled(Space)`
  background: var(--white);
  padding: 0.5rem 0.25rem 1.7rem 2rem;
  border-radius: 20px;
  width: 33vw;
`

const SectionHeaderContainer = styled(Col)`
  width: 100%;
  position: relative;
  display: flex;
    justify-content: center;
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
    border: 1px solid var(--dark-border-ultramarine) !important;

    ::after {
      width: 6px;
      height: 10px;
      border: 2px solid var(--white);
      border-top: 0;
      border-left: 0;
      top: 7px;
      left: 4px;
    }
  }
  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
    width: 6px;
    height: 10px;
    border: 2px solid var(--white);
    border-top: 0;
    border-left: 0;
    top: 7px;
    left: 4px;
    opacity: 0.6;
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

const LearningStatus: React.FC<ILearningStatus> = ({
  fields,
  remove,
  restField,
  name
}) => {
  const [isOpenAddDocumentsModal, setIsOpenAddDocumentsModal] = useState(false)
  const [requiredDocuments, setRequiredDocuments] = useState<
  IRequiredDocuments[]
  >([])

  const onDeleteDocument = (id: string): void => {
    setRequiredDocuments(
      requiredDocuments.filter((document) => {
        return document.id !== id
      })
    )
  }

  return (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionHeader>Section {+name + 1}:</SectionHeader>
        {fields.length > 1
          ? (
            <div style={{ position: 'absolute', right: 46, top: 23 }}>
              <DeleteIcon
                className="dynamic-delete-button"
                onClick={() => remove(name)}
              />
            </div>
            )
          : null}
      </SectionHeaderContainer>
      <SectionContent>
        {courseSectionData.map((item) => (
          <SectionRow key={item.id} direction="horizontal">
            {item.name}
            <Form.Item name="selection" {...restField}>
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
            justifyContent:
              requiredDocuments.length > 0 ? 'space-between' : 'flex-end',
            alignItems: 'flex-start',
            marginTop: '1rem'
          }}
        >
          {requiredDocuments.length > 0
            ? (
            <DocumentsCountContainer direction="vertical" size={24}>
              <Space
                style={{
                  fontWeight: 600,
                  fontSize: 'var(--headline-font-size)'
                }}
              >
                Required documents list:
              </Space>
              <Space
                direction="vertical"
                style={{ width: '100%', height: '130px', overflow: 'auto' }}
                size={0}
              >
                {requiredDocuments.map((document) => (
                  <Space
                    key={document.id}
                    direction="horizontal"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Space style={{ fontSize: 'var(--headline-font-size)' }}>
                      {document.documentName}:
                      <Space style={{ color: 'var(--dark-4)' }}>
                        {document.documentCount}
                      </Space>
                    </Space>
                    <Space style={{ marginRight: '1rem', cursor: 'pointer' }}>
                      <DeleteIcon
                        onClick={() => onDeleteDocument(document.id)}
                      />
                    </Space>
                  </Space>
                ))}
              </Space>
            </DocumentsCountContainer>
              )
            : null}
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
        setRequiredDocuments={setRequiredDocuments}
        requiredDocuments={requiredDocuments}
        restField={restField}
        name={name}
      />
    </SectionContainer>
  )
}

export default LearningStatus
