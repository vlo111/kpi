import React, { useState, useRef } from 'react';
import { Button, Space } from 'antd';
import SignaturePad from 'react-signature-canvas';

import { AsnModal } from '../Forms/Modal';
import styled from 'styled-components';
import { AsnButton } from '../Forms/Button';

const SignatureModal = styled(AsnModal)`
  .ant-modal-content {
    padding: 48px;
  }

  .ant-modal-header {
    text-align: start;
    padding-bottom: 1vh;

    .ant-modal-title {
      color: var(--dark-border-ultramarine) !important;
    }
  }

  .active {
    background-color: var(--primary-light-1);
  }

  .users_list_content {
    width: 100%;
    box-shadow: 4px 4px 4px rgb(42 85 120 / 20%),
      -4px -4px 4px rgb(42 85 120 / 10%);
    padding: 16px;
    min-height: 226px;
    overflow-y: auto;
    max-height: 226px;
  }

  .ant-row {
    font-size: var(--base-font-size);
    color: var(--dark-2);
    &:hover {
      cursor: pointer;
    }
  }
`;

const Signature: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (): void => {
    return setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef<any>({});

  const clear = (): void => sigCanvas.current.clear();

  const save = (): void =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  return (
    <Space direction="horizontal">
      <Button type="link" onClick={showModal} style={{
        fontSize: 'var(--base-font-size)',
        color: 'var(--dark-1)',
        fontWeight: 700
      }}>
      Online signature / Առցանց ստորագրություն
      </Button>
      <SignatureModal
      footer={false}
      open={isModalOpen}
      width={'570px'}
      onCancel={() => setIsModalOpen(false)}
       >
          <>
            <SignaturePad
              penColor="blue"
              ref={sigCanvas}
              canvasProps={{ width: 470, height: 500 }}
            />
            <Button type="link" onClick={clear} style={{
              fontSize: 'var(--base-font-size)',
              color: 'var(--dark-2)'
            }}>Clear</Button>
          </>
          <Space
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px'
          }}>
        <AsnButton className="default" onClick={handleCancel}>
          Cancel
        </AsnButton>
        <AsnButton
          className="primary"
          htmlType="submit"
          onClick={() => {
            save();
            handleCancel();
          }}
        >
          Save
        </AsnButton>
      </Space>
      </SignatureModal>
      { (imageURL !== null && Boolean(imageURL))
        ? (
        <img
          src={imageURL}
          alt="Signature"
          style={{
            display: 'block',
            margin: '0 auto',
            width: '200px',
            height: '100px'
          }}
        />
          )
        : null}
    </Space>
  );
};

export default Signature;
