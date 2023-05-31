import React, { useState, useRef, useEffect } from 'react';
import { Button, Space, Divider } from 'antd';
import SignatureCanvas from 'react-signature-canvas';

import { AsnModal } from '../Forms/Modal';
import styled from 'styled-components';
import { AsnButton } from '../Forms/Button';
import { AsnForm } from '../Forms/Form';

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

const Signature: React.FC<{ view?: boolean, url?: string }> = ({
  view,
  url
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);
  const [width, setWidth] = useState(window.innerWidth);

  const form = AsnForm.useFormInstance();
  const sigCanvas = useRef<SignatureCanvas>(null);

  const canvasWidth =
    width < 590 && width > 430
      ? 380
      : width <= 430 && width > 370
        ? 290
        : width <= 370 && width >= 320
          ? 230
          : 470;
  const canvasHeight = width < 470 ? 300 : 500;

  const updateWindowDimensions = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
  }, [width]);

  const showModal = (): void => {
    if (imageURL !== undefined) {
      sigCanvas?.current?.fromDataURL(imageURL);
    }
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const handleClear = (): void => {
    sigCanvas.current?.clear();
    form.setFieldValue('onlineSignaturePath', null);
    form.setFields([
      {
        name: 'onlineSignaturePath',
        errors: []
      }
    ]);
    setImageURL(undefined);
  };

  const handleSave = async (): Promise<void> => {
    if (sigCanvas?.current?.isEmpty() === true) return;
    const dataUrl = sigCanvas?.current?.getTrimmedCanvas().toDataURL();
    form.setFieldValue('onlineSignaturePath', dataUrl);
    form.setFields([
      {
        name: 'onlineSignaturePath',
        errors: []
      }
    ]);
    setImageURL(dataUrl);
  };

  useEffect(() => {
    if (imageURL !== undefined) {
      sigCanvas?.current?.fromDataURL(imageURL);
    }
  }, [imageURL, canvasWidth, canvasHeight]);

  return (
    <Space wrap>
      <Space
        wrap
        onClick={showModal}
        style={{ cursor: 'pointer' }}
        align="start"
      >
        <Button
          type="link"
          style={{
            fontSize: 'var(--base-font-size)',
            color: 'var(--dark-1)',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            fontWeight: 700,
            padding: '4px 15px 4px 0px'
          }}
          disabled={view === true}
        >
          Online signature / Առցանց ստորագրություն
        </Button>
        {imageURL === undefined && (view === false || view === undefined) && (
          <Divider
            type="horizontal"
            orientation={'center'}
            style={{
              width: '180px',
              borderColor: 'var(--dark)',
              margin: '32 0 0 0'
            }}
          />
        )}
      </Space>
      <SignatureModal
        footer={false}
        open={isModalOpen}
        width={'570px'}
        onCancel={() => setIsModalOpen(false)}
      >
        <>
          <SignatureCanvas
            penColor="blue"
            ref={sigCanvas}
            canvasProps={{ width: canvasWidth, height: canvasHeight }}
          />
          <Button
            type="link"
            onClick={handleClear}
            style={{
              fontSize: 'var(--base-font-size)',
              color: 'var(--dark-2)'
            }}
          >
            Clear
          </Button>
        </>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px'
          }}
        >
          <AsnButton className="default" onClick={handleCancel}>
            Cancel
          </AsnButton>
          <AsnButton
            className="primary"
            htmlType="submit"
            onClick={() => {
              void handleSave();
              handleCancel();
            }}
          >
            Save
          </AsnButton>
        </Space>
      </SignatureModal>
      {imageURL !== null && (Boolean(imageURL) || Boolean(url))
        ? (
        <img
          src={imageURL ?? url}
          alt="Signature"
          style={{
            display: 'block',
            margin: '0 auto',
            width: '100px',
            height: '50px'
          }}
        />
          )
        : null}
    </Space>
  );
};

export default Signature;
