import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import { Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { IFilesPreview } from '../../../../../types/api/activity/subActivity';
const FilesPreviewModal: React.FC<IFilesPreview> = ({
  url,
  setUrl,
  openPreview,
  setOpenPreview
}) => {
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
          {!isVideo && (
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
              style={{ height: window.innerHeight - 170 }}
              key={uuidv4()}
            />
          )}
          {isVideo && <video src={url} controls />}
        </>
      )}
    </Modal>
  );
};

export default FilesPreviewModal;
