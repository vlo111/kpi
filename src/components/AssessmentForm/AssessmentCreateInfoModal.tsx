import React from 'react';
import { Row, Space, Typography } from 'antd';

import getAssessmentFormByProjectId from '../../api/AssessmentForm/useGetAssessmentFormProjectId';
import { ReactComponent as Preview } from '../../assets/icons/eye.svg';
import { CreateAssessmentIfoModalTypes } from '../../types/api/assessment';
import { AsnButton } from '../Forms/Button';
import { AsnModal } from '../Forms/Modal';
import styled from 'styled-components';

const CreateAssessmentModal = styled(AsnModal)`
    width: 604px;
    .ant-modal-content{
       padding: 60px 32px 42px 32px;
    }

    h4, h5{
        font-weight: var(--font-normal);
        font-size: var(--base-font-size);
        margin-bottom: 12px;
        margin-top: 32px;
        color: var(--dark-border-ultramarine) !important;
    }

    h5{
        color: var(--dark-2) !important;
        margin-bottom: 12px !important;
        margin-top: 0 !important;
    }

    .assessment{
        border: 1px solid var(--dark-border-ultramarine) !important;
        color: var(--dark-border-ultramarine) !important;
        font-weight: var(--font-regular) !important;
        font-size: var(--base-font-size) !important;
        height: 32px !important;
        padding: 0 9px !important;
    }

`;

const CreateAssessmentInfoModal: React.FC<CreateAssessmentIfoModalTypes> = ({
  open,
  setOpen,
  type,
  projectId
}) => {
  const { data } = getAssessmentFormByProjectId(
    projectId,
    { type },
    { enabled: Boolean(projectId) }
  );
  const { Title } = Typography;
  return (
    <CreateAssessmentModal
      footer={false}
      open={open}
      title="Publish assessment form"
      onCancel={() => setOpen(false)}
    >
      <AsnButton className="transparent assessment">+ Create New</AsnButton>
      {data?.length > 0 && (
        <Row justify="start" align="middle">
          <Title level={4}>Duplicate existing assessment form</Title>
        </Row>
      )}
      {Boolean(data) &&
        data?.map((item) => (
          <Space key={item?.id} align='baseline'>
            <Preview />
            <Title level={5}>{item?.title}</Title>
          </Space>
        ))}
    </CreateAssessmentModal>
  );
};
export default CreateAssessmentInfoModal;
