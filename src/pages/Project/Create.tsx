import React, { useState } from 'react';
import { Col, notification, Row, Space, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Moment } from 'moment';

import { AsnForm } from '../../components/Forms/Form';
import {
  PlaceHolderDescription,
  VALIDATE_MESSAGES
} from '../../helpers/constants';
import { AsnInput, AsnTextArea } from '../../components/Forms/Input';
import { ConfirmModal } from '../../components/Forms/Modal/Confirm';
import { AsnDatePicker } from '../../components/Forms/DatePicker';
import useCreateProject from '../../api/Project/useCreateProject';
import { AsnButton } from '../../components/Forms/Button';
import { DisabledDate } from '../../types/project';
import { AsnAlert } from '../../components/Forms/Alert';

const { Title } = Typography;

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

export const CreateProject: React.FC = () => {
  const [error, setError] = useState<string>('');

  const { mutate: createProject, isLoading }: any = useCreateProject({
    onSuccess: ({ data }: any) => {
      notification.success({
        placement: 'top',
        message: 'The project saved successfully'
      });
      setOpenDeleteModal(!openDeleteModal);
    },
    onError: ({ response }: any) => {
      if (response.status === 409) {
        setError('A project with the same name already exists');
      } else {
        setError(response.data.message);
      }
      setOpenDeleteModal(false);
    }
  });

  const disabledDate: DisabledDate = (current: Moment, item) => {
    const startDate = form.getFieldsValue().startDate;
    const endDate = form.getFieldsValue().endDate;

    if (item === 'start') {
      return current > (endDate ?? current);
    } else {
      return current < (startDate ?? current);
    }
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [form] = AsnForm.useForm();

  const navigate = useNavigate();

  const onFinish: any = (values: any) => {
    createProject({
      ...values,
      startDate: new Date(values.startDate).toJSON(),
      endDate: new Date(values.endDate).toJSON()
    });
  };

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed');
  };

  const onRedirectToUser: () => void = () => {
    navigate('/teams');
  };

  const onSkipUser: () => void = () => {
    navigate('/project/overview/1');
  };

  return (
    <>
      <ProjectStyle>
        {(error?.length > 0) && <AsnAlert type="error" message={error} />}

        <Title level={4} className="title">
          To create a new project, please fill in the following information
        </Title>
        <AsnForm
          id="general-info-form"
          form={form}
          // fields={initFields}
          layout="vertical"
          validateMessages={VALIDATE_MESSAGES}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
              <PickerSpace size={24}>
                <Col span={24}>
                  <AsnForm.Item
                    name="startDate"
                    label="Start Date"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <AsnDatePicker
                      format="DD/MM/YYYY"
                      placeholder="10/22/21"
                      disabledDate={(current: Moment) =>
                        disabledDate(current, 'start')
                      }
                    />
                  </AsnForm.Item>
                </Col>
                <Col span={24}>
                  <AsnForm.Item
                    name="endDate"
                    label="End Date"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <AsnDatePicker
                      format="DD/MM/YYYY"
                      placeholder="10/22/26"
                      disabledDate={(current: Moment) =>
                        disabledDate(current, 'end')
                      }
                    />
                  </AsnForm.Item>
                </Col>
              </PickerSpace>
            </Row>
          </div>
          <Row justify={'space-evenly'} gutter={[0, 12]}>
            <Col>
              <AsnButton className="default">Cancel</AsnButton>
            </Col>
            <Col>
              <AsnButton className="primary" htmlType="submit" loading={isLoading}>
                Create
              </AsnButton>
            </Col>
          </Row>
          <ConfirmModal
            styles={{ gap: '3rem' }}
            yes="Add"
            no="Skip"
            open={openDeleteModal}
            title="Do you want to add users?"
            onSubmit={onRedirectToUser}
            onCancel={onSkipUser}
          />
        </AsnForm>
      </ProjectStyle>
    </>
  );
};
