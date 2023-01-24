import { message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCreateSubActivity from '../../../../api/Activity/SubActivity/useCreateSubActivity';
import getSingleTemplate from '../../../../api/Activity/Template/useGetSingleActivityTemplate';
import { PATHS } from '../../../../helpers/constants';
import { useAuth } from '../../../../hooks/useAuth';
import { ICourseSettingMap } from '../../../../types/api/activity/subActivity';
import { IUser } from '../../../../types/auth';
import { FormFinish } from '../../../../types/global';
import { AsnForm } from '../../../Forms/Form';
import AsnSpin from '../../../Forms/Spin';
import moment from 'moment';
import SubActivityForm from './SubActivityiForms';

const CreateSubCourse: React.FC<any> = ({ templateId, openCreateSubActivity, setOpenCreateSubActivity }) => {
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const { data: subActivity, isLoading } = getSingleTemplate(templateId, { enabled: Boolean(templateId) });

  const { mutate: createSubActivity } = useCreateSubActivity({
    onSuccess: (response: any) =>
      navigate(
        `/project/${PATHS.SUBACTIVITY.replace(':id', response?.data?.id)}`
      )
  });

  const { id: userId }: IUser = user;

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
        // setActiveTab(notCompletedField[0].sectionField);
      } else {
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
    //   const { errorFields } = values;
    //   const notCompletedField = errorFields[0].name;
      void message.error('Please fill all Sections data', 2);
    //   setActiveTab(notCompletedField[1].toString());
    }
  };

  const attachments = subActivity?.courseSettingMap?.filter(
    (item: ICourseSettingMap) =>
      item.setting.type === 'CUSTOM' && item.setting.answerType === 'ATTACHMENT'
  );

  useEffect(() => {
    if (subActivity !== undefined) {
      form.setFieldsValue({
        sectionsData: Array(subActivity?.sections?.length).fill({ files: [] })
      });
    }
  }, [subActivity]);

  if (isLoading === true) {
    return <AsnSpin />;
  }
  return (
        <SubActivityForm
         form={form}
         attachments={attachments}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         setOpenCreateSubActivity={setOpenCreateSubActivity}
         openCreateSubActivity={openCreateSubActivity}
         courseStructure={subActivity?.courseStructure}
         projectId={id}
         edit={false}
        />
  );
};

export default CreateSubCourse;
