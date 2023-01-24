import React, { useState } from 'react';
import { Col, Row, Select, Upload, UploadFile } from 'antd';
import { isEmpty } from 'lodash';

import MultiSections from './MultiSections';
import { AsnButton } from '../../../Forms/Button';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import AsnPicker from '../../../Picker';
import Duration from '../DurationForm';
import useFileUpload from '../../../../api/Activity/SubActivity/useUploadFile';
import { ReactComponent as UploadDocument } from '../SubActivityIcons/upload-docs.svg';
import { ReactComponent as ArrowSvg } from '../SubActivityIcons/arrow.svg';
import { CreateSubActivity } from './CreateModalStyles';
import { VALIDATE_MESSAGES } from '../../../../helpers/constants';
import { ICreateSubActivityProps } from '../../../../types/api/activity/subActivity';
import { IAttachmentSetting } from '../../../../types/project';
import useGetProjectDetails from '../../../../api/Details/useGetProjectDetails';
import { useAuth } from '../../../../hooks/useAuth';
import AsnAvatar from '../../../Forms/Avatar';
import { IUser } from '../../../../types/auth';

const SubActivityForm: React.FC<ICreateSubActivityProps> = ({
  openCreateSubActivity,
  setOpenCreateSubActivity,
  form,
  edit,
  onFinish,
  onFinishFailed,
  attachments,
  courseStructure,
  projectId
}) => {
  const [activeTab, setActiveTab] = useState<string>('0');

  const { mutate: UploadDoc } = useFileUpload();
  const { projectDetails } = useGetProjectDetails(projectId);
  const { user } = useAuth();

  const { firstName, lastName }: IUser = user;

  const { organizations, regions, sectors } = projectDetails;

  const { Option } = Select;
  const { Dragger } = Upload;
  const options = ['Offline', 'Online', 'Blended'];

  console.log(form.getFieldsValue(), 'values');
  return (
    <CreateSubActivity
      open={openCreateSubActivity}
      width={'614px'}
      title={(edit ?? false) ? 'Edit Sub-Activity' : 'Add Sub-Activity'}
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
                {(edit ?? false) ? 'Save' : 'Add' }
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

        {/* test into form list */}

        {/* <AsnForm.List name="sectionsData">
          {(fields) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key}>
                  {courseStructure === 'ONE_SECTION' && (
                    <AsnForm.Item
                      name={[field.name, 'title']}
                      label="Title"
                      rules={[{ required: true, min: 2, max: 45 }]}
                    >
                      <AsnInput />
                    </AsnForm.Item>
                  )}
                  <AsnForm.Item
                    name={[field.name, 'organization']}
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
                    name={[field.name, 'description']}
                    label="Description"
                    rules={[{ required: true, min: 2, max: 1048 }]}
                  >
                    <AsnInput />
                  </AsnForm.Item>
                  )}
                  <AsnForm.Item
                    name={[field.name, 'sector']}
                    label="Sector"
                    rules={[{ required: true }]}
                  >
                    <AsnSelect suffixIcon={<ArrowSvg />}>
                      {sectors?.map((sector: any, i: number) => (
                        <Option key={i} value={sector?.id}>
                          {sector?.title}
                        </Option>
                      ))}
                    </AsnSelect>
                  </AsnForm.Item>
                  <AsnForm.Item
                    name={[field.name, 'region']}
                    label="Region"
                    rules={[{ required: true }]}
                  >
                    <AsnSelect suffixIcon={<ArrowSvg />}>
                      {regions?.map((region: any, i: number) => (
                        <Option key={i} value={region?.id}>
                          {region?.title}
                        </Option>
                      ))}
                    </AsnSelect>
                  </AsnForm.Item>
                </div>
              ))}
            </>
          )}
        </AsnForm.List> */}

        {/* end test */}

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
            subActivity={{ sections: [{ id: 'aaaa' }, { id: 'bbb' }] }}
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
            <AsnForm.Item
              name="partner_organization"
              label="Partner organization"
              rules={[{ required: true, min: 2, max: 256 }]}
            >
              <AsnInput />
            </AsnForm.Item>
            <AsnForm.List name='sectionsData'>
              {(fields) => (
                <>
                  {fields.map((field, i) => (
                    <div key={i}>
                      {
                        attachments?.length > 0 && attachments?.map((item: IAttachmentSetting, j: number) => (
                          <AsnForm.Item
                            name={[field.name, `attachment_${j}`]}
                            label={item?.setting?.title}
                            className="upload_section"
                            key={item?.setting.id}
                            rules={[
                              {
                                validator: async (_, file) => {
                                  if (isEmpty(file) || file.file.status === 'removed' || file.file.status === 'error') {
                                    return await Promise.reject(new Error('Please enter valid Document'));
                                  }
                                }
                              }
                            ]}
                            validateTrigger={['onChange', 'onBlur']}
                          >
                            <Dragger
                              maxCount={1}
                              customRequest={(options: any) => {
                                const { file, onSuccess: successStatus, onError: errorStatus } = options;
                                UploadDoc({ file, type: 'COURSE_INFO' }, {
                                  onSuccess: (response: any) => {
                                    successStatus();
                                    const url = response.data.result[0];
                                    const files = form.getFieldValue(['sectionsData', 0, 'files']);
                                    const removeDoubleFiles = files.filter((file: { name: string }) => file.name !== `attachment_${j}`);
                                    form.setFieldValue(['sectionsData', 0, 'files'], [...removeDoubleFiles, { url, id: file.uid, name: `attachment_${j}`, keyName: item?.setting?.title }]);
                                  },
                                  onError: () => errorStatus()
                                });
                              }}
                              onRemove={(file: UploadFile) => {
                                const files = form.getFieldValue(['sectionsData', 0, 'files']);
                                const filteredFiles = files.filter((item: { id: string }) => item.id !== file.uid);
                                form.setFieldValue(['sectionsData', 0, 'files'], [...filteredFiles]);
                              }}
                              name={'uploadFile'}
                              accept={'.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'}
                            >
                              <UploadDocument />
                              <p>File/Documents</p>
                            </Dragger>
                          </AsnForm.Item>
                        ))
                      }
                    </div>
                  ))}
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
