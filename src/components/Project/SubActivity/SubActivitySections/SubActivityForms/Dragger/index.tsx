import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Typography, UploadProps, Upload, Modal, message } from 'antd';

import { ReactComponent as UploadDocument } from '../../../SubActivityIcons/upload-docs.svg';
import { ReactComponent as LinkIcon } from '../../../SubActivityIcons/link.svg';
import useFileUpload from '../../../../../../api/Activity/SubActivity/useUploadFile';
import useDeleteFile from '../../../../../../api/Files/useDeleteFile';
import { EyeOutlined } from '@ant-design/icons';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { Void } from '../../../../../../types/global';
import FileViewer from 'react-file-viewer';
import {
  IDraggerProps,
  IfilePreview
} from '../../../../../../types/api/activity/subActivity';
import { useQueryClient } from '@tanstack/react-query';

const { Dragger } = Upload;

const AsnDragger = styled(Dragger)`
  background: transparent !important;
  border: 1px dashed var(--dark-border-ultramarine) !important;
  border-radius: 4px;
  .ant-upload {
    padding: ${(props) =>
      props.id === 'subActivity' ? '6px 0 !important' : '2.4vh 0'};
  }
  &:hover {
    border: 1px dashed var(--dark-border-ultramarine);
  }
  h4.ant-typography {
    font-size: ${(props) =>
      props.id === 'subActivity'
        ? 'var(--base-font-size)'
        : 'var(--headline-font-size) !important'};
    color: var(--dark-border-ultramarine) !important;
  }
  svg {
    rect,
    path {
      fill: var(--dark-border-ultramarine) !important;
    }
  }
`;

export const AsnDragger2 = styled(Dragger)`
  background: transparent !important;
  border: none !important;
  text-align: start !important;
  margin-right: 10px;
  .ant-upload {
    padding: 0 !important;
  }
  svg {
    rect,
    path {
      fill: var(--dark-4) !important;
    }
  }
`;

const DraggerForm: React.FC<IDraggerProps> = ({
  text,
  padding,
  setFileList,
  defaultFileList,
  setDefaultFileList,
  disabled,
  fileList,
  docType,
  setReqDocs,
  keyName,
  name,
  reqDocs
}) => {
  const { Title } = Typography;
  const [opens, setOpens] = useState<boolean>(false);
  const [viewPdf, setViewPdf] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { mutate: UploadDoc } = useFileUpload();
  const { mutate: DeleteFile, error } = useDeleteFile();

  const handlePreview = (file: IfilePreview): void => {
    return setViewPdf(file?.thumbUrl !== undefined ? file?.thumbUrl : null);
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    const newFileList = [...info.fileList];
    setDefaultFileList(newFileList);
  };

  const handleCancel: Void = () => {
    setOpens(false);
    setViewPdf('');
  };

  const props: UploadProps = {
    customRequest: (options: any) => {
      const { file, onSuccess, onError: errorStatus } = options;
      UploadDoc(
        { file, type: docType },
        {
          onSuccess: (options: any) => {
            const {
              data: { result }
            } = options;
            setFileList((prevState: any) => [
              ...prevState,
              { url: result[0], id: file.uid }
            ]);

            if (docType === 'GENERAL_DOCUMENT') {
              setFileList([{ url: result[0], id: file.uid }]);
            }
            if (docType === 'REQUIRED_DOCUMENT') {
              setReqDocs((prevState: any) => [
                ...prevState,
                { keyname: keyName }
              ]);
            }
            onSuccess('ok');
          },
          onError: () => {
            errorStatus();
          }
        }
      );
    },
    onRemove: (file: any) => {
      if (file.originFileObj === undefined) {
        DeleteFile(file.fileName, {
          onSuccess: () => {
            void message.success('Deleted file', 2);
            void queryClient.invalidateQueries(['api/sub-activity/course']);
            void queryClient.invalidateQueries(['/api/sub-activity']);
            if (file?.status === 'done') {
              const newFileListDone = reqDocs?.filter(
                (item: { id: string }) => item?.id !== file?.id
              );
              setReqDocs([...newFileListDone]);
            }
          },
          onError: (e: {
            response: {
              data: { message: string }
            }
          }) => {
            const index = defaultFileList.findIndex(
              (item: any) => item.id === file.id
            );
            defaultFileList.splice(index, 1, file);
            setDefaultFileList(defaultFileList);
            void message.error(e.response.data.message);
          }
        });
      }
      if (error !== null) {
        setDefaultFileList((prevState: any) => [
          ...prevState,
          defaultFileList.filter((d: any) => d.uid !== file.uid)
        ]);
        const newFileList = fileList.filter(
          (item: { id: string }) => item.id !== file.uid
        );
        setFileList([...newFileList]);
      }
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: (file) => (
        <EyeOutlined
          onClick={() => {
            setOpens(true);
            handlePreview(file);
          }}
        />
      ),
      showRemoveIcon: true
    },
    onChange: handleChange,
    name: 'file',
    disabled,
    accept: '.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx,.png,.jpeg'
  };

  const getFileExtension = (fileName: any): any => {
    if (fileName == null) {
      return '';
    }
    return fileName
      .slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
      .toLowerCase();
  };

  const fileExtension = getFileExtension(viewPdf);

  const isVideo = ['mp4', 'avi', 'flv', 'ogv'].includes(fileExtension);

  return (
    <Col style={{ padding: padding ?? '0' }}>
      {docType !== 'REQUIRED_DOCUMENT'
        ? (
        <AsnDragger
          {...props}
          fileList={defaultFileList}
          style={{ width: '100%', height: 'inherit' }}
          id={name}
          onPreview={handlePreview}
        >
          <UploadDocument />
          <Title level={4}>{text}</Title>
        </AsnDragger>
          )
        : (
        <AsnDragger2
          {...props}
          fileList={defaultFileList}
          style={{ width: '100%', height: 'inherit' }}
          showUploadList={false}
          onPreview={handlePreview}
        >
          <LinkIcon />
        </AsnDragger2>
          )}

      <Modal
        open={opens}
        onCancel={handleCancel}
        okText={''}
        className="filePreviewModal"
      >
        {viewPdf !== null && (
          <>
            {fileExtension === 'doc' && (
              <FileViewer fileType="doc" filePath={viewPdf} />
            )}
            {fileExtension === 'docx' && (
              <FileViewer fileType="docx" filePath={viewPdf} />
            )}
            {fileExtension === 'png' && (
              <FileViewer fileType="png" filePath={viewPdf} />
            )}
            {fileExtension === 'pdf' && (
              <DocViewer
                documents={[{ uri: viewPdf }]}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: {
                    disableHeader: false,
                    disableFileName: false,
                    retainURLParams: false
                  }
                }}
                style={{ height: window.innerHeight - 125 }}
              />
            )}
            {isVideo && <video src={viewPdf} controls />}
            {fileExtension === 'xlsx' && (
              <DocViewer
                documents={[{ uri: viewPdf }]}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: {
                    disableHeader: false,
                    disableFileName: false,
                    retainURLParams: false
                  }
                }}
                style={{ height: window.innerHeight - 125 }}
              />
            )}
          </>
        )}
      </Modal>
    </Col>
  );
};

export default DraggerForm;
