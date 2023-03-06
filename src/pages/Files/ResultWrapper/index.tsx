import React, { ReactElement, useState } from 'react';
import { Row, Popover, Col, Button, Tooltip, Typography } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import DocumentDonload from '../Popover/Pdf';

import { IResultWrapper, IFiles } from '../../../types/files';
import { ReactComponent as ImgSvg } from '../UploadImg/upload-img.svg';
import { ReactComponent as PdfSvg } from '../UploadImg/pdf.svg';
import { ReactComponent as ExcelSvg } from '../UploadImg/excel.svg';
import { ReactComponent as WordSvg } from '../UploadImg/word.svg';
import { ReactComponent as DocumentSvg } from '../UploadImg/document.svg';

const DocumentCard = styled(Col)`
  .ant-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-wrap: anywhere;
  }
`;
const { Paragraph } = Typography;
const ResultWrapper: React.FC<IResultWrapper> = ({ files, onRemoveFile, setOpens, setViewPdf, fileName, handleFileClick, all }) => {
  const [openPopOver, setOpenPopOver] = useState<{ id: string, show: boolean }>({
    id: '',
    show: false
  });

  const uploadImgfile = (file: IFiles): ReactElement | undefined => {
    const ext = file.name?.split('.').pop();
    if (ext !== undefined) {
      const isImg = ['png', 'jpg', 'jpeg', 'gif', 'svg'].find(
        (p) => p.toLocaleLowerCase() === ext.toLocaleLowerCase()
      );
      if (isImg !== undefined) {
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

  const preview = (name: string): void => {
    setOpens(true);
    setViewPdf(name);
  };

  const content = (name: string, path: string): ReactElement => {
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
        }}>
          {' '}
          <DeleteOutlined />
          delete
        </Button>
        <DocumentDonload hide={hide} name={name} path={path} />
      </>
    );
  };

  return (
    <Row gutter={[10, 50]} style={all ? { overflow: 'auto', width: '100%', padding: '30px 0', background: 'white' } : {}} >
      {files?.map((file) => (
        <Popover
          key={file?.path}
          trigger="click"
          content={() => content(file?.name, file?.path)}
          placement="bottom"
          overlayClassName="documentPopover"
          open={!!openPopOver.show && (openPopOver.id === file.path)}
          onOpenChange={(newOpen) => handleOpenChange(newOpen, file.path)}
          getPopupContainer={(trigger: HTMLElement) => trigger.parentElement as HTMLElement}
        >
          <DocumentCard sm={14} xxl={6} xl={8} md={12}>
            <Col
              onClick={() => handleFileClick(file?.path)}
            >
              {uploadImgfile(file)}
              <Col style={{ cursor: 'pointer' }}>
              <Tooltip title={file?.originalName}>
                        <Paragraph
                          strong
                          ellipsis={{
                            rows: 1
                          }}
                          style={{ width: '120px' }}
                        >
                          {file?.originalName}
                        </Paragraph>
                      </Tooltip>
              </Col>
            </Col>
          </DocumentCard>
        </Popover>
      ))}
    </Row>
  );
};

export default ResultWrapper;
