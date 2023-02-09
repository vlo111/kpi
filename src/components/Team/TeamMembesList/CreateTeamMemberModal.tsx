import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Cascader, Col, Radio, RadioChangeEvent, Row } from 'antd';

import { AsnModal } from '../../Forms/Modal';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { VALIDATE_MESSAGES } from '../../../helpers/constants';
import { AsnButton } from '../../Forms/Button';
import { CascadedData, ShowDeleteUserModal } from '../../../types/teams';
import { FormFinish } from '../../../types/global';
import useInviteMemberByPermission from '../../../api/Teams/useInviteTeamMember';

const AddTeamMemberModalWrapper = styled(AsnModal)`
  width: 600px !important;
  padding: 4.3vh 1.3vw 4.5vh 4.3vh !important;
  background: var(--white);
  border-radius: 20px;
  top: 40px !important;

  .ant-modal-body {
    max-height: 62.5vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 1.8vw;
  }
  .ant-modal-close {
    top: -25px;
    right: -14px;
  }
  .ant-modal-content {
    box-shadow: none !important;
    position: inherit !important;
    padding: 0;
  }
  .ant-modal-title {
    font-size: var(--headline-font-size);
  }
  .ant-select,
  .ant-cascader {
    width: 100%;
    font-size: var(--base-font-size);
    background: var(--white);
    border: 1px solid var(--dark-border-ultramarine);
    border-radius: 5px;

    .ant-select-selector {
      position: inherit !important;
      background: none !important;
      height: 100% !important;
      border: none !important;
      padding: 6px 11px !important;
    }

    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }

    .ant-select-arrow {
      display: none !important;
    }
  }
  .anticon[tabindex] {
    position: absolute;
    top: 42px;
    right: -17px;
  }

  .ant-row {
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 1.6vh !important;
  }
  .ant-select-multiple .ant-select-selection-item {
    background: var(--primary-light-1);
    border: 1px solid var(--primary-light-1);
    padding: 15px 6px;
    border-radius: 6px;
  }
  .ant-modal-header {
    padding-bottom: 3vh;
  }
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }
  .ant-radio-inner {
    width: 20px;
    height: 20px;

    ::after {
      transform: scale(0.7);
      background-color: var(--dark-border-ultramarine);
    }
  }
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const AddTeamMemberModal: React.FC<ShowDeleteUserModal> = ({
  setShowModal,
  permissionsList,
  userPermissions,
  edit,
  userInfo
}) => {
  const [form] = AsnForm.useForm();
  const [value, setValue] = useState('');
  const [filedValue, setFiledValue] = useState<string[][]>([[]]);

  const { mutate: InviteTeamMember } = useInviteMemberByPermission({
    onSuccess: () => {
      form.resetFields();
      setShowModal('');
    }
  });

  const onChange: any = (value: string[][]) => {
    setFiledValue(value);
  };

  const cascadedListIOptions = {
    value: permissionsList.id,
    label: permissionsList.title,
    children: permissionsList.resultAreas.map((resultArea) => ({
      value: resultArea.id,
      label: resultArea.title,
      children: resultArea.activities.map((activity) => ({
        value: activity.id,
        label: activity.title,
        children: activity.templates.map((template) => ({
          value: template.id,
          label: template.title
        }))
      }))
    }))
  };

  const defaultValue = [
    [
      'fdcbb18d-209b-4068-83bb-c31a102eb218',
      '81cc1756-5ed1-4f3d-9251-271f2c2affa6',
      '8788fa4c-54a6-4a3c-9f78-9235d608b269'
    ],
    [
      'fdcbb18d-209b-4068-83bb-c31a102eb218',
      '81cc1756-5ed1-4f3d-9251-271f2c2affa6',
      '2f48c159-763d-436d-a48f-aa8f97448609'
    ],
    [
      'fdcbb18d-209b-4068-83bb-c31a102eb218',
      '81cc1756-5ed1-4f3d-9251-271f2c2affa6',
      'dbe0bce2-47c3-422c-b7fb-048493891fdd'
    ]
  ];

  const onFinish: FormFinish = (values) => {
    const result: CascadedData = {
      id: filedValue[0][0],
      resultAreas: []
    };
    filedValue.forEach((item) => {
      const resultAreaIdIndex = 1;
      const id = item[resultAreaIdIndex];
      const existingResultArea = result.resultAreas.find((ra) => ra.id === id);
      if (existingResultArea != null) {
        existingResultArea.activities.push({
          id: item[resultAreaIdIndex + 1],
          templates:
            item.length > 2
              ? [
                  {
                    id: item[resultAreaIdIndex + 2]
                  }
                ]
              : undefined
        });
      } else {
        result.resultAreas.push({
          id,
          activities: [
            {
              id: item[resultAreaIdIndex + 1],
              templates:
                item.length > 2
                  ? [
                      {
                        id: item[resultAreaIdIndex + 2]
                      }
                    ]
                  : undefined
            }
          ]
        });
      }
    });
    values.permissions = result;
    if (edit) {
      console.log('edit');
    } else {
      InviteTeamMember(values);
    }
  };

  const onChangePermission: (e: RadioChangeEvent) => void = (
    e: RadioChangeEvent
  ) => {
    setValue(e.target.value);
  };

  const handleCancel = (): void => {
    form.resetFields();
    setShowModal('');
  };

  useEffect(() => {
    if (edit) {
      form.setFieldsValue({
        ...userInfo,
        permissions: defaultValue
      });
    }
  }, []);

  return (
    <AddTeamMemberModalWrapper
      open={true}
      title={!edit ? 'Add Person' : 'Edit Permission'}
      cancelText="Cancel"
      onCancel={handleCancel}
      footer={[
        <Row key={'action'} gutter={14} justify="center">
          <Col span={7}>
            <Row justify="start">
              <AsnButton
                key="back"
                className="default"
                onClick={handleCancel}
                style={{ width: '133px' }}
              >
                Cancel
              </AsnButton>
            </Row>
          </Col>
          <Col span={7}>
            <Row justify="end">
              <AsnButton
                form="managerForm"
                className="primary"
                key="submit"
                type="primary"
                htmlType="submit"
                style={{ width: '133px' }}
              >
                {!edit ? 'Add' : 'Edit'}
              </AsnButton>
            </Row>
          </Col>
        </Row>
      ]}
    >
      <AsnForm
        form={form}
        layout="vertical"
        name="managerForm"
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
      >
        <AsnForm.Item
          name="email"
          label="Email"
          rules={[{ required: !edit }, { type: 'email' }]}
        >
          <AsnInput disabled={edit} />
        </AsnForm.Item>
        <AsnForm.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: !edit,
              min: 2,
              max: 256
            }
          ]}
        >
          <AsnInput disabled={edit} />
        </AsnForm.Item>
        <AsnForm.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: !edit,
              min: 2,
              max: 256
            }
          ]}
        >
          <AsnInput disabled={edit} />
        </AsnForm.Item>
        <AsnForm.Item name="position" label="Position">
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          style={{ width: '100%' }}
          name="permissions"
          label="Assign to"
          rules={[{ required: true }]}
        >
          <Cascader
            value={filedValue}
            popupClassName="customCascaderPopup"
            options={[cascadedListIOptions]}
            onChange={onChange}
            displayRender={(label) => label.join(' >  ')}
            multiple
            allowClear
            bordered={false}
            changeOnSelect
          />
        </AsnForm.Item>
        <AsnForm.Item name="permissionType" initialValue={'VIEW'}>
          <Radio.Group value={value}>
            <Radio value={'VIEW'} onChange={onChangePermission}>
              View
            </Radio>
            <Radio value={'EDIT'} onChange={onChangePermission}>
              Edit
            </Radio>
          </Radio.Group>
        </AsnForm.Item>
      </AsnForm>
    </AddTeamMemberModalWrapper>
  );
};

export default AddTeamMemberModal;
