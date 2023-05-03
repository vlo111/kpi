import React, { useState, useRef } from 'react';
import { Button, Space, message, Divider } from 'antd';
import SignatureCanvas from 'react-signature-canvas';

import { AsnModal } from '../Forms/Modal';
import styled from 'styled-components';
import { AsnButton } from '../Forms/Button';
import { AsnForm } from '../Forms/Form';
import userImageUpload from '../../api/UserProfile/useUserImageUpload';
import _ from 'lodash';

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

const Signature: React.FC<{ view?: boolean, url?: string }> = ({ view, url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState<string | undefined>(undefined);

  const form = AsnForm.useFormInstance();
  const { mutate: uploadImage } = userImageUpload();

  const showModal = (): void => {
    return setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const sigCanvas = useRef<SignatureCanvas>(null);

  const handleClear = (): void => {
    sigCanvas.current?.clear();
  };

  const handleSave = async (): Promise<void> => {
    if ((sigCanvas?.current?.isEmpty()) === true) return;
    const dataUrl = sigCanvas?.current?.getTrimmedCanvas().toDataURL();
    const blob = await fetch(dataUrl as string)
      .then(async res => await res.blob())
      .catch(err => console.log(err));
    const file = new File([blob as Blob], 'signature.png', { type: 'image/png' });
    uploadImage(file, {
      onSuccess: (data) => {
        if (!_.isEmpty(data)) {
          const newData = (data as { data: { result: string[] } }).data.result;
          if (newData?.length > 0) {
            form.setFieldValue('onlineSignaturePath', newData[0]);
            form.setFields([
              {
                name: 'onlineSignaturePath',
                errors: []
              }
            ]);
          }
        }
      },
      onError: () => {
        void message.error('Something went wrong, Please enter online signature again', 2);
      }
    });
    setImageURL(dataUrl);
  };

  return (
    <Space wrap>
      <Space wrap onClick={showModal} style={{ cursor: 'pointer' }} align='start'>
        <Button
          type="link"
          style={{
            fontSize: 'var(--base-font-size)',
            color: 'var(--dark-1)',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            fontWeight: 700
          }}
          disabled={view === true}
        >
          Online signature / Առցանց ստորագրություն
        </Button>
        {imageURL === undefined && <Divider
          type='horizontal'
          orientation={'center'}
          style={{
            width: '180px',
            borderColor: 'var(--dark)',
            margin: '32 0 0 0'
          }}
        />}
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
            canvasProps={{ width: 470, height: 500 }}
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
