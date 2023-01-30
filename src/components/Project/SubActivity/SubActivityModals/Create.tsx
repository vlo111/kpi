import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCreateSubActivity from '../../../../api/Activity/SubActivity/useCreateSubActivity';
import getSingleTemplate from '../../../../api/Activity/Template/useGetSingleActivityTemplate';
import { PATHS } from '../../../../helpers/constants';
import { useAuth } from '../../../../hooks/useAuth';
import { ICourseSettingMap, ICreateSubActivityTypes } from '../../../../types/api/activity/subActivity';
import { IUser } from '../../../../types/auth';
import { FormFinish } from '../../../../types/global';
import { AsnForm } from '../../../Forms/Form';
import AsnSpin from '../../../Forms/Spin';
import moment from 'moment';
import SubActivityForm from './SubActivityiForms';

const CreateSubCourse: React.FC<ICreateSubActivityTypes> = ({
  templateId,
  openCreateSubActivity,
  setOpenCreateSubActivity
}) => {
  const [form] = AsnForm.useForm();
  const [activeTab, setActiveTab] = useState<string>('0');
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const { data: subActivity, isLoading } = getSingleTemplate(templateId, {
    enabled: Boolean(templateId)
  });

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
      const requiredFieldsCount = Math.max(
        ...checkFields.map(
          (field: { requiredFields: number }) => field.requiredFields
        )
      );
      const notCompletedField = checkFields.filter(
        (field: { requiredFields: number }) =>
          field.requiredFields < requiredFieldsCount
      );
      if (notCompletedField.length > 0) {
        setActiveTab(notCompletedField[0].sectionField);
      } else {
        const requestBody = {
          activityTemplateId: templateId,
          organizationId: values?.organization,
          managerId: userId,
          sectorId: values?.sector,
          regionId: values?.region,
          sectionsData: subActivity?.sections?.map(
            (section: { id: string }, i: number) => {
              return {
                sectionId: section?.id,
                title: values.sectionsData[i].title,
                partner_organization:
                  values.sectionsData[i].partner_organization,
                description: values.sectionsData[i].description,
                teachingMode: values.sectionsData[i].teaching_mode,
                startDate: moment(values.sectionsData[i].startDate).format(),
                endDate: moment(values.sectionsData[i].endDate).format(),
                customInputs: values.sectionsData[i].customInputs,
                files: values.sectionsData[i].customInputs
                  .filter(
                    (item: {
                      setting: { answerType: string }
                      ATTACHMENT: string
                    }) =>
                      item?.setting?.answerType === 'ATTACHMENT' &&
                      item?.ATTACHMENT !== undefined
                  )
                  .map((item: any) => ({
                    file: item?.ATTACHMENT[0]?.type,
                    keyname: item?.ATTACHMENT[0]?.keyName
                  }))
              };
            }
          )
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
        sectionsData: subActivity?.sections.map(
          (section: { id: string }, i: number) => {
            return {
              sectionId: section?.id,
              title: values.title,
              description: values.description,
              teachingMode: values.teaching_mode,
              startDate: moment(values.startDate).format(),
              endDate: moment(values.endDate).format(),
              files: values.sectionsData[i].customInputs
                .filter(
                  (item: {
                    setting: { answerType: string }
                    ATTACHMENT: string
                  }) =>
                    item?.setting?.answerType === 'ATTACHMENT' &&
                    item?.ATTACHMENT !== undefined
                )
                .map((item: any) => ({
                  file: item?.ATTACHMENT[0]?.type,
                  keyname: item?.ATTACHMENT[0]?.keyName
                })),
              customInputs: values.sectionsData[i].customInputs
            };
          }
        )
      };
      console.log(requestBody, 'requestBody one');

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

  const attachments = subActivity?.courseSettingMap?.filter(
    (item: ICourseSettingMap) =>
      item.setting.type === 'CUSTOM' ||
      item.setting.title === 'Partner Organization'
  );

  useEffect(() => {
    if (subActivity !== undefined) {
      form.setFieldsValue({
        duration_soft_number: 18,
        duration_technical_number: 18,
        duration: 36,
        files: [],
        sectionsData: Array(subActivity?.sections?.length).fill({
          customInputs: attachments.map((item: any) => ({
            active: item?.active,
            setting: {
              id: item?.setting?.id,
              answerType: item?.setting?.answerType,
              title: item?.setting?.title,
              data: item?.setting?.data
            }
          }))
        })
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
      sectionsCount={subActivity?.sections?.length}
      projectId={id}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      edit={false}
    />
  );
};

export default CreateSubCourse;
