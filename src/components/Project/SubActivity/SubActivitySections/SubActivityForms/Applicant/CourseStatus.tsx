import React, { useEffect, useState } from 'react';
import { Space, message } from 'antd';

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
  applicationForm,
  courseStatus,
  refetch,
  navigateRouteInfo
}) => {
  const [fileList, setFileList] = useState<any>([]);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);

  const { data, refetch: refetchSingleStatus } =
    getSingleSubActivitySettingInfo(courseId, id, {});

  useEffect(() => {
    if (data?.files?.length !== 0) {
      const newFile = data?.files?.map((file: any, i: number) => {
        return {
          uid: `${i++}`,
          name: file.originalName,
          fileName: file.name,
          thumbUrl: file.path
        };
      });
      setDefaultFileList(newFile);
    }
  }, [data]);

  const { mutate: StartCourse } = useStartSubActivityCourse({
    onSuccess: () => {
      refetch();
      setActiveKey('1');
    },
    onError: () => {
    }
  });

  const { mutate: AttachFile } = useAttacheFilesSubActivitySection({
    onSuccess: () => {
      refetchSingleStatus();
      if (courseStatus !== 'ACTIVE') {
        StartCourse({ id: courseId });
      }
    },
    onError: ({
      response: {
        data: { message: error }
      }
    }: { response: { data: { message: string } } }) => {
      setDefaultFileList([]);
      setFileList([]);
      return message.error(error, 2);
    }
  });

  const add = (): any => {
    if (fileList.length > 0) {
      AttachFile({
        id: courseId,
        data: {
          files: fileList.map((file: { url: string }) => ({ file: file.url, keyname: 'status' })),
          sectionSettingId: id,
          visible: true
        }
      });
    }
    setActiveKey('1');
    setFileList([]);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="applicant_form" color={color}>
        <CourseHeaderStatus
          navigateRouteInfo={navigateRouteInfo}
          title={statusTitle}
          courseStatus={courseStatus}
          courseId={courseId}
          refetchSingleStatus={refetchSingleStatus}
          form={data?.form}
          applicationForm={applicationForm}
        />
        <DraggerForm
          text="Attach related document"
          fileList={fileList}
          docType='SECTION_SETTING_DOCUMENT'
          setFileList={setFileList}
          setDefaultFileList={setDefaultFileList}
          defaultFileList={defaultFileList}
        />
      </FormWrapper>
      <SubActivityFooter
        cancel={() => {
          refetchSingleStatus();
          setFileList([]);
          if (data !== undefined) {
            const newFile = data?.files?.map((file: any, i: number) => {
              return {
                uid: `${i++}`,
                name: file.originalName,
                fileName: file.name
              };
            });
            setDefaultFileList(newFile);
          }
          setActiveKey('1');
        }}
        add={add}
      />
    </Space>
  );
};

export default CourseStatusForm;
