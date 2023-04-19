import React from 'react';
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { DownloadDocument } from '../../../types/files';

const DocumentDonload: React.FC<DownloadDocument> = ({ name, path, hide }) => {
  const onButtonClick: any = async () => {
    return (
      await fetch(name).then((response: { blob: () => Promise<any> }) => {
        void response.blob().then(() => {
          const alink = document.createElement('a');
          alink.href = path;
          alink.download = name;
          alink.click();
        });
        hide();
      }));
  };

  return (
                <Button type="link" onClick={() => { onButtonClick(); }}style={{ paddingLeft: '24px' }}>
              <CloudDownloadOutlined/> Download
              </Button>
  );
};

export default DocumentDonload;
