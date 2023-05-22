import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import FileViewer from 'react-file-viewer';
import { Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { IFilesPreview } from '../../../../../types/api/activity/subActivity';

const FilesPreviewModal: React.FC<IFilesPreview> = ({ url, setUrl, openPreview, setOpenPreview }) => {
  const getFileExtension = (fileName: string): string => {
    if (fileName == null) {
      return '';
    }
    return fileName
      .slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
      .toLowerCase();
  };

  const fileExtension = getFileExtension(url as string);
  const isVideo = ['mp4', 'avi', 'flv', 'ogv'].includes(fileExtension);

  const handleCancel = (): void => {
    setOpenPreview(false);
    setUrl('');
  };

  return (
        <Modal
            open={openPreview}
            onCancel={handleCancel}
            okText={''}
            className="filePreviewModal"
        >
            {url !== null && (
                <>
                    {fileExtension === 'doc' && (
                        <FileViewer fileType="doc" filePath={url} />
                    )}
                    {fileExtension === 'docx' && (
                        <FileViewer fileType="docx" filePath={url} />
                    )}
                    {fileExtension === 'png' && (
                        <FileViewer fileType="png" filePath={url} />
                    )}
                    {fileExtension === 'pdf' && (
                        <DocViewer
                            documents={[{ uri: url }]}
                            pluginRenderers={DocViewerRenderers}
                            config={{
                              header: {
                                disableHeader: false,
                                disableFileName: false,
                                retainURLParams: false
                              }
                            }}
                            style={{ height: window.innerHeight - 125 }}
                            key={uuidv4()}
                        />
                    )}
                    {isVideo && <video src={url} controls />}
                    {fileExtension === 'xlsx' && (
                        <DocViewer
                            documents={[{ uri: url }]}
                            pluginRenderers={DocViewerRenderers}
                            config={{
                              header: {
                                disableHeader: false,
                                disableFileName: false,
                                retainURLParams: false
                              }
                            }}
                            style={{ height: window.innerHeight - 125 }}
                            key={uuidv4()}
                        />
                    )}
                </>
            )}
        </Modal>
  );
};

export default FilesPreviewModal;
