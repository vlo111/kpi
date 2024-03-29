import React, { useState } from 'react';
import styled from 'styled-components';
import LearningStatus from '../../components/CourseSection/LearningStatus';
import { Col, Row, Space } from 'antd';
import { AsnButton } from '../../components/Forms/Button';
import { AsnModal } from '../../components/Forms/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../helpers/constants';
import { ReactComponent as SuccessfulIcon } from '../../assets/icons/successful.svg';
import getSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import useCreateNewSection from '../../api/Activity/Template/Sections/useCreateNewSection';
import usePublishActivityTemplate from '../../api/Activity/Template/usePublishActivityTemplate';
import { ISectionData } from '../../types/project';
import { ISectionResult, Void } from '../../types/global';

const CourseSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-col-sm-20 {
    max-width: 100% !important;
  }
`;
const CourseSection: React.FC = () => {
  const navigate = useNavigate();
  const [isSavedProjectModal, setIsSavedProjectModal] = useState(false);
  const [isSuccessPublishModal, setIsSuccessPublishModal] = useState(false);
  const { id: templateId } = useParams<{ id: string | undefined }>();

  const { data, refetch } = getSingleTemplate(templateId, {});

  const { mutate: createTemplateSection } = useCreateNewSection({
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: publishTemplate } = usePublishActivityTemplate({
    onSuccess: (options: ISectionResult<string>) => {
      if (options.data.result === 'successfully published') {
        setIsSavedProjectModal(false);
        setIsSuccessPublishModal(true);
        setTimeout(() => {
          setIsSuccessPublishModal(false);
          navigate(
            `/project/${PATHS.OVERVIEW.replace(':id', data?.projectId)}`
          );
        }, 2000);
      }
    }
  });

  const onAddSection: Void = () => {
    if (templateId != null) {
      createTemplateSection({ id: templateId });
    }
  };

  const handleCancel: Void = () => {
    setIsSavedProjectModal(false);
  };
  const handleSuccessModalCancel: Void = () => {
    setIsSuccessPublishModal(false);
  };

  const onPublishSections: Void = () => {
    if (templateId != null) {
      publishTemplate({ id: templateId });
    }
  };

  return (
    <CourseSectionContainer>
      <Space
        size={32}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          margin: '2rem 0px 2rem 0rem ',
          width: '88%',
          fontSize: 'var(--headline-font-size)'
        }}
      >
        <span>Phases:  Input course Phases name and choose their learning stauses </span>
      </Space>
      <Space direction="vertical" size={32} style={{ width: '100%' }}>
        {data?.sections?.map((section: ISectionData, index: number) => (
          <LearningStatus
            key={section.id}
            section={section}
            refetch={refetch}
            data={data}
            index={index}
          />
        ))}
      </Space>
      {data?.courseStructure !== 'ONE_SECTION' &&
      data?.sections?.length !== 4
        ? (
        <AsnButton
          className="primary"
          onClick={onAddSection}
          style={{ width: '88%', marginTop: '2rem' }}
        >
          +Add Phase
        </AsnButton>
          )
        : null}
      <Space
        size={32}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '3.75rem 0px 2rem 0rem ',
          width: '88%'
        }}
      >
        <AsnButton
          className="default"
          onClick={() => {
            if (templateId != null) {
              navigate(`/${PATHS.ACTIVITYTEMPLATE.replace(':id', templateId)}`);
            }
          }}
        >
          Previous
        </AsnButton>
        <AsnButton
          className="default"
          onClick={() =>
            navigate(
              `/${PATHS.PROJECT}/${PATHS.OVERVIEW.replace(
                ':id',
                data?.projectId
              )}`
            )
          }
        >
          Save as Draft
        </AsnButton>
        <AsnButton
          className="primary"
          onClick={() => setIsSavedProjectModal(true)}
        >
          Publish
        </AsnButton>
      </Space>

      <AsnModal
        footer={false}
        open={isSavedProjectModal}
        title="Are you sure you want to publish the template? "
        onCancel={handleCancel}
        width="45%"
      >
        <Row gutter={[48, 0]} justify="center">
          <Col>
            <AsnButton className="primary" onClick={onPublishSections}>
              Publish
            </AsnButton>
          </Col>
          <Col>
            <AsnButton onClick={handleCancel} className="default">
              Cancel
            </AsnButton>
          </Col>
        </Row>
      </AsnModal>
      <AsnModal
        footer={false}
        open={isSuccessPublishModal}
        title="Template was successfully published !"
        onCancel={handleSuccessModalCancel}
        width="50%"
      >
        <Row justify="center">
          <SuccessfulIcon />
        </Row>
      </AsnModal>
    </CourseSectionContainer>
  );
};

export default CourseSection;
