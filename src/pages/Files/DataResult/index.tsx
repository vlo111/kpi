import React, { useState } from 'react';
import { Collapse, Modal, Row, Divider, Pagination, Space } from 'antd';
import styled from 'styled-components';

import NoAttachments from '../NoAttachments';
import FileUpload from '../Upload';
import CourseFiles from '../CourseFiles';
import ResultWrapper from '../ResultWrapper';
import AsnSpin from '../../../components/Forms/Spin';
import { IDataResult } from '../../../types/files';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { Void } from '../../../types/global';
import FileViewer from "react-file-viewer";
const Result = styled.div`
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    align-items: center;
  }
  .ant-divider {
    span {
      font-size: var(--base-font-size);
      color: var(--dark-2);
    }
  }
`;

const AsnPagination = styled(Pagination)`
  .ant-pagination-item-link {
    border: none !important;
  }
  .ant-pagination-item {
    border: none;
  }
  .ant-pagination-item-active {
    border-radius: 100%;
    background: var(--background-active-pagination);
  }
  .ant-pagination-item-active a {
    color: var(--active-pagination);
  }
`;

const DataResult: React.FC<IDataResult> = ({
  fileList,
  onRemoveFile,
  courseId,
  refetch,
  isFetchingFolderFiles,
  folderId,
  folderName,
  setFolderId,
  setFolderName,
  refetchFolderFiles,
  isFetchingAllFilesSearch,
  isFetchingSearchCourseFiles,
  setPaginate,
  filesCount,
  refetchAllFiles,
  setSearchPaginate,
  search,
  allFilesSearchCount,
  currentPage,
  searchCurrentPage,
  isFetchingAllFiles,
  isFetchingCourseFiles
}) => {
  const [fileName, setFileName] = useState('');
  const [viewPdf, setViewPdf] = useState<any>(null);
  const [opens, setOpens] = useState<boolean>(false);

  const handlePagination = (page: number): void => {
    search.length > 2
      ? setSearchPaginate({
        offset: page === 1 ? 0 : (page - 1) * 24,
        limit: 24,
        currentPage: page
      })
      : setPaginate({
        offset: page === 1 ? 0 : (page - 1) * 24,
        limit: 24,
        currentPage: page
      });
  };
  const handleCancel: Void = () => {
    setOpens(false);
    void refetchAllFiles();
  };

  const handleCourseFileClick = (path: string): void => {
    setFileName(path);
  };
  const handleFolderFileClick = (title: string, id: string): void => {
    setFolderName(title);
    setFolderId(id);
  };

  const { Panel } = Collapse;
  if (
    isFetchingFolderFiles ||
    isFetchingSearchCourseFiles ||
    isFetchingAllFilesSearch ||
    isFetchingAllFiles ||
    isFetchingCourseFiles
  ) {
    return <AsnSpin />;
  }


  const getFileExtension = (fileName: string) => {
    if (!fileName) {
      return "";
    }
    return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
  };

  const fileExtension = getFileExtension(viewPdf);

  const isVideo = ["mp4", "avi", "flv", "ogv"].includes(fileExtension);

  return (
    <Result>
      {Boolean(fileList?.folders) && Boolean(fileList?.files)
        ? (
        <CourseFiles
          fileList={fileList}
          onRemoveFile={onRemoveFile}
          setOpens={setOpens}
          setViewPdf={setViewPdf}
          fileName={fileName}
          handleFileClick={handleCourseFileClick}
          handleFolderFileClick={handleFolderFileClick}
          courseId={courseId}
          refetch={refetch}
          refetchAllFiles={refetchAllFiles}
        />
          )
        : fileList?.length > 0 && folderId === ''
          ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <ResultWrapper
            files={fileList}
            onRemoveFile={onRemoveFile}
            setOpens={setOpens}
            setViewPdf={setViewPdf}
            fileName={fileName}
            handleFileClick={handleCourseFileClick}
            all={true}
          />
          <Row
            justify="center"
            style={{
              paddingBottom: '10px',
              position: 'absolute',
              bottom: 0,
              width: '100%'
            }}
          >
            <AsnPagination
              showSizeChanger={false}
              current={search.length > 2 ? searchCurrentPage : currentPage}
              pageSize={24}
              total={
                search.length > 2
                  ? Number(allFilesSearchCount)
                  : Number(filesCount)
              }
              onChange={handlePagination}
            />
          </Row>
        </Space>
            )
          : fileList?.length >= 0 && folderId !== ''
            ? (
        <div>
          <FileUpload
            type={'SECTION_SETTING_DOCUMENT'}
            courseId={courseId}
            folderId={folderId}
            refetchFolderFiles={refetchFolderFiles}
            refetch={refetch}
            refetchAllFiles={refetchAllFiles}
            folder={true}
          />
          <Collapse defaultActiveKey={['1']} ghost bordered={false}>
            <Panel
              header={
                <Divider orientation="left" plain>
                  {`${folderName} (${+fileList?.length})`}
                </Divider>
              }
              key="1"
            >
              <ResultWrapper
                files={fileList}
                onRemoveFile={onRemoveFile}
                setOpens={setOpens}
                setViewPdf={setViewPdf}
                fileName={fileName}
                handleFileClick={handleCourseFileClick}
                all={true}
              />
            </Panel>
          </Collapse>
        </div>
              )
            : (
        <NoAttachments />
              )}      
      <Modal
        open={opens}
        onCancel={handleCancel}
        okText={''}
        className="filePreviewModal"
      >
        {viewPdf !== null && (
          <>
             {fileExtension === "doc" && (
        <FileViewer fileType="doc" filePath={viewPdf} />
      )}
      {fileExtension === "docx" && (
        <FileViewer fileType="docx" filePath={viewPdf} />
      )}
       {fileExtension === "png" && (
        <FileViewer fileType="png" filePath={viewPdf} />
      )}
      {fileExtension === "pdf" && (
        <FileViewer fileType="pdf" filePath={viewPdf} />
      )}
      {isVideo && (
        <video src={viewPdf} controls />
      )}
      {fileExtension === "xlsx" && (
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
    </Result>
  );
};

export default DataResult;
