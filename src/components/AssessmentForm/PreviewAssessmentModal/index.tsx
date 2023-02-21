import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PATHS } from '../../../helpers/constants';
import { Void } from '../../../types/global';
import { AsnButton } from '../../Forms/Button';
import { AsnModal } from '../../Forms/Modal';
import AssessmentForms, { ButtonsContainer } from '../DynamicAssessmentForm';

const PreviewModalContent = styled(AsnModal)`
  top: 15px !important;
  .ant-modal-content {
    padding: 3rem 0rem 1rem;
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 90vh;
  overflow: auto;
  padding: 0rem 6rem;
`;

const PreviewAssessmentModal: React.FC<any> = ({
  openPreviewAssessmentModal,
  setOpenPreviewAssessmentModal,
  setOpenModal,
  footerButtons,
  courseId,
  navigateRouteInfo,
  type,
  projectId
}) => {
  const handleCancel: Void = () => {
    setOpenPreviewAssessmentModal(false);
  };
  const navigate = useNavigate();

  const onNextAssessment = (): void => {
    navigate(`/${PATHS.ASSESSMENTFORMCREATE.replace(':id', courseId)}`, {
      state: { type, navigateRouteInfo: { ...navigateRouteInfo, projectId }, footerButtons, preview: true }
    });
  };

  return (
    <PreviewModalContent
      footer={false}
      open={openPreviewAssessmentModal}
      onCancel={handleCancel}
      width="80%"
    >
      <PreviewContainer>
        <AssessmentForms
          preview={true}
          footerButtons={footerButtons}
        />
        <ButtonsContainer marginTop="2rem" style={{ width: '100%' }}>
          <AsnButton
            className="default"
            onClick={() => {
              setOpenPreviewAssessmentModal(false);
              setOpenModal(true);
            }}
          >
            Cancel
          </AsnButton>
          <AsnButton className="primary" onClick={onNextAssessment}>Next</AsnButton>
        </ButtonsContainer>
      </PreviewContainer>
    </PreviewModalContent>
  );
};

export default PreviewAssessmentModal;
