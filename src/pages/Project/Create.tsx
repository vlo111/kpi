import React, { useState } from 'react';
import { AsnForm } from '../../components/Forms/Form';
import {
  PlaceHolderDescription,
  Rules,
  VALIDATE_MESSAGES
} from '../../helpers/constants';
import { AsnInput, AsnTextArea } from '../../components/Forms/Input';
import { AsnButton } from '../../components/Forms/Button';
import styled from 'styled-components';
import { ConfirmModal } from '../../components/Forms/Modal/Confirm';
import { useNavigate } from 'react-router-dom';
import { Date, DisabledDate } from '../../types/project';
import { v4 as uuidv4 } from 'uuid';
import { Col, Row, Space, Typography } from 'antd';
import { Moment } from 'moment';
import { AsnDatePicker } from '../../components/Forms/DatePicker';
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
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [startDate, setStartDate] = useState<Date>(null);
  const [endDate, setEndDate] = useState<Date>(null);

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
    setTitle(values.Title);
    setDescription(values.Description);

    setStartDate(values['Start Date']);
    setEndDate(values['End Date']);

    setOpenDeleteModal(!openDeleteModal);
  };

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed');
  };

  const initFields = [
    {
      name: ['Title'],
      value: title
    },
    {
      name: ['Description'],
      value: description
    },
    {
      name: ['Start Date'],
      value: startDate
    },
    {
      name: ['End Date'],
      value: endDate
    }
  ];

  const onRedirectToUser: () => void = () => {
    navigate('/teams');
  };

  const onSkipUser: () => void = () => {
    navigate(`/project/overview/${uuidv4()}`);
  };

  return (
    <>
      <ProjectStyle>
        <Title level={4} className="title">
          To create a new project, please fill in the following information
        </Title>
        <AsnForm
          id="general-info-form"
          form={form}
          fields={initFields}
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
                  <AsnForm.Item name="startDate" label="Start Date" {...Rules}>
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
                  <AsnForm.Item name="endDate" label="End Date" {...Rules}>
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
              <AsnButton>Cancel</AsnButton>
            </Col>
            <Col>
              <AsnButton type="primary" htmlType="submit">
                Create
              </AsnButton>
            </Col>
          </Row>
        </AsnForm>
      </ProjectStyle>
      <ConfirmModal
        styles={{ gap: '3rem' }}
        yes="Add"
        no="Skip"
        open={openDeleteModal}
        title="Do you want to add users?"
        onSubmit={onRedirectToUser}
        onCancel={onSkipUser}
      />
    </>
  );
};
