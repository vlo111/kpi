import React from 'react';
import { Row, Tabs, Select } from 'antd';
import styled from 'styled-components';

import { AsnForm } from '../../../Forms/Form';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import AsnPicker from '../../../Picker';
import Duration from '../DurationForm';
import { ReactComponent as ArrowSvg } from '../SubActivityIcons/arrow.svg';
import { IMultiSections } from '../../../../types/api/activity/subActivity';
import CustomInputs from './CustomInputsList';

const AsnTabs = styled(Tabs)`
  &.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab-active {
    border: none !important ;
    border-top: 1px solid var(--dark-border-ultramarine) !important;
    border-radius: 6px 6px 0px 0px !important;
    background: var(--white) !important;
  }
  &.ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
    background: var(--dark-6);
    border: 1px solid var(--dark-6);
    border-radius: 6px;
  }
`;
const AsnRow = styled(Row)`
  font-size: var(--base-font-size);
  color: var(--dark-2);
`;

const MultiSections: React.FC<IMultiSections> = ({
  sectionsCount,
  attachments,
  UploadDoc,
  setActiveTab,
  activeTab
}) => {
  const { Option } = Select;
  const options = ['Offline', 'Online', 'Blended'];

  const items = new Array(sectionsCount).fill(null).map((_, i) => {
    return {
      label: <AsnRow>{i + 1} Section</AsnRow>,
      key: `${i}`,
      children: (
        <AsnForm.List name="sectionsData">
          {(fields) => (
            <>
              {fields.map(
                (field) =>
                  i === field.key && (
                    <div key={i}>
                      <AsnForm.Item
                        name={[i, 'title']}
                        label="Title"
                        rules={[{ required: true, min: 2, max: 45 }]}
                      >
                        <AsnInput />
                      </AsnForm.Item>
                      <AsnForm.Item
                        name={[i, 'description']}
                        label="Description"
                        rules={[{ required: true, min: 2, max: 1048 }]}
                      >
                        <AsnInput />
                      </AsnForm.Item>
                      <AsnPicker
                        startDate={[i, 'startDate']}
                        endDate={[i, 'endDate']}
                      />
                      <AsnForm.Item
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
                      </AsnForm.Item>
                      <Duration />
                      <CustomInputs
                        name={[field.key, 'customInputs']}
                        attachments={attachments}
                        UploadDoc={UploadDoc}
                      />
                    </div>
                  )
              )}
            </>
          )}
        </AsnForm.List>
      )
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
