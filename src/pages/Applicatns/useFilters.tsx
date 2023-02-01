import { Collapse, Radio, Space, Form, Slider } from 'antd';
import React from 'react';
import { AsnButton } from '../../components/Forms/Button';
import { AsnCheckboxGroup } from '../../components/Forms/Checkbox';
import { Panel } from '../../components/Forms/Collapse';
import { marks, optionsRegion, optionsStatus } from '../../helpers/constants';
import { ContentAssingersFilter } from './applicantsStyle';

export const UseFilters = ({ setOpen, filterData, onFinish, form }: any): any => {
  const hide = (): any => {
    setOpen(false);
  };

  return (
    <ContentAssingersFilter>
    <Form
     form={form}
     onFinish={onFinish}
     >
      <Collapse
        collapsible="icon"
        bordered={false}
        accordion
        expandIcon={({ isActive }) => (isActive ?? false ? '-' : '+')}
      >
        <Panel header="Age" key="1">
          <Form.Item name='age' >
            <Slider range marks={marks} defaultValue={[18, 50]} />
          </Form.Item>
        </Panel>
        <Panel header="Gender" key="2">
          <Form.Item name='gender'>
            <Radio.Group >
              <Space direction="vertical">
                <Radio value={'FEMALE'}>Female</Radio>
                <Radio value={'MALE'}>Male</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Panel>
        <Panel header="Student" key="3">
          <Form.Item name='student'>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={true}>Nonstudent</Radio>
                <Radio value={false}>Student</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Panel>
        <Panel header="Status" key="4">
          <Form.Item name='statuses'>
            <AsnCheckboxGroup
              style={{ width: '200px' }}
              options={optionsStatus}
            />
          </Form.Item>
        </Panel>
        <Panel header="Paid job" key="5">
          <Form.Item name='income'>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={true}>Paid job</Radio>
                <Radio value={false}>Unemployed</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Panel>
        <Panel header="disability" key="6">
          <Form.Item name='disability'>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={true}>NA</Radio>
                <Radio value={false}>Vulnerable group member</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Panel>
        <Panel header="Region" key="7">
          <Form.Item name='regions'>
            <AsnCheckboxGroup
              style={{ width: '158px' }}
              options={optionsRegion}
            />
          </Form.Item>
        </Panel>
      </Collapse>{' '}
      <Form.Item>
        <Space
          direction="horizontal"
          size={[10, 0]}
          style={{
            justifyContent: 'space-around',
            width: '100%',
            padding: '30px 0 0px 0px'
          }}
        >
          <AsnButton className="default" onClick={hide}>Close</AsnButton>
          <AsnButton className="primary" htmlType="submit">Add Filter</AsnButton>
        </Space>{' '}
      </Form.Item>
    </Form>
  </ContentAssingersFilter>
  )
  ;
};
