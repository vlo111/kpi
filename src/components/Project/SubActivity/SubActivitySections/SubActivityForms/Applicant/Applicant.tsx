import React, { useEffect, useState } from 'react';
import { Row, Space, Typography } from 'antd';

import { AsnButton } from '../../../../../Forms/Button';
import DraggerForm from '../Dragger';
import ApplicantList from './ApplicantList';
import FormWrapper from '../../../SubActivityWrapper';
import SubActivityFooter from '../../../SubActivityWrapper/Footer';
import useAttacheFilesSubActivitySection from '../../../../../../api/Activity/SubActivity/useAttachFileCourseSetting';
import useStartSubActivityCourse from '../../../../../../api/Activity/SubActivity/useStartSubActivityCourse';
import getSingleSubActivitySettingInfo from '../../../../../../api/Activity/SubActivity/useGetSubActivitySettingInfo';

const ApplicantsForm: React.FC<any> = ({ id, setActiveKey }) => {
  const { Title } = Typography;
  const [Published] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);

  const { data } = getSingleSubActivitySettingInfo('d5c302fe-381e-4c10-afce-4f794b5a0721', id, {});

  useEffect(() => {
    if (data?.files?.length !== 0) {
      console.log('ok data files are length', data?.files?.length);
      const newFile = data?.files?.map((file: any, i: any) => {
        return { ...file, uid: `${i++}` };
      });
      setDefaultFileList(newFile);
    }
  }, [data]);

  const { mutate: StartCourse } = useStartSubActivityCourse(
    {
      onSuccess: () => {
        setActiveKey('1');
      },
      onError: () => {
        console.log('aaa');
      }
    }
  );

  const { mutate: AttachFile } = useAttacheFilesSubActivitySection(
    {
      onSuccess: () => {
        StartCourse({ id: 'd5c302fe-381e-4c10-afce-4f794b5a0721' });
      },
      onError: () => {
        console.log('aaa');
      }
    }
  );

  const add = (): any => {
    AttachFile({
      id: 'd5c302fe-381e-4c10-afce-4f794b5a0721',
      data: {
        files: fileList,
        sectionSettingId: id
      }
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 64]}>
      <FormWrapper className="applicant_form">
        <Row justify="center" style={{ marginBottom: '3.2vh' }}>
          <Title level={5}>Application form</Title>
        </Row>
        {!Published
          ? (
          <>
            <Row justify="center" style={{ width: '100%' }}>
              <AsnButton
                className="primary"
                type="primary"
                // onClick={() => setPublished(true)}
              >
                Publish Application form
              </AsnButton>
            </Row>
            <Row
              justify="center"
              style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
            >
              <Title level={5}>Or</Title>
            </Row>
            <DraggerForm text="Attach related document" padding="0 6.1vw" setFileList={setFileList} defaultFileList={defaultFileList}/>
          </>
            )
          : (
          <ApplicantList />
            )}
      </FormWrapper>
      <SubActivityFooter cancel={setActiveKey} add={add} />
    </Space>
  );
};

export default ApplicantsForm;
