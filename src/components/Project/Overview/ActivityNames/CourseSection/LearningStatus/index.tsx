import React, { useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Space, Checkbox } from 'antd'
import { courseSectionData } from '../../../../../../helpers/fakeData'
import { AsnButton } from '../../../../../Forms/Button'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg'
import AddRequiredDocumentModal from '../AddRequiredDocumentModal'
import {
  ILearningStatus,
  IRequiredDocuments,
  ISection
} from '../../../../../../types/project'
import AddedDocuments from '../AddedDocuments'

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
  box-shadow: var(--header-box-shadow),
    var(--project-shadow);
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
  box-shadow: var(--project-shadow);
  border-radius: 0 0 20px 20px;
  width: 84%;
  padding: 1rem 2rem 2.5rem;
`

const SectionHeaderContainer = styled(Col)`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`

const SectionRow = styled(Space)`
  border: 0.5px solid var(--dark-6);
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
  index,
  section,
  setSections,
  sections
}) => {
  const sectionsCount = 'Multi-Section'
  const [isOpenAddDocumentsModal, setIsOpenAddDocumentsModal] = useState(false)
  const [requiredDocuments, setRequiredDocuments] = useState<
  IRequiredDocuments[]
  >([])

  const onDeleteSection = (): void => {
    if (sections.length > 1) {
      setSections(
        sections.filter((item: ISection): boolean => item.id !== section.id)
      )
    }
  }

  return (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionHeader>Section {+index + 1}:</SectionHeader>
        {sections.length > (sectionsCount === 'Multi-Section' ? 2 : 1)
          ? (
          <div style={{ position: 'absolute', right: '4%', top: 23 }}>
            <DeleteIcon
              className="dynamic-delete-button"
              onClick={onDeleteSection}
            />
          </div>
            )
          : null}
      </SectionHeaderContainer>
      <SectionContent>
        {courseSectionData.map((item) => (
          <SectionRow key={item.id} direction="horizontal">
            {item.name}
            <Checkbox
              style={{
                color: 'var(--dark-2)'
              }}
              defaultChecked={item.checked}
              disabled={item.checked}
              onChange={(value) => console.log(value.target.checked)}
            ></Checkbox>
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
            <AddedDocuments
              requiredDocuments={requiredDocuments}
              setRequiredDocuments={setRequiredDocuments}
            />
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
      />
    </SectionContainer>
  )
}

export default LearningStatus
