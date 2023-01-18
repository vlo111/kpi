import React from 'react';
import styled from 'styled-components';
import { Form, Space, Typography } from 'antd';
import EducationsWork from '../../components/FillApplicationForm/EducationsWork';
import OtherInformation from '../../components/FillApplicationForm/OtherInformation';
import PersonalDetails from '../../components/FillApplicationForm/PersonalDetails';
import { FormText } from '../../components/FillApplicationForm/style';
import TermsConditions from '../../components/FillApplicationForm/TermsConditions';
import { FormFinish } from '../../types/global';
import { AsnButton } from '../../components/Forms/Button';

const FillApplicationFormContainer = styled.div`
  padding: 3rem 3.75rem 3.75rem;
  width: 55%;
  background-color: var(--white);
  box-shadow: 0px 4px 30px rgba(113, 103, 246, 0.2);
  border-radius: 10px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled(Typography.Title)`
  font-size: var(--font-size-semilarge);
  color: var(--dark-border-ultramarine) !important;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FillApplicationForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish: FormFinish = (values) => {
    console.log(values);
  };

  return (
    <FillApplicationFormContainer>
      <FormTitle>Python course</FormTitle>
      <FormText>{'previewData.courseDescription'}</FormText>
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <PersonalDetails />
        <EducationsWork />
        <OtherInformation />
        <TermsConditions />
        <Space
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '3.5rem 0rem'
          }}
          size={60}
        >
          <AsnButton className='default' >Cancel</AsnButton>
            <AsnButton className="primary" htmlType="submit">Submit</AsnButton>
        </Space>
      </Form>
    </FillApplicationFormContainer>
  );
};

export default FillApplicationForm;
