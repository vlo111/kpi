import React from 'react';
import { Row, UploadFile, Tabs, Select, Upload } from 'antd';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import AsnPicker from '../../../Picker';
import Duration from '../DurationForm';
import { IAttachmentSetting } from '../../../../types/project';
import { ReactComponent as ArrowSvg } from '../SubActivityIcons/arrow.svg';
import { ReactComponent as UploadDocument } from '../SubActivityIcons/upload-docs.svg';
import { IMultiSections } from '../../../../types/api/activity/subActivity';

const AsnTabs = styled(Tabs)`
&.ant-tabs-card.ant-tabs-top>.ant-tabs-nav .ant-tabs-tab-active{
    border: none !important ;
    border-top: 1px solid var( --dark-border-ultramarine)  !important;
    border-radius: 6px 6px 0px 0px  !important;
    background: var( --white) !important;
}
&.ant-tabs-card.ant-tabs-top>.ant-tabs-nav .ant-tabs-tab{
        background: var( --dark-6);
        border: 1px solid var( --dark-6);
        border-radius: 6px;
}
`;
const AsnRow = styled(Row)`
font-size: var( --base-font-size);
color: var( --dark-2);
`;

const MultiSections: React.FC<IMultiSections> = ({ subActivity, attachments, UploadDoc, setActiveTab, activeTab }) => {
  const form = AsnForm.useFormInstance();

  const { Option } = Select;
  const { Dragger } = Upload;
  const options = ['Active', 'Online', 'Blended'];

  const items = subActivity?.sections?.map((section: { id: string }, i: number) => {
    return {
      label: <AsnRow>{i + 1} Section</AsnRow>,
      key: `${i}`,
      children:
            <AsnForm.List name='sectionsData'>
              {(fields) => (
                <>
                  {fields.map((field) => (
                    (i === field.key) && <div key={i}>
                      <AsnForm.Item
                        name={[i, 'title']}
                        label="Title"
                        rules={[{ required: true, min: 2, max: 45 }]}
                      >
                        <AsnInput />
                      </AsnForm.Item><AsnForm.Item
                        name={[i, 'description']}
                        label="Description"
                        rules={[{ required: true, min: 2, max: 1048 }]}
                      >
                        <AsnInput />
                      </AsnForm.Item>
                      <AsnPicker startDate={[i, 'startDate']} endDate={[i, 'endDate']} /><AsnForm.Item
                        name={[i, 'teaching_mode']}
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
                      </AsnForm.Item><Duration /><AsnForm.Item
                        name={[i, 'partner_organization']}
                        label="Partner organization"
                        rules={[{ required: true, min: 2, max: 256 }]}
                      >
                        <AsnInput />
                      </AsnForm.Item>
                      {attachments?.length > 0 && attachments?.map((item: IAttachmentSetting, j: number) => (
                        <AsnForm.Item
                          key={item?.setting?.id}
                          label={item?.setting?.title}
                          name={[i, `attachment_${j}`]}
                          className="upload_section"
                          rules={[
                            {
                              validator: async (_, file) => {
                                if (isEmpty(file) || file.file.status === 'removed' || file.file.status === 'error') {
                                  return await Promise.reject(new Error('Please enter valid Document'));
                                }
                              }
                            }
                          ]}
                          validateTrigger={['onChange', 'onBlur']}
                        >
                          <Dragger
                            maxCount={1}
                            customRequest={(options: any) => {
                              const { file, onSuccess: successStatus, onError: errorStatus } = options;
                              UploadDoc({ file, type: 'COURSE_INFO' }, {
                                onSuccess: (response: any) => {
                                  successStatus();
                                  const url = response.data.result[0];
                                  const files = form.getFieldValue(['sectionsData', i, 'files']);
                                  const removeDoubleFiles = files.filter((file: { name: string }) => file.name !== `attachment_${j}`);
                                  form.setFieldValue(['sectionsData', i, 'files'], [...removeDoubleFiles, { url, id: file.uid, name: `attachment_${j}`, keyName: item?.setting?.title }]);
                                },
                                onError: () => errorStatus()
                              });
                            }}
                            onRemove={(file: UploadFile) => {
                              const files = form.getFieldValue(['sectionsData', i, 'files']);
                              const filteredFiles = files.filter((item: { id: string }) => item.id !== file.uid);
                              form.setFieldValue(['sectionsData', i, 'files'], [...filteredFiles]);
                            }}
                            name={'uploadFile'}
                            accept={'.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'}
                          >
                            <UploadDocument />
                            <p>File/Documents</p>
                          </Dragger>
                        </AsnForm.Item>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </AsnForm.List>
    };
  });

  return (
        <AsnTabs
        type="card"
        items={items}
        activeKey={activeTab}
        onChange={(activeKey) => setActiveTab(activeKey)}
      />
  );
};

export default MultiSections;
