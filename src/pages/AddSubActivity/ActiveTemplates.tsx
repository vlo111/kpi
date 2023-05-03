import React, { useState } from 'react';
import { Input, Row, Col, Space, Typography, Popover } from 'antd';
import styled from 'styled-components';

import TemplateCard from './TemplateCard';
import { AsnCheckbox } from '../../components/Forms/Checkbox';
import { AsnButton } from '../../components/Forms/Button';
import { AsnRadio } from '../../components/Forms/Radio';
import { AsnForm } from '../../components/Forms/Form';
import AsnSpin from '../../components/Forms/Spin';

import { TVoid } from '../../types/global';
import { IActiveTemplatesProps } from '../../types/api/activity/subActivity';
import { ReactComponent as FilterSvg } from '../../assets/icons/filter.svg';

const { Text } = Typography;

const AsnInput = styled(Input)`
    width: 20vw;
    border-radius: 10px;
`;

const AsnText = styled(Text)`
  color: var(--dark-border-ultramarine);
  font-size: var(--base-font-size);
  cursor: pointer;
  font-weight: var( --font-semibold);
  margin-right: 16px;
`;

const AsnPopover = styled(Popover)`
  &.ant-popover-arrow {
    display: none;
  }
  &.ant-popover {
    width: 185px !important;
  }
`;

const ActiveTemplates: React.FC<IActiveTemplatesProps> = ({ search, setSearch, setOffset, setFilters, isLoading, templates }) => {
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [form] = AsnForm.useForm();

  const onChange = (data: React.ChangeEvent<HTMLInputElement>): void => {
    if (data.target.value === '') {
      setSearch('');
      setOffset(0);
    }
  };

  const onPressEnter = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    if (e.currentTarget.value.trim().length > 0) {
      setSearch(e.currentTarget.value.trim());
      setOffset(0);
    }
  };

  const onFinish: TVoid = (values) => {
    const { applicationForm, courseStructure } = values;
    if (applicationForm === undefined) {
      setFilters({
        applicationForm: [],
        courseStructure
      });
    } else {
      setFilters(values);
    }
    setOffset(0);
    setShowFilters(false);
  };

  const resetTemplates = (): void => {
    setOffset(0);
    setFilters({
      courseStructure: undefined,
      applicationForm: undefined
    });
    setSearch('');
    form.resetFields();
  };

  return (
    <>
      <Space direction='horizontal' style={{ padding: '16px 0px', justifyContent: 'space-between', width: '100%' }}>
        <AsnInput
          placeholder="Search..."
          onChange={onChange}
          onPressEnter={onPressEnter}
        />
        <Space.Compact style={{ alignItems: 'center' }}>
          <AsnText underline onClick={resetTemplates}>Clean filters</AsnText>
          <AsnPopover
            content={
              <AsnForm form={form} onFinish={onFinish}>
                <Space direction='vertical'>
                  <AsnForm.Item name="applicationForm" style={{ margin: 0 }}>
                    <AsnCheckbox.Group style={{ width: '150px' }}>
                      <Space direction='vertical'>
                        <AsnCheckbox value='APPLICATION'>Application form</AsnCheckbox>
                        <AsnCheckbox value='ASSESSMENT'>Assessment form</AsnCheckbox>
                      </Space>
                    </AsnCheckbox.Group>
                  </AsnForm.Item>
                  <AsnForm.Item name="courseStructure" style={{ margin: 0 }}>
                    <AsnRadio.Group>
                      <Space direction='vertical'>
                        <AsnRadio value='ONE_SECTION'>One Phase</AsnRadio>
                        <AsnRadio value='MULTI_SECTION'>Multi Phase</AsnRadio>
                      </Space>
                    </AsnRadio.Group>
                  </AsnForm.Item>
                  <AsnButton
                    className='primary'
                    htmlType='submit'
                    style={{
                      height: '32px',
                      float: 'right',
                      padding: '4px 15px'
                    }}
                  >
                    Filter
                  </AsnButton>
                </Space>
              </AsnForm>
            }
            trigger="click"
            open={showFilters}
            placement="bottomRight"
            showArrow={false}
            getPopupContainer={(trigger: HTMLElement) => trigger?.parentElement as HTMLElement}
            onOpenChange={(open) => setShowFilters(open)}
          >
            <FilterSvg style={{ cursor: 'pointer' }} />
          </AsnPopover>
        </Space.Compact>
      </Space>
      {isLoading
        ? <AsnSpin />
        : (<Row gutter={[20, 20]}>
          {templates?.length === 0
            ? <Col span={24} style={{ textAlign: 'center' }}>No Templates</Col>
            : templates?.map((template, i: number) => (
              <Col key={i} xxl={{ span: 8 }} xl={{ span: 12, pull: 0, push: 0 }} md={{ span: 18, pull: 3, push: 3 }} xs={{ span: 24 }}>
                <TemplateCard template={template} />
              </Col>
            ))}
        </Row>)}
    </>
  );
};

export default ActiveTemplates;
