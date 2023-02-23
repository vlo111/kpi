import React, { useEffect, useState } from 'react';
import { Col, Row, Space } from 'antd';

import DraggerForm from '../SubActivityForms/Dragger';
import FormWrapper from '../../SubActivityWrapper';
import { ReactComponent as NotUploaded } from '../../SubActivityIcons/not-uploaded-docs.svg';
import { ReactComponent as DonneSvg } from '../../SubActivityIcons/done-all.svg';
import useAttacheFilesSubActivitySection from '../../../../../api/Activity/SubActivity/useAttachFileCourseSetting';

const SubActivityDocuments: React.FC<any> = ({
  requIredDocs,
  color,
  status,
  courseId,
  files
}) => {
  const [fileList, setFileList] = useState<any>([]);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);
  const [keyName, setKeyName] = useState('');
  const [reqDocs, setReqDocs] = useState([]);
  const { mutate: AttachFile } = useAttacheFilesSubActivitySection({
    onSuccess: () => {
      console.log('bbb');
    },
    onError: () => {
      console.log('');
    }
  });

  useEffect(() => {
    if (files?.length !== 0) {
      const newFile = files?.map((file: any, i: number) => {
        return {
          uid: `${i++}`,
          name: file.originalName,
          fileName: file.name,
          thumbUrl: file.path
        };
      });
      setDefaultFileList(newFile);
      const filteredFiles = files?.filter(
        (item: { type: string }) => item.type === 'REQUIRED_DOCUMENT'
      );
      setReqDocs(filteredFiles);
    }
  }, [files]);

  useEffect(() => {
    if (fileList.length > 0) {
      AttachFile({
        id: courseId,
        data: {
          files: fileList.map((file: { url: string }) => ({
            file: file.url,
            keyname: keyName ?? 'general'
          }))
        }
      });
    }
  }, [fileList]);

  return (
    <FormWrapper className="documents_info" color={color}>
      <DraggerForm
        text="File/Documents"
        docType="GENERAL_DOCUMENT"
        disabled={status === 'INACTIVE' || fileList?.length === 0}
        fileList={fileList}
        setFileList={setFileList}
        defaultFileList={defaultFileList}
        setDefaultFileList={setDefaultFileList}
      />
      {requIredDocs.length >= 1 && (
        <Space
          direction="vertical"
          style={{
            width: '100%',
            borderBottom: '0.5px solid var(--dark-border-ultramarine)',
            padding: '16px 0'
          }}
        >
          <Row
            align="middle"
            justify="space-between"
            style={{
              fontSize: 'var(--base-font-size)',
              color: 'var(--dark-2)'
            }}
          >
            <Col style={{ textAlign: 'start' }} span={8}>
              Required documents
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              Number
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              Downloaded
            </Col>
          </Row>
          <Col style={{ padding: '0', maxHeight: '60px', overflowY: 'scroll' }}>
            {requIredDocs?.map((doc: { title: string, count: number }) => (
              <Row
                align="middle"
                justify="space-between"
                style={{ color: 'var(--dark-4)' }}
                key={doc.title}
              >
                <Col
                  style={{ textAlign: 'start', display: 'flex' }}
                  span={8}
                  onClick={() => setKeyName(doc.title)}
                >
                  <DraggerForm
                    text="File/Documents"
                    setReqDocs={setReqDocs}
                    docType="REQUIRED_DOCUMENT"
                    disabled={
                      status === 'INACTIVE' ||
                      reqDocs.filter(
                        (i: { keyname: string }) => i.keyname === doc.title
                      ).length === doc.count
                    }
                    fileList={fileList}
                    setFileList={setFileList}
                    defaultFileList={defaultFileList}
                    setDefaultFileList={setDefaultFileList}
                    keyName={keyName}
                  />
                  <Row>{doc.title}</Row>
                </Col>
                <Col style={{ textAlign: 'center' }} span={8}>
                  {doc.count}
                </Col>
                <Col style={{ textAlign: 'center' }} span={8}>
                  {reqDocs.filter(
                    (i: { keyname: string }) => i.keyname === doc.title
                  ).length !== doc.count
                    ? (
                    `${doc.count}/${
                      reqDocs.filter(
                        (i: { keyname: string }) => i.keyname === doc.title
                      ).length
                    }`
                      )
                    : (
                    <DonneSvg />
                      )}
                </Col>
              </Row>
            ))}
          </Col>
        </Space>
      )}
      {defaultFileList.length === 0 && (
        <Space
          direction="vertical"
          style={{ width: '100%', marginTop: '3vh' }}
          align="center"
        >
          <Col style={{ width: '100%' }}>
            <NotUploaded />
          </Col>
          <Col style={{ width: '100%' }}>No files attached</Col>
        </Space>
      )}
    </FormWrapper>
  );
};

export default SubActivityDocuments;
