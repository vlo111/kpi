import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { Void } from '../../../types/global';
import { AsnButton } from '../../Forms/Button';
import { AsnModal } from '../../Forms/Modal';
import { ReactComponent as SuccessCreatedIcon } from '../../../assets/icons/success-created.svg';
import { PATHS } from '../../../helpers/constants';
import { useNavigate } from 'react-router-dom';
import { IFormUrlModal } from '../../../types/api/application/applicationForm';

const PreviewModalContent = styled(AsnModal)`
  .ant-modal-content {
    padding: 3rem 0rem 1rem;
  }
`;
const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  padding: 0rem 6rem;
`;

const ModalTitle = styled(Typography.Title)`
  font-size: 24px !important;
  font-weight: 400 !important;
  color: var(--dark-border-ultramarine) !important;
  margin-top: 0px !important;
`;
const UrlContainer = styled(Typography.Title)`
  margin: 2rem 0rem !important;
  background-color: var(--primary-light-1);
  padding: 1.5rem 1rem;
  font-size: var(--base-font-siz) !important;
  color: var(--dark-border-ultramarine) !important;
`;

const FormUrlModal: React.FC<IFormUrlModal> = ({
  formUrlModal,
  setFormUrlModal,
  responseIds
}) => {
  const navigate = useNavigate();
  const handleCancel: Void = () => {
    if (responseIds !== undefined) {
      navigate(
        `/project/${PATHS.SUBACTIVITY.replace(
          ':id',
          responseIds?.result?.subActivityId
        )}`
      );
    }
    setFormUrlModal(false);
  };

  const onPublishClick: Void = () => {
    if (responseIds !== undefined) {
      navigate(
        `/project/${PATHS.SUBACTIVITY.replace(
          ':id',
          responseIds?.result?.subActivityId
        )}`
      );
    }
    setFormUrlModal(false);
  };
  return (
    <PreviewModalContent
      footer={false}
      open={formUrlModal}
      onCancel={handleCancel}
    >
      <PreviewContainer>
        <ModalTitle>Form saved</ModalTitle>
        <SuccessCreatedIcon />
        <UrlContainer
          copyable={{
            text: `${
              process.env.REACT_APP_BASE_URL_HOST ?? ''
            }${PATHS.APPLYAPPLICANTFORM.replace(
              ':id',
              responseIds !== undefined ? responseIds?.result?.id : ''
            )}`
          }}
        >
          {`${
            process.env.REACT_APP_BASE_URL_HOST ?? ''
          }${PATHS.APPLYAPPLICANTFORM.replace(':id', responseIds !== undefined ? responseIds?.result?.id : '')}`}
        </UrlContainer>
        <AsnButton className="primary" onClick={onPublishClick}>
          Ok
        </AsnButton>
      </PreviewContainer>
    </PreviewModalContent>
  );
};

export default FormUrlModal;
