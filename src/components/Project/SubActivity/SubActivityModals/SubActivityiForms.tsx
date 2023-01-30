import React from 'react';
import { Col, Row, Select } from 'antd';

import MultiSections from './MultiSections';
import { AsnButton } from '../../../Forms/Button';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import AsnPicker from '../../../Picker';
import Duration from '../DurationForm';
import useFileUpload from '../../../../api/Activity/SubActivity/useUploadFile';
import { ReactComponent as ArrowSvg } from '../SubActivityIcons/arrow.svg';
import { CreateSubActivity } from './CreateModalStyles';
import { VALIDATE_MESSAGES } from '../../../../helpers/constants';
import { ICreateSubActivityProps } from '../../../../types/api/activity/subActivity';
import useGetProjectDetails from '../../../../api/Details/useGetProjectDetails';
import { useAuth } from '../../../../hooks/useAuth';
import AsnAvatar from '../../../Forms/Avatar';
import { IUser } from '../../../../types/auth';
import CustomInputs from './CustomInputsList';

const SubActivityForm: React.FC<ICreateSubActivityProps> = ({
  openCreateSubActivity,
  setOpenCreateSubActivity,
  form,
  edit,
  onFinish,
  onFinishFailed,
  attachments,
  courseStructure,
  projectId,
  sectionsCount,
  setActiveTab,
  activeTab
}) => {
  const { mutate: UploadDoc } = useFileUpload();
  const { projectDetails } = useGetProjectDetails(projectId);
  const { user } = useAuth();

  const { firstName, lastName }: IUser = user;

  const { organizations, regions, sectors } = projectDetails;

  const { Option } = Select;
  const options = ['Offline', 'Online', 'Blended'];

  console.log(
    form.getFieldsValue(),
    'getFieldsValuegetFieldsValuegetFieldsValuegetFieldsValue'
  );

  return (
    <CreateSubActivity
      open={openCreateSubActivity}
      width={'614px'}
      title={edit ?? false ? 'Edit Sub-Activity' : 'Add Sub-Activity'}
      onCancel={() => setOpenCreateSubActivity(false)}
      footer={[
        <Row key={'action'} gutter={14} justify="center">
          <Col span={7}>
            <Row justify="start">
              <AsnButton
                className="default"
                key="back"
                onClick={() => setOpenCreateSubActivity(false)}
              >
                Cancel
              </AsnButton>
            </Row>
          </Col>
          <Col span={7}>
            <Row justify="end">
              <AsnButton
                form="SubActivityForm"
                key="submit"
                type="primary"
                className="primary"
                htmlType="submit"
              >
                {edit ?? false ? 'Save' : 'Add'}
              </AsnButton>
            </Row>
          </Col>
        </Row>
      ]}
    >
      <AsnForm
        form={form}
        layout="vertical"
        name="SubActivityForm"
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {courseStructure === 'ONE_SECTION' && (
          <AsnForm.Item
            name="title"
            label="Title"
            rules={[{ required: true, min: 2, max: 45 }]}
          >
            <AsnInput />
          </AsnForm.Item>
        )}
        <AsnForm.Item
          name="organization"
          label="Organization"
          rules={[{ required: true }]}
        >
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {organizations?.map((organization: any, i: number) => (
              <Option key={i} value={organization?.id}>
                {organization?.title}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        {courseStructure === 'ONE_SECTION' && (
          <AsnForm.Item
            name="description"
            label="Description"
            rules={[{ required: true, min: 2, max: 1048 }]}
          >
            <AsnInput />
          </AsnForm.Item>
        )}
        <AsnForm.Item
          name="sub_activity_manager"
          label="Sub-Activity Manager"
          rules={[{ required: false }]}
        >
          <Row justify="start" align="middle" style={{ padding: '4px 11px' }}>
            <Col>
              <AsnAvatar
                letter={`${firstName?.charAt(0)}${lastName?.charAt(0)}`}
              />
            </Col>
            <Col style={{ marginLeft: '8px' }}>
              {firstName} {lastName}
            </Col>
          </Row>
        </AsnForm.Item>
        <AsnForm.Item name="sector" label="Sector" rules={[{ required: true }]}>
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {sectors?.map((sector: any, i: number) => (
              <Option key={i} value={sector?.id}>
                {sector?.title}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        <AsnForm.Item name="region" label="Region" rules={[{ required: true }]}>
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {regions?.map((region: any, i: number) => (
              <Option key={i} value={region?.id}>
                {region?.title}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        {courseStructure === 'MULTI_SECTION' && (
          <MultiSections
            sectionsCount={sectionsCount}
            attachments={attachments}
            UploadDoc={UploadDoc}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        )}
        {courseStructure === 'ONE_SECTION' && (
          <>
            <AsnPicker />
            <AsnForm.Item
              name="teaching_mode"
              label="Teaching Mode"
              rules={[{ required: true }]}
            >
              <AsnSelect
                suffixIcon={<ArrowSvg />}
                popupClassName="customPopupSelect"
              >
                {options.map((i) => (
                  <Option key={i} value={i}>
                    {i}
                  </Option>
                ))}
              </AsnSelect>
            </AsnForm.Item>
            <Duration />
            <AsnForm.List name="sectionsData">
              {(fields) => (
                <>
                  {fields.map(
                    (field) =>
                      field.key === 0 && (
                        <div key={0}>
                          <CustomInputs
                            name={[0, 'customInputs']}
                            attachments={attachments}
                            UploadDoc={UploadDoc}
                          />
                        </div>
                      )
                  )}
                </>
              )}
            </AsnForm.List>
          </>
        )}
      </AsnForm>
    </CreateSubActivity>
  );
};

export default SubActivityForm;
