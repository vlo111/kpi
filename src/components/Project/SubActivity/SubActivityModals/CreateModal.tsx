import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Row, Select, Upload, message, UploadFile } from 'antd';
import moment from 'moment';
import { isEmpty } from 'lodash';

import MultiSections from './MultiSections';
import { AsnButton } from '../../../Forms/Button';
import AsnSpin from '../../../Forms/Spin';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import AsnAvatar from '../../../Forms/Avatar';
import AsnPicker from '../../../Picker';
import Duration from '../DurationForm';
import useGetProjectDetails from '../../../../api/Details/useGetProjectDetails';
import getSingleTemplate from '../../../../api/Activity/Template/useGetSingleActivityTemplate';
import useCreateSubActivity from '../../../../api/Activity/SubActivity/useCreateSubActivity';
import useFileUpload from '../../../../api/Activity/SubActivity/useUploadFile';
import { useAuth } from '../../../../hooks/useAuth';
import { CreateSubActivity } from './CreateModalStyles';
import { VALIDATE_MESSAGES, PATHS } from '../../../../helpers/constants';
import { FormFinish } from '../../../../types/global';
import { IUser } from '../../../../types/auth';
import { IAttachmentSetting } from '../../../../types/project';
import { ReactComponent as ArrowSvg } from '../SubActivityIcons/arrow.svg';
import { ReactComponent as UploadDocument } from '../SubActivityIcons/upload-docs.svg';
import { ICourseSettingMap, ICreateSubActivityProps } from '../../../../types/api/activity/subActivity';

