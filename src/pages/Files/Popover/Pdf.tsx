import React from 'react';
import { Button, message } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { DownloadDocument } from '../../../types/files';

const DocumentDonload: React.FC<DownloadDocument> = ({ name, path, hide }) => {
  const onButtonClick: any = async () => {
    await fetch(path)
      .then(async (resp) => await resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = url;
        aLink.download = name;
        document.body.appendChild(aLink);
        aLink.click();
        window.URL.revokeObjectURL(url);
        hide();
      })
      .catch(() => message.error('Something went wrong !!', 2));
  };

  return (
    <Button
      type="link"
      onClick={() => {
        onButtonClick();
      }}
      style={{ paddingLeft: '24px' }}
    >
      <CloudDownloadOutlined /> Download
    </Button>
  );
};

export default DocumentDonload;
