import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Row, Col, Typography, Space, message } from 'antd';
import styled from 'styled-components';

import { AsnModal } from '../../../../Forms/Modal';
import useDeleteFile from '../../../../../api/Files/useDeleteFile';
import FilesPreviewModal from './FilesPreviewModal';
import UploadService from './UploadService';
import { IErrorMessage } from '../../../../../types/project';
import { findFileType } from '../../../../../helpers/utils';
import { IRequiredDocuments } from '../../../../../types/api/activity/subActivity';

import { ReactComponent as DonneSvg } from '../../SubActivityIcons/done-all.svg';
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg';
import { ReactComponent as NotUploaded } from '../../SubActivityIcons/not-uploaded-docs.svg';
import { EyeOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const AntModal = styled(AsnModal)`
    max-width: 800px;
   .ant-modal-content {
    padding: 42px 32px 32px 32px;
   }
   .ant-modal-body {
    overflow-y: auto;
    max-height: 430px;
    padding: 12px;
   }
`;

const AntParagraph = styled(Paragraph)`
     word-break: break-all;
     width: 23vw;
     margin: 0;
     max-width: 340px;
     font-size: var(--base-font-size);
     div &.ant-typography {
        margin-bottom: 0;
     }
     &.ant-typography a {
        font-size: var(--font-size-semismall);
     }
`;

const RequiredDocuments: React.FC<IRequiredDocuments> = ({ requIredDocs, requiredFiles, openRequiredDocs, setOpenRequiredDocs, courseId }) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate: DeleteFile } = useDeleteFile();

  const deleteDoc = (name: string): void => {
    DeleteFile(name, {
      onSuccess: () => {
        void queryClient.invalidateQueries(['/api/sub-activity']);
        void message.success('Successfully deleted', 2);
      },
      onError: ({ response: { data: { message: errorMessage } } }: IErrorMessage) => {
        void message.error(errorMessage, 2);
      }
    });
  };

  const handlePreview = (path: string): void => {
    setOpenPreview(true);
    setUrl(path);
  };

  return (
    <>
      <AntModal
        footer={false}
        open={openRequiredDocs}
        width="60vw"
        onCancel={() => setOpenRequiredDocs(false)}
        centered
      >
        <Row style={{ width: '100%', margin: '16px 0px', fontSize: 'var(--base-font-size)' }} justify={'space-between'}>
          <Col span={13} >Required documents</Col>
          <Col span={4} style={{ textAlign: 'center' }}>Number</Col>
          <Col span={7} style={{ textAlign: 'end' }}>Downloaded</Col>
        </Row>
        {requIredDocs.length > 0
          ? requIredDocs?.map((doc, i) => (
            <Row key={i} style={{ width: '100%', marginBottom: '8px' }}>
              <Row style={{ width: '100%' }}>
                <Col span={13}>
                  <Space align='center'>
                    <UploadService
                      type="REQUIRED_DOCUMENT"
                      courseId={courseId}
                      keyname={doc?.title}
                      disableUploadReqDoc={requiredFiles?.filter((file) => file.keyname.trim() === doc.title.trim())?.length === doc.count}
                    />
                    <AntParagraph
                      ellipsis={{ rows: 1, expandable: true, symbol: <>View More</> }}
                    >
                      {doc?.title}
                    </AntParagraph>
                  </Space>
                </Col>
                <Col span={4}>
                  <Paragraph
                    style={{ textAlign: 'center', marginBottom: 0 }}>
                    {doc?.count}
                  </Paragraph>
                </Col>
                <Col span={3} push={4} style={{ textAlign: 'center' }}>
                  {(requiredFiles?.filter((file) => file.keyname.trim() === doc.title.trim())?.length === doc.count)
                    ? <DonneSvg />
                    : <Paragraph
                      style={{ marginBottom: 0 }}>
                      {requiredFiles?.filter((file) => file.keyname.trim() === doc.title.trim()).length}/{doc.count}
                    </Paragraph>
                  }
                </Col>
              </Row>
              {requiredFiles?.length > 0 && requiredFiles?.filter((file) => file.keyname.trim() === doc.title.trim())?.map((item) => (
                <Row style={{ width: '100%', marginTop: '8px' }} key={i}>
                  <Col span={13} >
                    <Space style={{ paddingLeft: '34px' }} align='center'>
                      {findFileType(item?.name)}
                      <AntParagraph
                        ellipsis={{ rows: 1, expandable: true, symbol: <>View More</> }}
                        style={{ maxWidth: '300px' }}
                      >
                        {item?.originalName}
                      </AntParagraph>
                    </Space>
                  </Col>
                  <Col span={3} push={8} style={{ textAlign: 'center' }}>
                    <Space align='center'>
                      <EyeOutlined style={{ cursor: 'pointer' }} onClick={() => handlePreview(item?.path)} />
                      <DeleteSvg style={{ cursor: 'pointer' }} onClick={() => deleteDoc(item.name)} />
                    </Space>
                  </Col>
                </Row>
              ))}
            </Row>
          ))
          : <Space direction='vertical' style={{ width: '100%' }} align='center'>
            <NotUploaded />
            <Paragraph>No required documents</Paragraph>
          </Space>
        }
      </AntModal >
      <FilesPreviewModal
        setUrl={setUrl}
        url={url}
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
      />
    </>
  );
};

export default RequiredDocuments;
