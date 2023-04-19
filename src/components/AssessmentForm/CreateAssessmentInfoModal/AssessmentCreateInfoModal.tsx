import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Row, Space, Typography } from 'antd';

import getAssessmentFormByProjectId from '../../../api/AssessmentForm/useGetAssessmentFormProjectId';
import { ReactComponent as Preview } from '../../../assets/icons/eye.svg';
import {
  CreateAssessmentIfoModalTypes,
  IAssessments
} from '../../../types/api/assessment';
import { AsnButton } from '../../Forms/Button';
import { AsnModal } from '../../Forms/Modal';
import { PATHS } from '../../../helpers/constants';

const CreateAssessmentModal = styled(AsnModal)`
  width: 604px;
  .ant-modal-content {
    padding: 60px 32px 42px 32px;
  }

  h4,
  h5 {
    font-weight: var(--font-normal);
    font-size: var(--base-font-size);
    margin-bottom: 12px;
    margin-top: 32px;
    color: var(--dark-border-ultramarine) !important;
  }

  svg {
    cursor: pointer;
    path {
      fill: var(--dark-2) !important;
    }
  }

  h5 {
    cursor: pointer;
    color: var(--dark-2) !important;
    margin-bottom: 12px !important;
    margin-top: 0 !important;
  }

  .active_form {
    h5 {
      color: var(--dark-border-ultramarine) !important;
    }
    svg {
      path {
        fill: var(--dark-border-ultramarine) !important;
      }
    }
  }

  .assessment {
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
  projectId,
  courseId,
  navigateRouteInfo,
  setOpenPreviewAssessmentModal,
  footerButtons,
  setFooterButtons
}) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { data } = getAssessmentFormByProjectId(
    projectId,
    { type: 'PRE_ASSESSMENT' },
    { enabled: Boolean(projectId) }
  );

  const createAssessmentForm = (): void => {
    navigate(`/${PATHS.ASSESSMENTFORMCREATE.replace(':id', courseId)}`, {
      state: { type, navigateRouteInfo: { ...navigateRouteInfo, projectId } }
    });
  };

  const nextToDuplicate = (item: IAssessments | undefined): void => {
    setOpen(false);
    setOpenPreviewAssessmentModal(true);
  };

  return (
    <CreateAssessmentModal
      footer={false}
      open={open}
      title="Publish assessment form"
      onCancel={() => setOpen(false)}
    >
      <AsnButton
        className="transparent assessment"
        onClick={createAssessmentForm}
      >
        + Create New
      </AsnButton>
      {data?.length > 0 && (
        <Row justify="start" align="middle">
          <Title level={4}>Duplicate existing assessment form</Title>
        </Row>
      )}
      <Space direction="vertical" size={0}>
        {data?.map((item: IAssessments) => (
          <Space
            key={item?.id}
            align="baseline"
            className={
              footerButtons?.id === item.id ? 'active_form' : undefined
            }
            onClick={() => {
              setFooterButtons(item);
            }}
          >
            <Preview />
            <Title level={5}>{item?.title}</Title>
          </Space>
        ))}
      </Space>
      {Boolean(footerButtons) && (
        <Row
          gutter={[60, 0]}
          align="middle"
          justify="center"
          style={{ marginTop: '3vh' }}
        >
          <Col>
            <AsnButton
              className="default"
              onClick={() => {
                setFooterButtons(undefined);
                setOpen(false);
              }}
            >
              Cancel
            </AsnButton>
          </Col>
          <Col>
            <AsnButton
              className="primary"
              onClick={() => nextToDuplicate(footerButtons)}
            >
              Next
            </AsnButton>
          </Col>
        </Row>
      )}
    </CreateAssessmentModal>
  );
};
export default CreateAssessmentInfoModal;
