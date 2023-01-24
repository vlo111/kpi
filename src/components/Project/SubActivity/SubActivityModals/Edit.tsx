import { message } from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';

import { useAuth } from '../../../../hooks/useAuth';
import { ICourseSettingMap } from '../../../../types/api/activity/subActivity';
import { IUser } from '../../../../types/auth';
import { FormFinish } from '../../../../types/global';
import { AsnForm } from '../../../Forms/Form';
import AsnSpin from '../../../Forms/Spin';
import SubActivityForm from './SubActivityiForms';
import GetSingleSubActivity from '../../../../api/Activity/SubActivity/useGetSingleSubActivity';
import useUpdateSubActivity from '../../../../api/Activity/SubActivity/useUpdateSubActivity';

const EditSubCourse: React.FC<any> = ({
  InputActivityId,
  projectId,
  refetch,
  openCreateSubActivity,
  setOpenCreateSubActivity
}) => {
  const [form] = AsnForm.useForm();
  const { user } = useAuth();

  const { mutate: updateSubActivity } = useUpdateSubActivity({
    onSuccess: () => {
      refetch();
      setOpenCreateSubActivity(false);
    }
  });

  const { data: subActivity, isLoading } = GetSingleSubActivity(
    InputActivityId,
    { courseInfo: true },
    {}
  );

  const { id: userId }: IUser = user;

  const onFinish: FormFinish = (values) => {
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
          sectionsData: subActivity?.sectionsData?.map((section: { id: string, order: number }, i: number) => {
            return {
              id: section?.id,
              title: values.sectionsData[i].title,
              order: section?.order,
              description: values.sectionsData[i].description,
              teachingMode: values.sectionsData[i].teaching_mode,
              startDate: moment(values.sectionsData[i].startDate).format(),
              endDate: moment(values.sectionsData[i].endDate).format(),
              files: values.sectionsData[i].files.map((file: { url: string, keyName: string }) => ({ file: file.url, keyname: file.keyName }))
            };
          })
        };
        updateSubActivity({ id: InputActivityId, data: requestBody });
      }
    }
    if (subActivity?.sectionsData.length === 1) {
      const requestBody = {
        organizationId: values?.organization,
        managerId: userId,
        sectorId: values?.sector,
        regionId: values?.region,
        sectionsData: subActivity?.sectionsData.map((section: { id: string, order: number }, i: number) => {
          return {
            id: section?.id,
            title: values.title,
            order: section?.order,
            description: values.description,
            teachingMode: values.teaching_mode,
            startDate: moment(values.startDate).format(),
            endDate: moment(values.endDate).format(),
            files: values.sectionsData[i].files.map((file: { url: string, keyName: string }) => ({ file: file.url, keyname: file.keyName }))
          };
        })
      };
      updateSubActivity({ id: InputActivityId, data: requestBody });
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
      const initialData = subActivity?.sectionsData.map((item: any) => ({
        files: item?.data?.files,
        title: item?.data?.title,
        description: item?.data?.description,
        startDate: moment(item?.data?.startDate),
        endDate: moment(item?.data?.endDate),
        teaching_mode: item?.data?.teachingMode,
        partner_organization: item?.data?.partnerOrganization
      }));

      form.setFieldsValue({
        organization: subActivity?.organization?.id,
        region: subActivity?.region?.id,
        sector: subActivity?.sector?.id,
        ...initialData[0],
        sectionsData: initialData
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
      edit={true}
    />
  );
};

export default EditSubCourse;
