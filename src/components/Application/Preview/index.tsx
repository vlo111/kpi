import React from 'react';
import { Divider, Space, Typography } from 'antd';
import styled from 'styled-components';
import { Void } from '../../../types/global';
import { IFontWeight } from '../../../types/project';
import { AsnButton } from '../../Forms/Button';
import { AsnModal } from '../../Forms/Modal';
import { ModalText } from '../applicationStyle';
import EducationWork from './EducationWork';
import OtherInformation from './OtherInformation';
import PersonalDetails from './PersonalDetails/Index';
import TermsCondition from './TermsCondition';
import ProfessionalSkills from './ProfessionalSkills/Index';
import { IPreviewModal } from '../../../types/api/application/applicationForm';

const PreviewModalContent = styled(AsnModal)`
  .ant-modal-content {
    padding: 3rem 0rem 1rem;
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 75vh;
  overflow: auto;
  padding: 0rem 6rem;
`;

const ModalTitle = styled(Typography.Title)<IFontWeight>`
  font-size: 24px !important;
  font-weight: ${(props) => props.fontWeight ?? 400} !important;
  color: var(--dark-border-ultramarine) !important;
  margin-top: 0px !important;
`;

const Signature = styled.span`
  font-size: var(--base-font-size);
  color: var(--dark-1);
  width: 100%;
  margin-top: 2rem;
  .ant-divider {
    ::before {
      display: none;
    }
    .ant-divider-inner-text {
      font-weight: 700;
      padding: 0rem 1rem 0rem 0rem;
    }
    ::after {
      border-top: 1px solid var(--dark-border-ultramarine);
      top: 6px;
    }
  }
`;

const PreviewModal: React.FC<IPreviewModal> = ({
  questionData,
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal
}) => {
  const handleCancel: Void = () => {
    setIsOpenCreateActivityModal(false);
  };

  const conditionsData = JSON.parse(
    questionData?.termsAndConditions !== undefined
      ? questionData?.termsAndConditions
      : '[]'
  );

  return (
    <PreviewModalContent
      footer={false}
      open={isOpenCreateActivityModal}
      onCancel={handleCancel}
      width="70%"
    >
      <PreviewContainer>
        <ModalTitle fontWeight={'500'}>Preview of Application form</ModalTitle>
        <ModalTitle>{questionData?.title}</ModalTitle>
        <ModalText>{questionData?.description}</ModalText>
        {questionData !== undefined && (
          <PersonalDetails
            personalDetailsData={questionData?.applicationFormSections?.[0]}
          />
        )}
        {questionData !== undefined && (
          <EducationWork
            educationWorkData={questionData?.applicationFormSections?.[1]}
          />
        )}
        {questionData !== undefined && (
          <OtherInformation
            otherInformationData={questionData?.applicationFormSections?.[2]}
          />
        )}
        {questionData?.applicationFormSections !== undefined &&
        questionData?.applicationFormSections[3]?.questions?.length > 0
          ? (
          <ProfessionalSkills
            professionalSkills={questionData?.applicationFormSections?.[3]}
          />
            )
          : null}
        {questionData?.termsAndConditions !== undefined &&
        conditionsData?.length > 0
          ? (
          <TermsCondition
            termsConditionData={
              questionData?.termsAndConditions !== undefined
                ? questionData?.termsAndConditions
                : '[]'
            }
          />
            )
          : null}
        {questionData?.onlineSignature === true
          ? (
          <Signature>
            <Divider orientation="left" plain>
              Online signature / Առցանց ստորագրություն
            </Divider>
          </Signature>
            )
          : null}
        <Space
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '3.5rem 0rem'
          }}
          size={60}
        >
          <AsnButton
            className="default"
            onClick={() => setIsOpenCreateActivityModal(false)}
          >
            Back
          </AsnButton>
        </Space>
      </PreviewContainer>
    </PreviewModalContent>
  );
};

export default PreviewModal;
