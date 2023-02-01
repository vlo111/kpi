import React, { useState } from 'react';
import styled from 'styled-components';
import { Cascader, Col, Radio, RadioChangeEvent, Row } from 'antd';

import { AsnModal } from '../../Forms/Modal';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { VALIDATE_MESSAGES } from '../../../helpers/constants';
import { AsnButton } from '../../Forms/Button';
import { ShowDeleteUserModal } from '../../../types/teams';
import { UsersPermissionsRule } from '../../../helpers/utils';
import { FormFinish } from '../../../types/global';

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

const AddTeamMemberModal: React.FC<ShowDeleteUserModal> = ({ setShowModal }) => {
  const [form] = AsnForm.useForm();
  const [value, setValue] = useState(1);

  const [filedValue, setFiledValue] = useState<string[] | undefined>(undefined);

  const [defaultVal] = useState(UsersPermissionsRule);

  const onChange: any = (value: string[], selectOptions: any) => {
    //   (obj[item.id]) ? obj[item.id].resultAreas.push(...item.resultAreas) : (obj[item.id] = { ...item });
    //   return obj;
    // }, {});
    console.log(selectOptions, 'selectOptionsselectOptionsselectOptions');

    setFiledValue(value);
  };

  const onFinish: FormFinish = (values) => {
    console.log(values, 'valuesss');
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

  return (
    <AddTeamMemberModalWrapper
      open={true}
      title={'Add Person'}
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
                Add
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
          rules={[{ required: true }, { type: 'email' }]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              min: 2,
              max: 256
            }
          ]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              min: 2,
              max: 256
            }
          ]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item name="position" label="Position">
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          style={{ width: '100%' }}
          name="AssignTo"
          label="Assign to"
          rules={[{ required: true }]}
        >
          <Cascader
            value={filedValue}
            popupClassName="customCascaderPopup"
            options={defaultVal}
            onChange={onChange}
            displayRender={(label) => label.join(' >  ')}
            loadData={(selectOptions) => {
              console.log(selectOptions);
            }}
            multiple
            allowClear
            bordered={false}
            changeOnSelect
          />
        </AsnForm.Item>
        <AsnForm.Item name="Radio" initialValue={1}>
          <Radio.Group value={value}>
            <Radio value={1} onChange={onChangePermission}>
              View
            </Radio>
            <Radio value={2} onChange={onChangePermission}>
              Edit
            </Radio>
          </Radio.Group>
        </AsnForm.Item>
      </AsnForm>
    </AddTeamMemberModalWrapper>
  );
};

export default AddTeamMemberModal;
