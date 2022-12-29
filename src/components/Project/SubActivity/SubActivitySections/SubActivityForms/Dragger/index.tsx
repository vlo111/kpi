import React from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import styled from 'styled-components';
import { Col, Typography, UploadProps } from 'antd';

import { ReactComponent as UploadDocument } from '../../../../../../assets/icons/upload-docs.svg';
import { IDraggerProps } from '../../../../../../types/subActivity';
import useFileUpload from '../../../../../../api/Activity/SubActivity/useUploadFile';

const AsnDragger = styled(Dragger)`
  .ant-upload {
    padding: 2.4vh 0;
  }
  &:hover {
    border: 1px dashed var(--dark-border-ultramarine);
  }
  background: transparent !important;
  border: 1px dashed var(--dark-border-ultramarine) !important;
  border-radius: 4px;
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

const DraggerForm: React.FC<IDraggerProps> = ({ text, padding }) => {
  const { Title } = Typography;
  const { mutate: UploadDoc } = useFileUpload({
    onSuccess: (options: any) => {
      const {
        data: { result }
      } = options;
      console.log(result);
    }
  });
  const props: UploadProps = {
    customRequest: (options: { file: any }) => {
      const { file } = options;
      UploadDoc(file);
      console.log(file, 'options', options);
    },
    name: 'file',
    accept: '.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
  };
  return (
    <Col style={{ padding: padding ?? '0' }}>
      <AsnDragger
        {...props}
        style={{ width: '100%', height: 'inherit' }}
      >
        <UploadDocument />
        <Title level={4}>{text}</Title>
      </AsnDragger>
    </Col>
  );
};

export default DraggerForm;
