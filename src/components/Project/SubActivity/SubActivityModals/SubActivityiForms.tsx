import React, { useState } from 'react';
import { Col, Row, Select, Upload, UploadFile } from 'antd';
// import { isEmpty } from 'lodash';

import MultiSections from './MultiSections';
import { AsnButton } from '../../../Forms/Button';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput, AsnInputNumber } from '../../../Forms/Input';
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
  projectId,
  sectionsCount
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

  // const getFile: any = (e: any) => {
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return (Boolean(e)) && e.fileList;
  // }

  console.log(
    form.getFieldsValue(),
    form
      .getFieldValue('sectionsData')
      ?.filter(
        (item: any, l: number) => l === 5
      )
      ?.map((item: any) => (item?.ATTACHMENT?.map((t: { name: string }) => ({
        name: t?.name,
        uid: 'aaa'
      })))),
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
                  {fields.map((field, i) => (
                    <div key={i}>
                      {attachments?.length > 0 &&
                        attachments?.map(
                          (item: IAttachmentSetting, j: number) =>
                            j === field.key && (
                              <div key={i}>
                                {item?.setting?.answerType === 'ATTACHMENT' && (
                                  <AsnForm.Item
                                    name={[field.name, 'ATTACHMENT']}
                                    label={item?.setting?.title}
                                    className="upload_section"
                                    // getValueFromEvent={getFile}
                                    key={item?.setting.id}
                                    // rules={[
                                    //   {
                                    //     validator: async (_, file) => {
                                    //       if (
                                    //         isEmpty(file) ||
                                    //         file.file.status === 'removed' ||
                                    //         file.file.status === 'error'
                                    //       ) {
                                    //         return await Promise.reject(
                                    //           new Error(
                                    //             'Please enter valid Document'
                                    //           )
                                    //         );
                                    //       }
                                    //     }
                                    //   }
                                    // ]}
                                    validateTrigger={['onChange', 'onBlur']}
                                  >
                                    <Dragger
                                      maxCount={1}
                                      customRequest={(options: any) => {
                                        const {
                                          file,
                                          onSuccess: successStatus,
                                          onError: errorStatus
                                        } = options;
                                        UploadDoc(
                                          { file, type: 'COURSE_INFO' },
                                          {
                                            onSuccess: (response: any) => {
                                              successStatus();
                                              const url =
                                                response.data.result[0];
                                              // const files = form.getFieldValue('sectionsData').filter((item: any, l: number) => l === j);
                                              // console.log(files.map((item: any) => item?.ATTACHMENT));

                                              // const removeDoubleFiles =
                                              //   files.filter(
                                              //     (file: { name: string }) =>
                                              //       file.name !==
                                              //       `attachment_${j}`
                                              //   );
                                              form.setFieldValue(
                                                [
                                                  'sectionsData',
                                                  j,
                                                  'ATTACHMENT'
                                                ],
                                                [
                                                  // ...removeDoubleFiles,
                                                  {
                                                    url,
                                                    id: file.uid,
                                                    name: url,
                                                    keyName:
                                                      item?.setting?.title
                                                  }
                                                ]
                                              );
                                            },
                                            onError: () => errorStatus()
                                          }
                                        );
                                      }}
                                      onRemove={(file: UploadFile) => {
                                        const files = form.getFieldValue([
                                          'sectionsData',
                                          j,
                                          'ATTACHMENT'
                                        ]);
                                        const filteredFiles = files.filter(
                                          (item: { id: string }) =>
                                            item.id !== file.uid
                                        );
                                        form.setFieldValue(
                                          ['sectionsData', j, 'ATTACHMENT'],
                                          [...filteredFiles]
                                        );
                                      }}
                                      // defaultFileList={form
                                      //   .getFieldValue('sectionsData')
                                      //   ?.filter(
                                      //     (item: any, l: number) => l === j
                                      //   )
                                      //   ?.map((item: any) => (item?.ATTACHMENT?.map((t: { name: string }) => ({
                                      //     name: t?.name,
                                      //     uid: 'aaa'
                                      //   }))))}
                                      name={'ATTACHMENT'}
                                      accept={
                                        '.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
                                      }
                                    >
                                      <UploadDocument />
                                      <p>File/Documents</p>
                                    </Dragger>
                                  </AsnForm.Item>
                                )}
                                {item?.setting?.answerType === 'SHORT_TEXT' && (
                                  <AsnForm.Item
                                    name={[field.name, 'SHORT_TEXT']}
                                    label={item?.setting?.title}
                                    key={item?.setting.id}
                                    rules={[{ required: item?.active }]}
                                  >
                                    <AsnInput />
                                  </AsnForm.Item>
                                )}
                                {item?.setting?.answerType === 'NUMBER' && (
                                  <AsnForm.Item
                                    name={[field.name, 'NUMBER']}
                                    label={item?.setting?.title}
                                    key={item?.setting.id}
                                    rules={[{ required: item?.active }]}
                                  >
                                    <AsnInputNumber
                                      className="primary"
                                      style={{ width: '100%' }}
                                    />
                                  </AsnForm.Item>
                                )}
                                {item?.setting?.answerType === 'DROPDOWN' && (
                                  <AsnForm.Item
                                    name={[field.name, 'DROPDOWN']}
                                    label={item?.setting?.title}
                                    key={item?.setting.id}
                                    rules={[{ required: item?.active }]}
                                  >
                                    <AsnSelect suffixIcon={<ArrowSvg />}>
                                      {item?.setting?.data?.map((i) => (
                                        <Option key={i} value={i}>
                                          {i}
                                        </Option>
                                      ))}
                                    </AsnSelect>
                                  </AsnForm.Item>
                                )}
                                {item?.setting?.title ===
                                  'Partner Organization' && (
                                  <AsnForm.Item
                                    name={[field.name, 'partner_organization']}
                                    label="Partner Organization"
                                    rules={[
                                      {
                                        required: item?.active,
                                        min: 2,
                                        max: 256
                                      }
                                    ]}
                                  >
                                    <AsnInput />
                                  </AsnForm.Item>
                                )}
                              </div>
                            )
                        )}
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
