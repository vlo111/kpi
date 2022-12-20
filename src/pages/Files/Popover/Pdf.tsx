/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-tabs */

import { Popover, Button } from 'antd';
import {
  CloudDownloadOutlined
} from '@ant-design/icons';

const DocumentViever = () => {
  const onButtonClick = () => {
    fetch('SamplePDF.pdf').then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'SamplePDF.pdf';
        alink.click();
      });
    });
  };
  return (
            <>
                <Button type="link" onClick={onButtonClick} style={{ paddingLeft: '24px' }}>
                <CloudDownloadOutlined/> Download PDF
                </Button>
            </>
  );
};

export default DocumentViever;
