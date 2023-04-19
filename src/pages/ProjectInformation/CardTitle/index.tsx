import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

import { Void } from '../../../types/global';
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg';
import EditSubCourse from '../../../components/Project/SubActivity/SubActivityModals/Edit';
import { ICourseInfoCardTypes } from '../../../types/api/activity/subActivity';

const { Title } = Typography;
const AntTitle = styled(Title)`
  margin-bottom: 0 !important;
  &.ant-typography {
    font-weight: var(--font-normal);
    font-size: var(--headline-font-size);
    line-height: 25px;
    color: var(--dark-border-ultramarine);
  }
`;

const CardTitle: React.FC<ICourseInfoCardTypes> = ({
  title,
  id,
  refetch
}) => {
  const navigate = useNavigate();
  const [openCreateSubActivity, setOpenCreateSubActivity] =
    useState<boolean>(false);

  const { id: InputActivityId } = useParams();

  const handleEdit: Void = () => {
    if (title === 'General Info' && id != null) {
      navigate(`/project/${id}`);
    }
    if (title === 'Course General Info') {
      setOpenCreateSubActivity(true);
    }
    if (title === 'Objectives and Activities' && id != null) {
      navigate(`/project/${id}/steps/0`);
    }
    if (title === 'Project details' && id != null) {
      navigate(`/project/${id}/steps/1`);
    }
  };
  return (
    <Row align="bottom" gutter={[10, 0]} style={{ marginBottom: '32px' }}>
      <Col>
        <AntTitle level={3}>{title}</AntTitle>
      </Col>
      <Col>
        <EditSvg onClick={handleEdit} style={{ cursor: 'pointer' }} />
      </Col>
      {openCreateSubActivity &&
      <EditSubCourse
        projectId={id}
        refetch={refetch}
        setOpenCreateSubActivity={setOpenCreateSubActivity}
        openCreateSubActivity={openCreateSubActivity}
        InputActivityId={InputActivityId}
      />}
    </Row>
  );
};

export default CardTitle;
