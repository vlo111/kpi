import React from 'react';
import { Select, Upload, UploadFile } from 'antd';

import { ReactComponent as UploadDocument } from '../SubActivityIcons/upload-docs.svg';
import { ReactComponent as ArrowSvg } from '../SubActivityIcons/arrow.svg';
import { ICustomInputs } from '../../../../types/api/activity/subActivity';
import { IAttachmentSetting } from '../../../../types/project';
import { AsnForm } from '../../../Forms/Form';
import { AsnInput, AsnInputNumber } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';

const CustomInputs: React.FC<ICustomInputs> = ({
  name,
  attachments,
  UploadDoc
}) => {
  const form = AsnForm.useFormInstance();

  const { Option } = Select;
  const { Dragger } = Upload;

  return (
    <AsnForm.List name={name}>
      {(customInputs) =>
        customInputs.map((input, index: number) => (
          <div key={index}>
            {attachments?.length > 0 &&
              attachments?.map(
                (item: IAttachmentSetting, j: number) =>
                  j === input.key && (
                    <div key={index}>
                      {item?.setting?.answerType === 'ATTACHMENT' && (
                        <AsnForm.Item
                          name={[input.name, 'ATTACHMENT']}
                          label={item?.setting?.title}
                          className="upload_section"
                          key={item?.setting?.id}
                          rules={[
                            { required: item?.active }
                          ]}
                          validateTrigger={['onChange', 'onBlur']}
                        >
                          <Dragger
                            maxCount={1}
                            customRequest={(options: any) => {
                              const {
                                file,
                                onSuccess: successStatus,
                                onError: errorStatus
                              } = options;
                              UploadDoc(
                                { file, type: 'COURSE_INFO' },
                                {
                                  onSuccess: (response: any) => {
                                    successStatus();
                                    const url = response.data.result[0];
                                    const uploadedFile = [
                                      {
                                        id: file.uid,
                                        name: url,
                                        keyName: item?.setting?.title
                                      }
                                    ];
                                    const value = form.getFieldValue(input.key);
                                    console.log(value, 'value');

                                    form.setFieldValue(
                                      ['customInputs', j, 'ATTACHMENT'],
                                      [uploadedFile]
                                    );
                                  },
                                  onError: () => errorStatus()
                                }
                              );
                            }}
                            onRemove={(file: UploadFile) => {
                              const files = form.getFieldValue([
                                'customInputs',
                                j,
                                'ATTACHMENT'
                              ]);
                              const filteredFiles = files.filter(
                                (item: { id: string }) => item.id !== file.uid
                              );
                              form.setFieldValue(
                                ['customInputs', j, 'ATTACHMENT'],
                                [...filteredFiles]
                              );
                            }}
                            defaultFileList={form.getFieldValue([
                              'customInputs',
                              j,
                              'ATTACHMENT'
                            ])}
                            name={'uploadFile'}
                            accept={
                              '.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
                            }
                          >
                            <UploadDocument />
                            <p>File/Documents</p>
                          </Dragger>
                        </AsnForm.Item>
                      )}
                      {item?.setting?.answerType === 'SHORT_TEXT' && (
                        <AsnForm.Item
                          name={[input.name, 'SHORT_TEXT']}
                          label={item?.setting?.title}
                          key={item?.setting.id}
                          rules={[{ required: item?.active }]}
                        >
                          <AsnInput />
                        </AsnForm.Item>
                      )}
                      {item?.setting?.answerType === 'NUMBER' && (
                        <AsnForm.Item
                          name={[input.name, 'NUMBER']}
                          label={item?.setting?.title}
                          key={item?.setting.id}
                          rules={[{ required: item?.active }]}
                        >
                          <AsnInputNumber
                            className="primary input_number_custom"
                            style={{ width: '100%' }}
                          />
                        </AsnForm.Item>
                      )}
                      {item?.setting?.answerType === 'DROPDOWN' && (
                        <AsnForm.Item
                          name={[input.name, 'DROPDOWN']}
                          label={item?.setting?.title}
                          key={item?.setting.id}
                          rules={[{ required: item?.active }]}
                        >
                          <AsnSelect suffixIcon={<ArrowSvg />}>
                            {item?.setting?.data?.map((i) => (
                              <Option key={i} value={i}>
                                {i}
                              </Option>
                            ))}
                          </AsnSelect>
                        </AsnForm.Item>
                      )}
                      {item?.setting?.title === 'Partner Organization' && (
                        <AsnForm.Item
                          name={[input.name, 'partner_organization']}
                          label="Partner Organization"
                          rules={[
                            {
                              required: item?.active,
                              min: 2,
                              max: 256
                            }
                          ]}
                        >
                          <AsnInput />
                        </AsnForm.Item>
                      )}
                    </div>
                  )
              )}
          </div>
        ))
      }
    </AsnForm.List>
  );
};

export default CustomInputs;
