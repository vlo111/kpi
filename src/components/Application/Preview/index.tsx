import React from 'react';
import { Divider, Space, Typography } from 'antd';
import styled from 'styled-components';
import { Void } from '../../../types/global';
import { IFontWeight, IPreviewModal } from '../../../types/project';
import { AsnButton } from '../../Forms/Button';
import { AsnCheckbox } from '../../Forms/Checkbox';
import { AsnModal } from '../../Forms/Modal';
import { CardTitle, DetailsContainer, ModalText } from '../applicationStyle';
import EducationWork from './EducationWork';
import OtherInformation from './OtherInformation';
import PersonalDetails from './PersonalDetails/Index';

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
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal
}) => {
  const handleCancel: Void = () => {
    setIsOpenCreateActivityModal(false);
  };

  return (
    <PreviewModalContent
      footer={false}
      open={isOpenCreateActivityModal}
      onCancel={handleCancel}
      width="70%"
    >
      <PreviewContainer>
        <ModalTitle fontWeight={'500'}>Preview of Application form</ModalTitle>
        <ModalTitle>Python course</ModalTitle>
        <ModalText>{previewData.courseDescription}</ModalText>
        <PersonalDetails />
        <EducationWork />
        <OtherInformation />
        <DetailsContainer>
          <CardTitle>Terms & Conditions/ Պայմաններ և դրույթներ</CardTitle>
          <ModalText style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            {previewData.termsCondition}
          </ModalText>
          <AsnCheckbox defaultChecked={true}>I agree / Համաձայն եմ</AsnCheckbox>
          <ModalText style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
            Համաձայն եմ, որ իմ կողմից ներկայացված տեղեկություններն օգտագործվեն՝
            ծրագրի նպատակներից ելնելով։
          </ModalText>
          <AsnCheckbox defaultChecked={true}>I agree / Համաձայն եմ</AsnCheckbox>
        </DetailsContainer>
        <Signature>
          <Divider orientation="left" plain>
            Online signature / Առցանց ստորագրություն
          </Divider>
        </Signature>
        <Space
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '3.5rem 0rem'
          }}
          size={60}
        >
          <AsnButton className='default' onClick={() => setIsOpenCreateActivityModal(false)}>
            Back
          </AsnButton>
          <AsnButton className="primary">Publish</AsnButton>
        </Space>
      </PreviewContainer>
    </PreviewModalContent>
  );
};

export default PreviewModal;
