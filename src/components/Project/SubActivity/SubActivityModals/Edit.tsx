import { message } from 'antd';
import React, { useEffect } from 'react';
// import getSingleTemplate from '../../../../api/Activity/Template/useGetSingleActivityTemplate';
// import useGetProjectDetails from '../../../../api/Details/useGetProjectDetails';
import { useAuth } from '../../../../hooks/useAuth';
import { ICourseSettingMap } from '../../../../types/api/activity/subActivity';
import { IUser } from '../../../../types/auth';
import { FormFinish } from '../../../../types/global';
import { AsnForm } from '../../../Forms/Form';
import AsnSpin from '../../../Forms/Spin';
import moment from 'moment';
import SubActivityForm from './SubActivityiForms';
import GetSingleSubActivity from '../../../../api/Activity/SubActivity/useGetSingleSubActivity';
import useUpdateSubActivity from '../../../../api/Activity/SubActivity/useUpdateSubActivity';

const EditSubCourse: React.FC<any> = ({
  InputActivityId,
  projectId,
  openCreateSubActivity,
  setOpenCreateSubActivity
}) => {
  const [form] = AsnForm.useForm();
  const { user } = useAuth();

  const { mutate: updateSubActivity } = useUpdateSubActivity({
    onSuccess: () => {
      console.log('ekavv');
    },
    onError: () => {
      console.log('errrr');
    }
  });

  const { data: subActivity, isLoading } = GetSingleSubActivity(
    InputActivityId,
    { courseInfo: true },
    {}
  );

  const { firstName, lastName, id: userId }: IUser = user;

  console.log(
    InputActivityId,
    userId,
    'InputActivityIdInputActivityIdInputActivityIdInputActivityId'
  );

  const onFinish: FormFinish = (values) => {
    console.log(values);

    if (subActivity?.sectionsData.length > 1) {
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
          organizationId: values?.organization,
          managerId: userId,
          sectorId: values?.sector,
          regionId: values?.region,
          sectionsData: subActivity?.sectionsData?.map((section: { id: string }, i: number) => {
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
        updateSubActivity({ id: InputActivityId }, requestBody);
      }
    }
    if (subActivity?.sectionsData.length === 1) {
      console.log('mtavvv');

      const requestBody = {
        organizationId: values?.organization,
        managerId: userId,
        sectorId: values?.sector,
        regionId: values?.region,
        sectionsData: subActivity?.sectionsData.map((section: { id: string }, i: number) => {
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
      updateSubActivity(requestBody);
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
        // organization: organizations,
        // region: regions,
        // sector: sectors,
        title: subActivity?.sectionsData.map(
          (item: { title: string }) => item?.title
        ),
        sectionsData: subActivity?.sectionsData.map((item: any) => ({
          files: item?.data?.files,
          title: item?.data?.title,
          description: item?.data?.description,
          startDate: moment(item?.data?.startDate),
          endDate: moment(item?.data?.endDate),
          teaching_mode: item?.data?.teachingMode,
          partner_organization: item?.data?.partnerOrganization
        })),
        sub_activity_manager: `${firstName} ${lastName}`
      });
    }
  }, [user, subActivity]);

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
      courseStructure={
        subActivity?.sectionsData.length > 1 ? 'MULTI_SECTION' : 'ONE_SECTION'
      }
      projectId={projectId}
    />
  );
};

export default EditSubCourse;
