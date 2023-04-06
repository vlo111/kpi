import React, { useEffect, useState } from 'react';
import { Col, message, Row, Space } from 'antd';

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
    onError: (e: { response: { data: { message: string } } }) => {
      void message.error(e.response.data.message);
      setDefaultFileList(defaultFileList.filter(
        (i: { lastModifiedDate: string | undefined; }) => i.lastModifiedDate === undefined
      ));
    },
    onSuccess: () => {
      setFileList([]);
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
  }, []);

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
    <FormWrapper
      className={requIredDocs?.length >= 1 ? 'documents_info' : 'required_doc'}
      color={color}
    >
      <DraggerForm
        text="File/Documents"
        docType="GENERAL_DOCUMENT"
        disabled={status === 'INACTIVE'}
        fileList={fileList}
        setFileList={setFileList}
        defaultFileList={defaultFileList}
        setDefaultFileList={setDefaultFileList}
        name="subActivity"
      />
      {requIredDocs.length >= 1 && (
        <Space
          direction="vertical"
          style={{
            width: '100%',
            borderBottom: '0.5px solid var(--dark-border-ultramarine)',
            padding: '1vh 0'
          }}
        >
          <Row
            align="middle"
            justify="space-between"
            style={{
              fontSize: 'var(--font-size-semismall)',
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
          <Col style={{ padding: '0', maxHeight: '85px', overflowY: 'auto' }}>
            {requIredDocs?.map((doc: { title: string, count: number }) => (
              <Row
                align="middle"
                justify="space-between"
                style={{ color: 'var(--dark-4)', marginBottom: '5px' }}
                key={doc.title}
              >
                <Col
                  style={{ textAlign: 'start', display: 'flex' }}
                  span={8}
                  onClick={() => {
                    console.log('ssssss', doc.title);
                    setKeyName(doc.title);
                  }}
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
                  <Row
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {doc.title}
                  </Row>
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
