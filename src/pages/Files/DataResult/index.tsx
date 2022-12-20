import React from 'react';
import { ReactComponent as PdfSvg } from '../UploadImg/pdf.svg';
import { ReactComponent as ExcelSvg } from '../UploadImg/excel.svg';
import { ReactComponent as WordSvg } from '../UploadImg/word.svg';
import { ReactComponent as DocumentSvg } from '../UploadImg/document.svg';
import { ReactComponent as ImgSvg } from '../UploadImg/upload-img.svg';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { IDataResult } from '../../../types/folder';

import { Button, Col, Popover, Row, UploadFile } from 'antd';
import App from '../Popover/Pdf';
import styled from 'styled-components';

const DocumentCard = styled(Col)`
  .ant-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-wrap: anywhere;

  }
`;

const DataResult: React.FC<IDataResult> = ({
  fileList,
  setOpen,
  open,
  onRemoveFile
}) => {
  const uploadImgfile = (file: UploadFile | any): any => {
    console.log(file);

    const ext = file.name.split('.').pop();
    const isImg = ['png', 'jpg', 'jfif', 'jpeg', 'gif', 'svg'].find(
      (p) => p.toLocaleLowerCase() === ext.toLocaleLowerCase()
    );
    if (isImg != null) {
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
  };
  const content = (
    <>
      <Button type="link">
        {' '}
        <EyeOutlined />
        preview
      </Button>
      <Button type="link" onClick={() => onRemoveFile(open)}>
        {' '}
        <DeleteOutlined />
        delete
      </Button>
     <App />
    </>
  );

  return (
    <>
      {fileList.length > 0 && (
        <>
          <Row gutter={[10, 50]} style={{ width: '100%' }}>
            {fileList.map((doc) => (
              <Popover
                key={doc.uid}
                trigger="click"
                content={content}
                placement="bottom"
                overlayClassName="documentPopover"
              >
                <DocumentCard sm={14} xxl={6} xl={8} md={12}>
                  <Col onClick={() => setOpen(doc.uid)}>
                    {uploadImgfile(doc)}
                    <Col>{doc.name}</Col>
                  </Col>
                </DocumentCard>
              </Popover>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default DataResult;
