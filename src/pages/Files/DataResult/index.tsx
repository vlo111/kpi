/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react';
import AsnSpin from '../../../components/Forms/Spin';
import { ReactComponent as PdfSvg } from '../UploadImg/pdf.svg';
import { ReactComponent as ExcelSvg } from '../UploadImg/excel.svg';
import { ReactComponent as WordSvg } from '../UploadImg/word.svg';
import { ReactComponent as DocumentSvg } from '../UploadImg/document.svg';
import { ReactComponent as Folder } from '../UploadImg/folder.svg';
import { ReactComponent as NoResult } from '../UploadImg/noResult.svg';

import { ReactComponent as ImgSvg } from '../UploadImg/upload-img.svg';
import { DeleteOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { IDataResult } from '../../../types/files';
import { Collapse, Button, Col, Modal, Popover, Row, Upload, message, Divider } from 'antd';
import useFileUpload from '../../../api/Activity/Template/SubActivity/useUploadFile';
import useAttacheFilesSubActivitySection from '../../../api/Activity/Template/SubActivity/useAttachFileCourseSetting';

import DocumentDonload from '../Popover/Pdf';
import styled from 'styled-components';

// import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const DocumentCard = styled(Col)`
  .ant-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-wrap: anywhere;
  }
`;
const Result = styled.div`
 .ant-collapse>.ant-collapse-item>.ant-collapse-header{
  align-items: center
 }
 .ant-divider{
  span{
    font-size: var(--base-font-size);
    color: var(--dark-2)
  }
 }
