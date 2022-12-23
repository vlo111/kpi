import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Col, Row, Space, Typography } from 'antd';

import { VALIDATE_MESSAGES } from '../../helpers/constants';
import { AsnInput, AsnTextArea } from '../../components/Forms/Input';
import { AsnButton } from '../../components/Forms/Button';
import { AsnAlert } from '../../components/Forms/Alert';
import { AsnForm } from '../../components/Forms/Form';
import AsnPicker from '../../components/Picker';

const { Title } = Typography;

const PlaceHolderDescription =
  'Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills';

export const ProjectStyle = styled.div`
  width: clamp(16rem, 41.7vw, 60rem);
  margin: 4vw auto 0;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  gap: 2vw;

  form {
    box-shadow: var(--base-box-shadow);
    background: var(--white);
    padding: 32px;
    border-radius: 20px;
  }

  .title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
    font-weight: var(--font-normal);
  }

  .main {
    margin-bottom: 7%;

    .ant-form-item {
      margin-bottom: 1rem;
    }

    .ant-form-item-label {
      padding: 0;
    }
  }

  button {
    border-radius: 10px !important;
  }

  textarea {
    height: 10rem;
    resize: none;
  }
`;

export const PickerSpace = styled(Space)`
  width: 100%;

  > div {
    font-size: var(--headline-font-size);
  }

  .ant-picker,
  .ant-space-item {
    width: 100%;
  }

  .ant-picker-input > input {
    height: 30px;
    font-size: var(--base-font-size);
  }
`;

export const FormProject: React.FC<{
  form: any
  onFinish: any
  isLoading: any
  error: any
}> = ({ form, onFinish, isLoading, error }) => {
  const { id } = useParams();

  return (
    <ProjectStyle>
      {error?.length > 0 && <AsnAlert type="error" message={error} />}

      <Title level={4} className="title">
        To create a new project, please fill in the following information
      </Title>

      <AsnForm
        id="general-info-form"
        form={form}
        layout="vertical"
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
      >
        <div className="main">
          <Row>
            <Col span={24}>
              <AsnForm.Item
                label="Title"
                name="title"
                rules={[{ required: true, min: 2, max: 256 }]}
              >
                <AsnInput placeholder="Example: AWDA" />
              </AsnForm.Item>
            </Col>
            <Col span={24}>
              <AsnForm.Item
                label="Description"
                name="description"
                rules={[{ required: true, min: 1, max: 2048 }]}
              >
                <AsnTextArea placeholder={PlaceHolderDescription} />
              </AsnForm.Item>
            </Col>
            <AsnPicker />
          </Row>
        </div>
        <Row justify={'space-evenly'} gutter={[0, 12]}>
          <Col>
            <AsnButton className="default">Cancel</AsnButton>
          </Col>
          <Col>
            <AsnButton
              className="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {id === undefined ? 'Create' : 'Update'}
            </AsnButton>
          </Col>
        </Row>
      </AsnForm>
    </ProjectStyle>
  );
};
