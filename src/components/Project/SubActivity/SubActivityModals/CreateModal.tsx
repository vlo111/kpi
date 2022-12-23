import React from 'react';
import { Avatar, Col, Image, Row, Select, Upload } from 'antd';

import { AsnButton } from '../../../Forms/Button';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import { ReactComponent as ArrowSvg } from '../../../../assets/icons/arrow.svg';
import { ReactComponent as UploadDocument } from '../../../../assets/icons/upload-docs.svg';
import Duration from '../DurationForm';
import { CreateSubActivity } from './CreateModalStyles';
import { VALIDATE_MESSAGES } from '../../../../helpers/constants';
import AsnPicker from '../../../Picker';

const CreateSubActivityModal: React.FC<{}> = () => {
  const [form] = AsnForm.useForm();
  const handleOk = (values: any): void => {
    console.log(values);
  };

  const initialValues = {
    duration_technical_number: 18,
    duration_soft_number: 18,
    duration: 36
  };

  const options = ['Active', 'Online', 'Blended'];

  const { Option } = Select;
  const { Dragger } = Upload;
  return (
    <CreateSubActivity
      open={true}
      width={'614px'}
      title="Add Sub-Activity"
      footer={[
        <Row key={'action'} gutter={14} justify="center">
          <Col span={7}>
            <Row justify="start">
              <AsnButton className="default" key="back">
                Cancel
              </AsnButton>
            </Row>
          </Col>
          <Col span={7}>
            <Row justify="end">
              <AsnButton
                form="SubActivityForm"
                key="submit"
                type="primary"
                className="primary"
                htmlType="submit"
              >
                {/* { false ? 'Edit' : 'Add'} */}
                Add
              </AsnButton>
            </Row>
          </Col>
        </Row>
      ]}
    >
      <AsnForm
        form={form}
        layout="vertical"
        name="SubActivityForm"
        validateMessages={VALIDATE_MESSAGES}
        onFinish={handleOk}
        initialValues={initialValues}
        // fields={fields}
      >
        <AsnForm.Item
          name="title"
          label="Title"
          rules={[{ required: true, min: 2, max: 45 }]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          name="organization"
          label="Organization"
          rules={[{ required: true }]}
        >
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {options.map((i) => (
              <Option key={i} value={i}>
                {i}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        <AsnForm.Item
          name="description"
          label="Description"
          rules={[{ required: true, min: 2, max: 1048 }]}
        >
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item
          name="sub_activity_manager"
          label="Sub-Activity Manager"
          rules={[{ required: false }]}
        >
          <Row justify="start" align="middle" style={{ padding: '4px 11px' }}>
            <Col>
              <Avatar
                style={{ width: '100%', display: 'flex', alignItems: 'center' }}
                src={
                  <Image
                    preview={false}
                    src="https://joeschmoe.io/api/v1/random"
                    style={{ width: 24, height: 24, borderRadius: '50%' }}
                  />
                }
              />
            </Col>
            <Col style={{ marginLeft: '8px' }}>Ani Hovhannisyan</Col>
          </Row>
        </AsnForm.Item>
        <AsnForm.Item name="region" label="Region" rules={[{ required: true }]}>
          <AsnSelect suffixIcon={<ArrowSvg />}>
            {options.map((i) => (
              <Option key={i} value={i}>
                {i}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        <AsnPicker />
        <AsnForm.Item
          name="teaching_mode"
          label="Teaching Mode"
          rules={[{ required: true }]}
        >
          <AsnSelect
            suffixIcon={<ArrowSvg />}
            popupClassName="customPopupSelect"
          >
            {options.map((i) => (
              <Option key={i} value={i}>
                {i}
              </Option>
            ))}
          </AsnSelect>
        </AsnForm.Item>
        <Duration />
        <AsnForm.Item
          name="partner_organization"
          label="Partner organization"
          rules={[{ required: true, min: 2, max: 256 }]}
        >
          <AsnInput />
        </AsnForm.Item>
        {false && (
          <AsnForm.Item
            name="Attach your CV"
            label="Attach your CV"
            className="upload_section"
          >
            <Dragger
              name="uploadFile"
              multiple
              beforeUpload={() => false}
              accept=".doc,.docx"
            >
              <UploadDocument />
              <p>File/Documents</p>
            </Dragger>
          </AsnForm.Item>
        )}
      </AsnForm>
    </CreateSubActivity>
  );
};

export default CreateSubActivityModal;
