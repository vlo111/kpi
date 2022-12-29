import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Space, Checkbox } from 'antd';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import AddRequiredDocumentModal from '../AddRequiredDocumentModal';
import AddedDocuments from '../AddedDocuments';
import { AsnButton } from '../../Forms/Button';
import {
  ILearningStatus
} from '../../../types/project';
import useDeleteSection from '../../../api/Activity/Template/Sections/useDeleteSection';
import { Void } from '../../../types/global';
import useUpdateSectionStatus from '../../../api/Activity/Template/Sections/useupdateSectionStatus';

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
`;
const SectionHeader = styled(Col)`
  background: var(--dark-7);
  box-shadow: var(--header-box-shadow), var(--project-shadow);
  border-radius: 10px;
  width: 88%;
  padding: 1rem;
  font-size: var(--headline-font-size);
  color: var(--dark-2);
  position: relative;
  z-index: 1;
`;
const SectionContent = styled(Col)`
  background: var(--dark-7);
  box-shadow: var(--project-shadow);
  border-radius: 0 0 20px 20px;
  width: 84%;
  padding: 1rem 2rem 2.5rem;
`;

const SectionHeaderContainer = styled(Col)`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

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
`;

const LearningStatus: React.FC<ILearningStatus> = ({
  section,
  data,
  refetch,
  index
}) => {
  const [isOpenAddDocumentsModal, setIsOpenAddDocumentsModal] = useState(false);

  const { mutate: deleteSectionById } = useDeleteSection({
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: updateSectionStatus } = useUpdateSectionStatus({
    onSuccess: () => {
      refetch();
    }
  });

  const handleSectionStatus = (settingId: string): void => {
    updateSectionStatus({
      id: settingId
    });
  };

  const onDeleteSection: Void = () => {
    deleteSectionById({ id: section?.id });
  };

  return (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionHeader>Section {+index + 1}:</SectionHeader>
        {data?.courseStructure !== 'ONE_SECTION' && data?.sections?.length > 2
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
        {section?.sectionSettingMap.map((item: any) => (
          <SectionRow key={item.id} direction="horizontal">
            {item.setting.title}
            <Checkbox
              style={{
                color: 'var(--dark-2)'
              }}
              defaultChecked={item.active}
              disabled={item?.setting?.changeable === false}
              onChange={() => handleSectionStatus(item.id)}
            />
          </SectionRow>
        ))}
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: 'flex',
            justifyContent:
            section?.requiredDocuments?.length > 0 ? 'space-between' : 'flex-end',
            alignItems: 'flex-start',
            marginTop: '1rem'
          }}
        >
          {section?.requiredDocuments?.length > 0
            ? (
            <AddedDocuments
              requiredDocuments={section.requiredDocuments}
              refetch={refetch}
            />
              )
            : null}
          <AsnButton
            className="primary"
            onClick={() => setIsOpenAddDocumentsModal(true)}
          >
            Add required documents
          </AsnButton>
        </Space>
      </SectionContent>
      <AddRequiredDocumentModal
        isOpenAddDocumentsModal={isOpenAddDocumentsModal}
        setIsOpenAddDocumentsModal={setIsOpenAddDocumentsModal}
        sectionId={section.id}
        refetch={refetch}
      />
    </SectionContainer>
  );
};

export default LearningStatus;
