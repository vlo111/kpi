import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Select, Upload, Tabs } from 'antd';
import moment from 'moment';

import { AsnButton } from '../../../Forms/Button';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import useGetProjectDetails from '../../../../api/Details/useGetProjectDetails';
import getSingleTemplate from '../../../../api/Activity/Template/useGetSingleActivityTemplate';
import { useAuth } from '../../../../hooks/useAuth';
import useCreateSubActivity from '../../../../api/Activity/SubActivity/useCreateSubActivity';
import useFileUpload from '../../../../api/Activity/SubActivity/useUploadFile';
import { ReactComponent as ArrowSvg } from '../../../../assets/icons/arrow.svg';
import { ReactComponent as UploadDocument } from '../../../../assets/icons/upload-docs.svg';
import Duration from '../DurationForm';
import { CreateSubActivity } from './CreateModalStyles';
import { VALIDATE_MESSAGES } from '../../../../helpers/constants';
import AsnPicker from '../../../Picker';
import AsnAvatar from '../../../Forms/Avatar';
import { FormFinish } from '../../../../types/global';
import { IUser, IUploadProps } from '../../../../types/auth';
import { IAttachmentSetting } from '../../../../types/project';
import { ICreateSubActivityProps } from '../../../../types/subActivity';

const CreateSubActivityModal: React.FC<ICreateSubActivityProps> = ({ templateId, openCreateSubActivity, setOpenCreateSubActivity }) => {
  const [files, setFiles] = useState<any>({});
  const [sectionName, setSectionName] = useState<any>('section 1');
  const [fileId, setFileId] = useState<string>('');
  const [file, setFile] = useState<object>({});
  const [form] = AsnForm.useForm();
  const { id } = useParams();
  const { projectDetails } = useGetProjectDetails(id);
  const { data: subActivity } = getSingleTemplate(templateId, { enabled: Boolean(templateId) });
  console.log(subActivity, 'subb');
  const { organizations, regions, sectors } = projectDetails;
  const { user } = useAuth();
  const { firstName, lastName, id: userId }: IUser = user;
  const { mutate: UploadDoc } = useFileUpload({
    onSuccess: (options: any) => {
      const {
        data: { result }
      } = options;
      setFiles({
        ...files,
        [sectionName]: files[sectionName] !== undefined ? [...files[sectionName], { id: fileId, url: result[0] }] : [{ id: fileId, url: result[0] }]
      });
    }
  });
  const { mutate: createSubActivity } = useCreateSubActivity();
  const initialValues = {
    duration_technical_number: 18,
    duration_soft_number: 18,
    duration: 36
  };
  const { Option } = Select;
  const { Dragger } = Upload;
  const options = ['Active', 'Online', 'Blended'];

  const onFinish: FormFinish = (values) => {
    console.log(values, 'values');
    const requestBody = {
      activityTemplateId: templateId,
      organizationId: values?.organization,
      managerId: userId,
      sectorId: values?.sector,
      regionId: values?.region,
      sectionsData: subActivity?.sections?.map((section: any, i: number) => {
        return {
          sectionId: section?.id,
          title: values[`section ${i + 1}`],
          description: values[`description ${i + 1}`],
          teachingMode: values[`teaching_mode ${i + 1}`],
          startDate: moment(values[`startDate ${i + 1}`]).format(),
          endDate: moment(values[`endDate ${i + 1}`]).format(),
          files: files[`section ${i + 1}`]?.map((file: any) => file.url)
        };
      })
    };
    createSubActivity(requestBody);
  };
  const attachments = subActivity?.courseSettingMap?.filter((item: any) => item.setting.type === 'CUSTOM' && item.setting.answerType === 'ATTACHMENT');

  const props: any = {
    customRequest: (options: { file: any }) => {
      const { file } = options;
      setFileId(file?.uid);
      setFile(file);
    },
    name: 'uploadFile',
    onRemove: (file: any) => setFiles({ ...files, [sectionName]: files[sectionName]?.filter((item: any) => item.id !== file?.uid) })
  };
  console.log(files);
  console.log(fileId, 'iddd');
  useEffect(() => {
    if (fileId !== '') {
      UploadDoc(file);
    }
  }, [fileId, file]);
  const items = subActivity?.sections?.map((section: { id: string }, i: number) => {
    return {
      label: <Row onClick={() => setSectionName(`section ${i + 1}`)}>{i + 1} Section</Row>,
      key: `${section?.id}`,
      children: <>
        <AsnForm.Item
          name={`section ${i + 1}`}
          label="Title"
          rules={[{ required: true, min: 2, max: 45 }]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          name={`description ${i + 1}`}
          label="Description"
          rules={[{ required: true, min: 2, max: 1048 }]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnPicker startDate={`startDate ${i + 1}`} endDate={`endDate ${i + 1}`} />
        <AsnForm.Item
          name={`teaching_mode ${i + 1}`}
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
          name={`partner_organization ${i + 1}`}
          label="Partner organization"
          rules={[{ required: true, min: 2, max: 256 }]}
        >
          <AsnInput />
        </AsnForm.Item>
        {attachments?.length > 0 && attachments?.map((item: IAttachmentSetting) => (
          <AsnForm.Item
            key={item?.setting?.id}
            name={`attachment ${i + 1}`}
            label={item?.setting?.title}
            className="upload_section"
            rules={[{ required: true }]}
          >
            <Dragger
              {...props}
            >
              <UploadDocument />
              <p>File/Documents</p>
            </Dragger>
          </AsnForm.Item>
        ))}
      </>
    };
  });
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
                {/* { false ? 'Edit' : 'Add'} */}
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
          <Tabs
            type="card"
            items={items}
            defaultActiveKey='1'
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
            {
              attachments?.length > 0 && attachments?.map((item: IAttachmentSetting) => (
                <AsnForm.Item
                  name="Attach your CV"
                  label={item?.setting?.title}
                  className="upload_section"
                  key={item?.setting.id}
                  rules={[{ required: true }]}
                >
                  <Dragger
                    {...props}
                  >
                    <UploadDocument />
                    <p>File/Documents</p>
                  </Dragger>
                </AsnForm.Item>
              ))
            }
          </>}
      </AsnForm>
    </CreateSubActivity>
  );
};

export default CreateSubActivityModal;
