import React from 'react';
import { Collapse, Divider, Row, Col } from 'antd';
import styled from 'styled-components';

import FileUpload from '../Upload';
import { ICourseFilesProps } from '../../../types/files';
import ResultWrapper from '../ResultWrapper';
import { ReactComponent as Folder } from '../UploadImg/folder.svg';

const { Panel } = Collapse;

const DocumentCard = styled(Col)`
  .ant-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-wrap: anywhere;
  }
`;

const CourseFiles: React.FC<ICourseFilesProps> = ({
  fileList,
  onRemoveFile,
  setOpens,
  setViewPdf,
  fileName,
  handleFileClick,
  handleFolderFileClick,
  courseId,
  refetch,
  refetchAllFiles
}) => {
  return (
        <div style={{ overflow: 'auto', width: '100%', padding: '30px 0', background: 'var(--white)' }}>
            <FileUpload
                courseId={courseId}
                refetch={refetch}
                refetchAllFiles={refetchAllFiles}
                type={'GENERAL_DOCUMENT'}
            />
            <Collapse defaultActiveKey={['1']} ghost bordered={false}>
                <Panel
                    header={
                        <Divider orientation="left" plain >
                            {`Required documents (${+fileList?.files?.REQUIRED_DOCUMENT.length})`}
                        </Divider>
                    }
                    key="1"
                >
                    {fileList?.files?.REQUIRED_DOCUMENT.length > 0 && (
                        <ResultWrapper
                            files={fileList?.files?.REQUIRED_DOCUMENT}
                            onRemoveFile={onRemoveFile}
                            setOpens={setOpens}
                            setViewPdf={setViewPdf}
                            fileName={fileName}
                            handleFileClick={handleFileClick}
                            all={false}
                        />
                    )}
                </Panel>
                <Panel
                    header={
                        <Divider orientation="left" plain>
                            {`General documents (${+fileList?.files?.GENERAL_DOCUMENT.length})`}
                        </Divider>
                    }
                    key="2"
                >
                    {fileList?.files?.GENERAL_DOCUMENT.length > 0 && (
                        <ResultWrapper
                            files={fileList?.files?.GENERAL_DOCUMENT}
                            onRemoveFile={onRemoveFile}
                            setOpens={setOpens}
                            setViewPdf={setViewPdf}
                            fileName={fileName}
                            handleFileClick={handleFileClick}
                            all={false}
                        />
                    )}
                </Panel>
                <Panel
                    header={
                        <Divider orientation="left" plain>
                            {`Status folders (${+fileList?.folders.length})`}
                        </Divider>
                    }
                    key="3"
                >
                    {fileList?.folders?.length > 0 && (
                        <Row gutter={[10, 50]}>
                            {fileList?.folders?.map((folder) => (
                                <DocumentCard key={folder.id} sm={14} xxl={6} xl={8} md={12}>
                                    <Col>
                                        <Col style={{ cursor: 'pointer' }} onClick={() => handleFolderFileClick(folder?.title, folder?.id)}>
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
  );
};

export default CourseFiles;
