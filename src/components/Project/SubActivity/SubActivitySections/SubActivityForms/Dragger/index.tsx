import React from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import styled from 'styled-components';
import { Col, Typography, UploadProps } from 'antd';

import { ReactComponent as UploadDocument } from '../../../SubActivityIcons/upload-docs.svg';
import {
  IDraggerProps
} from '../../../../../../types/api/activity/subActivity';
import useFileUpload from '../../../../../../api/Activity/SubActivity/useUploadFile';
import useDeleteFile from '../../../../../../api/Files/useDeleteFile';

const AsnDragger = styled(Dragger)`
  background: transparent !important;
  border: 1px dashed var(--dark-border-ultramarine) !important;
  border-radius: 4px;
  .ant-upload {
    padding: 2.4vh 0;
  }
  &:hover {
    border: 1px dashed var(--dark-border-ultramarine);
  }
  h4.ant-typography {
    font-size: var(--headline-font-size) !important;
    color: var(--dark-border-ultramarine) !important;
  }
  svg {
    rect,
    path {
      fill: var(--dark-border-ultramarine) !important;
    }
  }
`;

const DraggerForm: React.FC<IDraggerProps> = ({
  text,
  padding,
  setFileList,
  defaultFileList,
  setDefaultFileList,
  disabled,
  fileList
}) => {
  const { Title } = Typography;
  const { mutate: UploadDoc } = useFileUpload();
  const { mutate: DeleteFile } = useDeleteFile();

  const handleChange: UploadProps['onChange'] = (info) => {
    const newFileList = [...info.fileList];
    setDefaultFileList(newFileList);
  };
  const props: UploadProps = {
    customRequest: (options: any) => {
      const { file, onSuccess, onError: errorStatus } = options;
      UploadDoc(file, {
        onSuccess: (options: any) => {
          const {
            data: { result }
          } = options;
          setFileList((prevState: any) => [...prevState, { url: result[0], id: file.uid }]);
          onSuccess('ok');
        },
        onError: () => errorStatus()
      });
    },
    onRemove: (file) => {
      if (file.originFileObj === undefined) {
        DeleteFile(file.fileName);
      }
      const newFileList = fileList.filter((item: { id: string }) => item.id !== file.uid);
      setFileList([...newFileList]);
      setDefaultFileList((prevState: any) => [
        ...prevState,
        defaultFileList.filter((d: any) => d.uid !== file.uid)
      ]);
    },
    onChange: handleChange,
    name: 'file',
    disabled,
    accept: '.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
  };

  return (
    <Col style={{ padding: padding ?? '0' }}>
      <AsnDragger
        {...props}
        fileList={defaultFileList}
        style={{ width: '100%', height: 'inherit' }}
      >
        <UploadDocument />
        <Title level={4}>{text}</Title>
      </AsnDragger>
    </Col>
  );
};

export default DraggerForm;