const CreateSubActivityModal: React.FC<ICreateSubActivityProps> = ({ templateId, openCreateSubActivity, setOpenCreateSubActivity }) => {
  const [activeTab, setActiveTab] = useState<string>('0');
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { projectDetails } = useGetProjectDetails(id);
  const { data: subActivity, isLoading } = getSingleTemplate(templateId, { enabled: Boolean(templateId) });
  const { mutate: UploadDoc } = useFileUpload();
  const { mutate: createSubActivity } = useCreateSubActivity({
    onSuccess: (response: any) => navigate(`/project/${PATHS.SUBACTIVITY.replace(':id', response?.data?.id)}`)
  });
  const { organizations, regions, sectors } = projectDetails;
  const { firstName, lastName, id: userId }: IUser = user;

  const { Option } = Select;
  const { Dragger } = Upload;
  const options = ['Active', 'Online', 'Blended'];
  const attachments = subActivity?.courseSettingMap?.filter((item: ICourseSettingMap) => item.setting.type === 'CUSTOM' && item.setting.answerType === 'ATTACHMENT');

  const onFinish: FormFinish = (values) => {
    if (subActivity?.courseStructure === 'MULTI_SECTION') {
      const checkFields = values.sectionsData.map((section: any, i: number) => {
        return {
          requiredFields: Object.values(section).length,
          sectionField: `${i}`
        };
      });
      const requiredFieldsCount = Math.max(...checkFields.map((field: { requiredFields: number }) => field.requiredFields));
      const notCompletedField = checkFields.filter((field: { requiredFields: number }) => field.requiredFields < requiredFieldsCount);
      if (notCompletedField.length > 0) {
        setActiveTab(notCompletedField[0].sectionField);
        void message.error('Please fill all Sections data', 2);
      } else {
        console.log(values);
        const requestBody = {
          activityTemplateId: templateId,
          organizationId: values?.organization,
          managerId: userId,
          sectorId: values?.sector,
          regionId: values?.region,
          sectionsData: subActivity?.sections?.map((section: { id: string }, i: number) => {
            return {
              sectionId: section?.id,
              title: values.sectionsData[i].title,
              description: values.sectionsData[i].description,
              teachingMode: values.sectionsData[i].teaching_mode,
              startDate: moment(values.sectionsData[i].startDate).format(),
              endDate: moment(values.sectionsData[i].endDate).format(),
              files: values.sectionsData[i].files.map((file: { url: string, keyName: string }) => ({ file: file.url, keyname: file.keyName }))
            };
          })
        };
        createSubActivity(requestBody);
      }
    }
    if (subActivity?.courseStructure === 'ONE_SECTION') {
      const requestBody = {
        activityTemplateId: templateId,
        organizationId: values?.organization,
        managerId: userId,
        sectorId: values?.sector,
        regionId: values?.region,
        sectionsData: subActivity?.sections.map((section: { id: string }, i: number) => {
          return {
            sectionId: section?.id,
            title: values.title,
            description: values.description,
            teachingMode: values.teaching_mode,
            startDate: moment(values.startDate).format(),
            endDate: moment(values.endDate).format(),
            files: values.sectionsData[i].files.map((file: { url: string, keyName: string }) => ({ file: file.url, keyname: file.keyName }))
          };
        })
      };
      createSubActivity(requestBody);
    }
  };

  const onFinishFailed: FormFinish = (values) => {
    if (subActivity?.courseStructure === 'MULTI_SECTION') {
      const { errorFields } = values;
      const notCompletedField = errorFields[0].name;
      void message.error('Please fill all Sections data', 2);
      setActiveTab(notCompletedField[1].toString());
    }
  };
  const initialValues = {
    duration_technical_number: 18,
    duration_soft_number: 18,
    duration: 36,
    sectionsData: Array(subActivity?.sections?.length).fill({ files: [] })
  };

  if (isLoading === true) {
    return <AsnSpin />;
  }

  return (
    <CreateSubActivity
      open={openCreateSubActivity}
      width={'614px'}
      title="Add Sub-Activity"
      onCancel={() => setOpenCreateSubActivity(false)}
      footer={[
        <Row key={'action'} gutter={14} justify="center">
          <Col span={7}>
            <Row justify="start">
              <AsnButton className="default" key="back" onClick={() => setOpenCreateSubActivity(false)}>
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
        name="SubActivityForm"
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
        initialValues={initialValues}
        onFinishFailed={onFinishFailed}
      >
        {subActivity?.courseStructure === 'ONE_SECTION' &&
          <AsnForm.Item
            name="title"
            label="Title"
            rules={[{ required: true, min: 2, max: 45 }]}
          >
            <AsnInput />
          </AsnForm.Item>}
        <AsnForm.Item
          name="organization"
          label="Organization"
          rules={[{ required: true }]}
        >
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {organizations?.map((organization, i) => (
              <Option key={i} value={organization?.id}>
                {organization?.title}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        {subActivity?.courseStructure === 'ONE_SECTION' &&
          <AsnForm.Item
            name="description"
            label="Description"
            rules={[{ required: true, min: 2, max: 1048 }]}
          >
            <AsnInput />
          </AsnForm.Item>}
        <AsnForm.Item
          name="sub_activity_manager"
          label="Sub-Activity Manager"
          rules={[{ required: false }]}
        >
          <Row justify="start" align="middle" style={{ padding: '4px 11px' }}>
            <Col>
              <AsnAvatar letter={`${firstName?.charAt(0)}${lastName?.charAt(0)}`} />
            </Col>
            <Col style={{ marginLeft: '8px' }}>{firstName} {lastName}</Col>
          </Row>
        </AsnForm.Item>
        <AsnForm.Item name="sector" label="Sector" rules={[{ required: true }]}>
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {sectors?.map((sector, i) => (
              <Option key={i} value={sector?.id}>
                {sector?.title}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        <AsnForm.Item name="region" label="Region" rules={[{ required: true }]}>
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {regions?.map((region, i) => (
              <Option key={i} value={region?.id}>
                {region?.title}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        {subActivity?.courseStructure === 'MULTI_SECTION' &&
          <MultiSections
            subActivity={subActivity}
            attachments={attachments}
            UploadDoc={UploadDoc}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        }
        {subActivity?.courseStructure === 'ONE_SECTION' &&
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
                                UploadDoc({ file, type: 'OTHER_DOCUMENT' }, {
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
          </>}
      </AsnForm>
    </CreateSubActivity>
  );
};

export default CreateSubActivityModal;