`;

const DataResult: React.FC<IDataResult> = ({
  fileList,
  setOpen,
  open,
  onRemoveFile,
  courseId,
  refetch,
  isFetchingFolderFiles,
  folderId,
  folderName,
  setFolderId,
  setFolderName,
  refetchFolderFiles
}) => {
  const [fileName, setFileName] = useState('');
  const [viewPdf, setViewPdf] = useState(null);
  const [opens, setOpens] = useState(false);
  const [openPopOver, setOpenPopOver] = useState<{ id: string, show: boolean }>({
    id: '',
    show: false
  });
  const { mutate: uploadFile } = useFileUpload();
  const { mutate: addFileCourse } = useAttacheFilesSubActivitySection({
    onSuccess: () => {
      refetch();
      void message.success('Successfully attached');
    },
    onError: () => message.error('Something went wrong')
  });
  const uploadImgfile = (file: any): any => {
    const ext = file.name?.split('.').pop();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (ext) {
      const isImg = ['png', 'jpg', 'jpeg', 'gif', 'svg'].find(
        (p) => p.toLocaleLowerCase() === ext.toLocaleLowerCase()
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (isImg) {
        return <ImgSvg />;
      }
      switch (ext.toLocaleLowerCase()) {
        case 'doc':
        case 'docx':
          return <WordSvg />;
        case 'xls':
        case 'xlsx':
          return <ExcelSvg />;
        case 'pdf':
          return <PdfSvg />;
        default:
          return <DocumentSvg />;
      }
    }
  };
  const hide = (): void => {
    setOpenPopOver({
      show: false,
      id: ''
    });
  };

  const handleOpenChange = (newOpen: boolean, fileId: string): void => {
    setOpenPopOver({
      show: newOpen,
      id: fileId
    });
  };
  const content = (name: any, path: any): any => {
    return (
      <>
        <Button type="link" onClick={(e) => {
          hide();
          preview(fileName);
        }}>
          {' '}
          <EyeOutlined />
          preview
        </Button>
        <Button type="link" onClick={() => {
          hide();
          onRemoveFile(name);
        } }>
          {' '}
          <DeleteOutlined />
          delete
        </Button>
        <DocumentDonload hide={hide} name={name} path={path} />
      </>
    );
  };
  const preview = (name: any): any => {
    setOpens(true);
    setViewPdf(name);
  };

  const handleCancel = (e: any): any => {
    setOpens(false);
  };
  const { Panel } = Collapse;
  if (isFetchingFolderFiles) {
    return <AsnSpin />;
  }
  return (
    <Result>
      {fileList?.folders && fileList?.files
        ? (
        <div style={{ height: 'calc(100vh - 21vh)', overflow: 'auto', width: '100%', padding: '30px 0', background: 'var(--white)' }}>
          <Upload
            listType="picture"
            style={{ borderRadius: 0, width: '50%' }}
            showUploadList={false}
            accept='.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
            customRequest={(options: { file: any }) => {
              const { file } = options;
              uploadFile({ file, type: 'GENERAL_DOCUMENT' },
                {
                  onSuccess: (data: any) => {
                    addFileCourse({
                      id: courseId,
                      data: {
                        files: [{
                          file: data?.data?.result[0]
                        }]
                      }
                    });
                  },
                  onError: ({ response }: any) => message.error(response?.data?.message, 2)
                });
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <Collapse defaultActiveKey={['1']} ghost bordered={false}>
          <Panel
              header={
                <Divider orientation="left" plain >
                {`Required documents (${fileList?.files?.REQUIRED_DOCUMENT.length})`}
              </Divider>
              }
              key="1"
            >
              {fileList?.files?.REQUIRED_DOCUMENT.length > 0 && (
                <Row gutter={[10, 50]} >
                  {fileList?.files?.REQUIRED_DOCUMENT.map((file: any) => (
                   <Popover
                      key={file?.path}
                      trigger="click"
                      content={content(file?.name, file?.path)}
                      placement="bottom"
                      overlayClassName="documentPopover"
                      open={!!openPopOver.show && (openPopOver.id === file.path)}
                      onOpenChange={(newOpen) => handleOpenChange(newOpen, file.path)}
                    >
                      <DocumentCard sm={14} xxl={6} xl={8} md={12}>
                        <Col
                          onClick={() => {
                            setOpen(file.uid);
                            setFileName(file?.path);
                          }}
                        >
                          {uploadImgfile(file)}
                          <Col>{file?.name}</Col>
                        </Col>
                      </DocumentCard>
                    </Popover>
                  ))}
                </Row>
              )}
            </Panel>
            <Panel
              header={
                <Divider orientation="left" plain>
                {`General documents (${fileList?.files?.GENERAL_DOCUMENT.length})`}
              </Divider>
              }
              key="2"
            >
              {fileList?.files?.GENERAL_DOCUMENT.length > 0 && (
                <Row gutter={[10, 50]} >
                  {fileList?.files?.GENERAL_DOCUMENT.map((file: any) => (
                    <Popover
                      key={file?.path}
                      trigger="click"
                      content={content(file?.name, file?.path)}
                      placement="bottom"
                      overlayClassName="documentPopover"
                      open={!!openPopOver.show && (openPopOver.id === file.path)}
                      onOpenChange={(newOpen) => handleOpenChange(newOpen, file.path)}
                    >
                      <DocumentCard sm={14} xxl={6} xl={8} md={12}>
                        <Col
                          onClick={() => {
                            setOpen(file.uid);
                            setFileName(file?.path);
                          }}
                        >
                          {uploadImgfile(file)}
                          <Col>{file?.name}</Col>
                        </Col>
                      </DocumentCard>
                    </Popover>
                  ))}
                </Row>
              )}
            </Panel>
            <Panel
              header={
                <Divider orientation="left" plain>
                {`Status folders (${fileList?.folders.length})`}
              </Divider>
              }
              key="3"
            >
              {fileList?.folders?.length > 0 && (
                <Row gutter={[10, 50]}>
                  {fileList?.folders?.map((folder: any) => (
                      <DocumentCard key={folder.id} sm={14} xxl={6} xl={8} md={12}>
                        <Col>
                          <Col style={{ cursor: 'pointer' }} onClick={() => {
                            setFolderName(folder?.title);
                            setFolderId(folder?.id);
                          }}>
                            <Folder />
                            {folder?.title}
                          </Col>
                        </Col>
                      </DocumentCard>
                  ))}
                </Row>
              )}
            </Panel>
          </Collapse>
        </div>
          )
        : (
            fileList?.length > 0 && folderId === ''
              ? (
          <>
            <Row gutter={[10, 50]} style={{ height: 'calc(100vh - 21vh)', overflow: 'auto', width: '100%', padding: '30px 0', background: 'white' }}>
              {fileList?.map((doc: any) => (
                <Popover
                  key={doc?.path}
                  trigger="click"
                  content={content(doc?.name, doc?.path)}
                  placement="bottom"
                  overlayClassName="documentPopover"
                  open={!!openPopOver.show && (openPopOver.id === doc.path)}
                  onOpenChange={(newOpen) => handleOpenChange(newOpen, doc.path)}
                >
                  <DocumentCard sm={14} xxl={6} xl={8} md={12}>
                    <Col
                      onClick={() => {
                        setOpen(doc.uid);
                        setFileName(doc?.path);
                      }}
                    >
                      {uploadImgfile(doc)}
                      <Col>{doc?.originalName}</Col>
                    </Col>
                  </DocumentCard>
                </Popover>
              ))}
            </Row>
          </>
                )
              : fileList?.length >= 0 && folderId !== ''
                ? (
                <div>
                      <Upload
            listType="picture"
            style={{ borderRadius: 0, width: '50%' }}
            showUploadList={false}
            accept='.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
            customRequest={(options: { file: any }) => {
              const { file } = options;
              uploadFile({ file, type: 'SECTION_SETTING_DOCUMENT' },
                {
                  onSuccess: (data: any) => {
                    addFileCourse({
                      id: courseId,
                      data: {
                        files: [{
                          file: data?.data?.result[0]
                        }],
                        sectionSettingId: folderId
                      }
                    },
                    {
                      onSuccess: () => refetchFolderFiles()
                    });
                  },
                  onError: ({ response }: any) => message.error(response?.data?.message, 2)
                });
            }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          <Collapse defaultActiveKey={['1']} ghost bordered={false}>
          <Panel
              header={
                <Divider orientation="left" plain >
                {`${folderName} (${fileList?.length})`}
              </Divider>
              }
              key="1"
            >

                <Row gutter={[10, 50]} >
                  {fileList?.map((file: any) => (
                    <Popover
                      key={file?.path}
                      trigger="click"
                      content={content(file?.name, file?.path)}
                      placement="bottom"
                      overlayClassName="documentPopover"
                      open={!!openPopOver.show && (openPopOver.id === file.path)}
                      onOpenChange={(newOpen) => handleOpenChange(newOpen, file.path)}
                    >
                      <DocumentCard sm={14} xxl={6} xl={8} md={12}>
                        <Col
                          onClick={() => {
                            setOpen(file.uid);
                            setFileName(file?.path);
                          }}
                        >
                          {uploadImgfile(file)}
                          <Col>{file?.name}</Col>
                        </Col>
                      </DocumentCard>
                    </Popover>
                  ))}
                </Row>
            </Panel>
            </Collapse>
                </div>
                  )
                : (
              <Row align="middle" justify="center" style={{ height: 'calc(100vh - 21vh)' }}>
                <Col>
                <Col>
                <NoResult/>
                </Col>
                <Col>No attachments to show.</Col>
                </Col>
                </Row>
                  )
          )}
      <Modal open={opens} onCancel={handleCancel} okText={''} title="Pdf NAme" className="filePreviewModal">
        {viewPdf && (
          <>
            {/* <Viewer
            fileUrl = { viewPdf }
            // plugins={[
            //   defaultLayoutPluginInstance
            // ]}
/> */}
            <iframe src={viewPdf} width={'100%'} height={'500px'} ></iframe>
            {/* <DocViewer */}
            {/*   pluginRenderers={DocViewerRenderers} */}
            {/*   documents={[{ uri: viewPdf }]} */}
            {/*   config={{ */}
            {/*     header: { */}
            {/*       disableHeader: true, */}
            {/*       disableFileName: false, */}
            {/*       retainURLParams: false */}
            {/*     } */}
            {/*   }} */}
            {/*   style={{ height: window.innerHeight - 332 }} */}
            {/* /> */}
          </>
        )}
      </Modal>
    </Result>
  );
};

export default DataResult;