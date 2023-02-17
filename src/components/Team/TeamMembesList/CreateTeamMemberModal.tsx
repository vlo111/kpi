import React, { useState, useEffect } from 'react';
import {
  Cascader,
  Col,
  notification,
  Radio,
  RadioChangeEvent,
  Row
} from 'antd';

import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { VALIDATE_MESSAGES } from '../../../helpers/constants';
import { AsnButton } from '../../Forms/Button';
import { ShowDeleteUserModal } from '../../../types/teams';
import { FormFinish } from '../../../types/global';
import useInviteMemberByPermission from '../../../api/Teams/useInviteTeamMember';
import useUpdateMemberPermissionsId from '../../../api/Teams/useUpdateTeamMemberPermission';
import { useProject } from '../../../hooks/useProject';
import { AddTeamMemberModalWrapper } from '../Styles';
import { convertArrayToResult } from '../../../helpers/utils';

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
  const { projectId } = useProject();

  const { mutate: InviteTeamMember } = useInviteMemberByPermission({
    onSuccess: () => {
      form.resetFields();
      setShowModal('');
      notification.success({
        bottom: 50,
        placement: 'topRight',
        message: 'The User successfully Assigned',
        duration: 3
      });
    }
  });

  const { mutate: updatePermissionById } = useUpdateMemberPermissionsId({
    onSuccess: () => {
      form.resetFields();
      setShowModal('');
      notification.success({
        bottom: 50,
        placement: 'topRight',
        message: 'The User updated successfully',
        duration: 3
      });
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

  const onFinish: FormFinish = (values) => {
    const result = convertArrayToResult(filedValue);
    values.permissions = result;
    if (edit) {
      updatePermissionById({
        projectId,
        userId: userInfo?.updateUserId ?? '',
        data: {
          position: values.position,
          permissions: values.permissions,
          permissionType: values.permissionType
        }
      });
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
    if (edit && userPermissions !== undefined) {
      form.setFieldsValue({
        ...userInfo?.info,
        permissions: userPermissions.map((item) => {
          return [
            item.projectId,
            item.resultAreaId,
            item.inputActivityId,
            item.activityTemplateId
          ].filter(Boolean);
        })
      });
      setFiledValue(
        userPermissions.map((item) => {
          return [
            item.projectId,
            item.resultAreaId,
            item.inputActivityId,
            item.activityTemplateId
          ].filter(Boolean);
        })
      );
    }
  }, [edit, userPermissions, userInfo]);

  return (
    <AddTeamMemberModalWrapper
      open={true}
      title={!edit ? 'Add Person' : 'Edit Permission'}
      cancelText="Cancel"
      onCancel={handleCancel}
      footer={[
        <Row key={'action'} gutter={24} justify="center">
          <Col span={9}>
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
          <Col span={9}>
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
