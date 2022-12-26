import React, { useState } from 'react';
import { Row, Space, Typography } from 'antd';

import { AsnButton } from '../../../../../Forms/Button';
import DraggerForm from '../Dragger';
import ApplicantList from './ApplicantList';
import FormWrapper from '../../../SubActivityWrapper';
import SubActivityFooter from '../../../SubActivityWrapper/Footer';

const ApplicantsForm: React.FC<any> = ({ id, setActiveKey }) => {
  const { Title } = Typography;
  const [Published, setPublished] = useState(false);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="applicant_form">
        <Row justify="center" style={{ marginBottom: '3.2vh' }}>
          <Title level={5}>Application form</Title>
        </Row>
        {!Published
          ? (
          <>
            <Row justify="center" style={{ width: '100%' }}>
              <AsnButton
                className="primary"
                type="primary"
                onClick={() => setPublished(true)}
              >
                Publish Application form
              </AsnButton>
            </Row>
            <Row
              justify="center"
              style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
            >
              <Title level={5}>Or</Title>
            </Row>
            <DraggerForm text="Attach related document" padding="0 6.1vw" />
          </>
            )
          : (
          <ApplicantList />
            )}
      </FormWrapper>
      <SubActivityFooter cancel={setActiveKey} />
    </Space>
  );
};

export default ApplicantsForm;
