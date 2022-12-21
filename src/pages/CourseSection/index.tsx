import React, { useState } from 'react';
import styled from 'styled-components';
import LearningStatus from '../../components/CourseSection/LearningStatus';
import { Col, Row, Space } from 'antd';
import { AsnButton } from '../../components/Forms/Button';
import { AsnModal } from '../../components/Forms/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../helpers/constants';
import { ReactComponent as SuccessfulIcon } from '../../assets/icons/successful.svg';
import GetSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import useCreateNewSection from '../../api/Activity/Template/Sections/useCreateNewSection';

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
  const { id: templateId } = useParams();

  const { data, refetch } = GetSingleTemplate(
    templateId,
    {
      onSuccess: (data: { result: any, count: any }) =>
        console.log('>>>>>>>>>>>>>')
    }
  );

  const { mutate: createTemplateSection } = useCreateNewSection({
    onSuccess: (options: any) => {
      refetch();
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const onAddSection = (): void => {
    if (templateId != null) {
      createTemplateSection({ id: templateId });
    }
  };

  const handleCancel = (): void => {
    setIsSavedProjectModal(false);
  };
  const handleSuccessModalCancel = (): void => {
    setIsSuccessPublishModal(false);
  };

  const onPublishSections = (): void => {
    setIsSuccessPublishModal(true);
    setIsSavedProjectModal(false);
  };

  return (
    <CourseSectionContainer>
      <Space
        size={32}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          margin: '2rem 0px 2rem 6% ',
          width: '88%',
          fontSize: 'var(--headline-font-size)'
        }}
      >
        <span>Sections:</span>
        <span>
          Input course sections name and choose their learning statuses
        </span>
      </Space>
      <Space direction="vertical" size={32} style={{ width: '100%' }}>
        {data?.sections?.map((section: any) => (
          <LearningStatus
            key={section.id}
            section={section}
          />
        ))}
      </Space>
      {data?.courseStructure === 'MULTI_SECTION'
        ? (
        <AsnButton
          className="primary"
          onClick={onAddSection}
          style={{ width: '88%', marginTop: '2rem' }}
        >
         +Add Section
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
          onClick={() => navigate(`/${PATHS.ACTIVITYTEMPLATE}`)}
        >
          Cancel
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
