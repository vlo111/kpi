import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import styled from 'styled-components';

import { Void } from '../../../types/global';
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg';
import CreateSubActivityModal from '../../../components/Project/SubActivity/SubActivityModals/CreateModal';

const { Title } = Typography;
const AntTitle = styled(Title)`
  margin-bottom: 0 !important;
&.ant-typography{
  font-weight: var(--font-normal);
  font-size: var(--headline-font-size);
  line-height: 25px;
  color: var(--dark-border-ultramarine);
}
`;

const CardTitle: React.FC<{ title: string, id: string | undefined }> = ({ title, id }) => {
  const navigate = useNavigate();
  const [openCreateSubActivity, setOpenCreateSubActivity] = useState<boolean>(false);

  const handleEdit: Void = () => {
    if (title === 'General Info' && id != null) {
      navigate(`/project/${id}`);
    }
    if (title === 'Course General Info') {
      setOpenCreateSubActivity(true);
    }
    if (title === 'Result areas and Activities' && id != null) {
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
      {(Boolean(openCreateSubActivity)) &&
        <CreateSubActivityModal
          openCreateSubActivity={openCreateSubActivity}
          setOpenCreateSubActivity={setOpenCreateSubActivity}
          templateId=''
          // inputActivityId={id}
        />
      }
    </Row>
  );
};

export default CardTitle;
