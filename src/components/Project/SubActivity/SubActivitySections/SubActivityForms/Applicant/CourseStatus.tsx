import React, { useEffect, useState } from 'react';
import { Space } from 'antd';

import DraggerForm from '../Dragger';
import FormWrapper from '../../../SubActivityWrapper';
import SubActivityFooter from '../../../SubActivityWrapper/Footer';
import useAttacheFilesSubActivitySection from '../../../../../../api/Activity/SubActivity/useAttachFileCourseSetting';
import useStartSubActivityCourse from '../../../../../../api/Activity/SubActivity/useStartSubActivityCourse';
import getSingleSubActivitySettingInfo from '../../../../../../api/Activity/SubActivity/useGetSubActivitySettingInfo';
import CourseHeaderStatus from './CourseStatusHeader';

const CourseStatusForm: React.FC<any> = ({
  id,
  setActiveKey,
  courseId,
  color,
  statusTitle,
  applicationForm
}) => {
  const [fileList, setFileList] = useState<any>([]);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);
  const { data } = getSingleSubActivitySettingInfo(courseId, id, {});

  useEffect(() => {
    if (data?.files?.length !== 0) {
      const newFile = data?.files?.map((file: any, i: any) => {
        return { ...file, uid: `${i++}` };
      });
      setDefaultFileList(newFile);
    }
  }, [data]);

  const { mutate: StartCourse } = useStartSubActivityCourse({
    onSuccess: () => {
      setActiveKey('1');
    },
    onError: () => {
      console.log('aaa');
    }
  });

  const { mutate: AttachFile } = useAttacheFilesSubActivitySection({
    onSuccess: () => {
      StartCourse({ id: courseId });
    },
    onError: () => {
      console.log('aaa');
    }
  });

  const add = (): any => {
    AttachFile({
      id: courseId,
      data: {
        files: fileList,
        sectionSettingId: id
      }
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="applicant_form" color={color}>
        <CourseHeaderStatus title={statusTitle} form={data?.form} applicationForm={applicationForm}/>
        <DraggerForm
          text="Attach related document"
          setFileList={setFileList}
          defaultFileList={defaultFileList}
        />
      </FormWrapper>
      <SubActivityFooter cancel={setActiveKey} add={add} />
    </Space>
  );
};

export default CourseStatusForm;
