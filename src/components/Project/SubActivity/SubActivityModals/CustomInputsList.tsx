import React from 'react';
import { Select, Upload } from 'antd';

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
                            {
                              validator: async (_, file) => {
                                if (
                                  (file?.file?.status === 'removed' ||
                                    file?.file?.status === 'error') &&
                                  item?.active
                                ) {
                                  return await Promise.reject(
                                    new Error('Please enter valid Document')
                                  );
                                }
                              }
                            },
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
                                        name: file.name,
                                        type: url,
                                        keyName: item?.setting?.title
                                      }
                                    ];
                                    form.setFieldValue(
                                      [
                                        'sectionsData',
                                        name[0],
                                        name[1],
                                        input.name,
                                        'ATTACHMENT'
                                      ],
                                      [...uploadedFile]
                                    );
                                  },
                                  onError: () => errorStatus()
                                }
                              );
                            }}
                            onChange={(info) => {
                              if (info.file.originFileObj === undefined && info.file.status === 'removed') {
                                form.setFieldValue(
                                  [
                                    'sectionsData',
                                    name[0],
                                    name[1],
                                    input.name,
                                    'ATTACHMENT'
                                  ],
                                  undefined
                                );
                              }
                            }}
                            defaultFileList={form.getFieldValue([
                              'sectionsData',
                              name[0],
                              name[1],
                              input.name,
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
