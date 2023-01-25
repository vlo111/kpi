/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { Button, Table, Popover, Collapse, Space, Slider, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterOutlined } from '@ant-design/icons';
import { Panel } from '../../../components/Forms/Collapse';
import { AsnButton } from '../../../components/Forms/Button';
import type { SliderMarks } from 'antd/es/slider';
import { AsnCheckboxGroup } from '../../../components/Forms/Checkbox';
import { ContentAssingersFilter } from '.././style';
import moment from 'moment';

interface DataType {
  key: React.Key
  name: string
  sector: string
  age: string
  education: string
  course: string
  status: string
  region: string
  phoneNumber: string
  gender: string
  student: string
  vulnerability: string
  workOrganisation: string
  informedAboutUs: string

}
interface ApplicatnList {
  allApplicants: any
  searchAplicant: any
  search: any

}
const ApplicantsDataList: React.FC<ApplicatnList> = ({ allApplicants, searchAplicant, search }) => {
  // Age function
  const marks: SliderMarks = {
    0: '0',
    100: {
      label: <strong>100</strong>
    }
  };
  //
  // gender function
  const [value, setValue] = useState(1);

  const onChange = (e: any): any => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  ///
  // student function
  const [valueStudent, setValueStudent] = useState(1);

  const onChangeStudent = (e: any): any => {
    console.log('radio checked', e.target.value);
    setValueStudent(e.target.value);
  };
  ///
  // Status fanction
  const onChangeStatus = (checkedValues: any): any => {
    console.log('checked = ', checkedValues);
  };
  const optionsStatus = [
    { label: 'Applicant', value: 'Applicant' },
    { label: 'Selection', value: 'Selection' },
    { label: 'Pre-Assessment', value: 'Pre_Assessment' },
    { label: 'Participant', value: 'Participant' },
    { label: 'Post-Assessment ', value: 'Post_Assessment ' },
    { label: 'Trained', value: 'Trained' }
  ];
  //

  // Paid function
  const [valuePaid, setValuePaid] = useState(1);

  const onChangePaid = (e: any): any => {
    console.log('radio checked', e.target.value);
    setValuePaid(e.target.value);
  };
    ///

  // Vulnerability function
  const [valueVulnerability, setValueVulnerability] = useState(1);

  const onChangeVulnerability = (e: any): any => {
    console.log('radio checked', e.target.value);
    setValueVulnerability(e.target.value);
  };
    ///
    // Region fanction
  const onChangeRegion = (checkedValues: any): any => {
    console.log('checked = ', checkedValues);
  };
  const optionsRegion = [
    { label: 'Yerevan', value: 'Yerevan' },
    { label: 'Aragatsotn', value: 'Aragatsotn' },
    { label: 'Ararat', value: 'Ararat' },
    { label: 'Armavir', value: 'Armavir' },
    { label: 'Gegharkunik', value: 'Gegharkunik' },
    { label: 'Kotayk', value: 'Kotayk' },
    { label: 'Shirak', value: 'Shirak' },
    { label: 'Syunik', value: 'Syunik' },
    { label: 'Tavush', value: 'Tavush' },
    { label: 'Vayots Dzor', value: 'Vayots_Dzor' }

  ];
  //
  const content = (
    <ContentAssingersFilter>
          <Collapse collapsible="icon" bordered={false} accordion expandIcon={({ isActive }) => (isActive ?? false) ? '-' : '+'}>
      <Panel header="Age" key="1" className='fffffffffff'>
          <Slider range marks={marks} defaultValue={[16, 27]}/>
          {/* tooltip={{ open: true }}  */}
      </Panel>
      <Panel header="Gender" key="2">
      <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Famale</Radio>
        <Radio value={2}>Male</Radio>
      </Space>
    </Radio.Group>
      </Panel>
      <Panel header="Student" key="3">
      <Radio.Group onChange={onChangeStudent} value={valueStudent}>
      <Space direction="vertical">
        <Radio value={1}>Nonstudent</Radio>
        <Radio value={2}>Student</Radio>
      </Space>
    </Radio.Group>
      </Panel>
      <Panel header="Status" key="4">
      <AsnCheckboxGroup
      style={{ width: '200px' }}
      options={optionsStatus}
      onChange={onChangeStatus}
    />
      </Panel>
      <Panel header="Paid job" key="5">
      <Radio.Group onChange={onChangePaid} value={valuePaid}>
      <Space direction="vertical">
        <Radio value={1}>Paid job</Radio>
        <Radio value={2}>Unemployed</Radio>
      </Space>
    </Radio.Group>
      </Panel>
      <Panel header="Vulnerability" key="6">
      <Radio.Group onChange={onChangeVulnerability} value={valueVulnerability}>
      <Space direction="vertical">
        <Radio value={1}>NA</Radio>
        <Radio value={2}>Vulnerable group member</Radio>
      </Space>
    </Radio.Group>
      </Panel>
      <Panel header="Region" key="7">
      <AsnCheckboxGroup
      style={{ width: '160px' }}
      options={optionsRegion}
      onChange={onChangeRegion}
    />
      </Panel>
    </Collapse>
    <Space direction='horizontal' size={[10, 0]} style={{ justifyContent: 'space-around', width: '100%', padding: '30px 0 0px 0px' }}>
          <AsnButton className="default">Close</AsnButton>
          <AsnButton className="primary">Add Filter</AsnButton>

        </Space>
    </ContentAssingersFilter>
  );
  const columns: ColumnsType<DataType> = [
    {
      title: <Popover
      content={content}
      title="Filter your results"
      trigger="click"
      overlayClassName='applicantsFilter'
    >
      <Button type='link' style={{ padding: '0' }}><FilterOutlined className='filterIcon'/></Button>
    </Popover>,
      key: 'filter',
      width: 50
    },
    {
      title: 'Name Surname',
      dataIndex: 'name',
      key: 1,
      ellipsis: true
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 2,
      ellipsis: true
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 3,
      ellipsis: true
    },
    {
      title: 'Status',
      key: 4,
      dataIndex: 'status',
      ellipsis: true
    },
    {
      title: 'Region',
      key: 5,
      dataIndex: 'region',
      ellipsis: true
    },
    {
      title: 'Phone number',
      key: 6,
      dataIndex: 'phoneNumber',
      ellipsis: true
    },
    {
      title: 'Age',
      key: 7,
      dataIndex: 'age',
      ellipsis: true
    },
    {
      title: 'Gender',
      key: 8,
      dataIndex: 'gender',
      ellipsis: true
    },
    {
      title: 'Education',
      key: 9,
      dataIndex: 'education',
      ellipsis: true
    },
    {
      title: 'Student',
      key: 1,
      dataIndex: 'student',
      ellipsis: true
    },
    {
      title: 'Vulnerability',
      key: 11,
      dataIndex: 'vulnerability',
      ellipsis: true
    },
    {
      title: 'Paid job',
      key: 12,
      dataIndex: 'workOrganisation',
      ellipsis: true
    },
    {
      title: 'Course source ',
      key: 13,
      dataIndex: 'informedAboutUs',
      ellipsis: true
    }
  ];
  const data: DataType[] = [];
  const today = new Date();

  {
    allApplicants?.result && search.length < 2
      ? (
    <div>
    { allApplicants?.result?.map((k: any) => (
      data.push({
        key: `${k?.id}`,
        name: `${k?.fullName}`,
        age: `${Number(moment?.(today)?.format('YYYY').valueOf()) - Number(moment(k?.dob).format('YYYY'))}`,
        education: `${k?.educationLevel}`,
        sector: `${k?.courseMap?.course?.sector?.title}`,
        course: `${k?.courseMap?.course?.title}`,
        status: `${k?.courseMap?.status}`,
        region: `${k?.region}`,
        phoneNumber: `${k?.phone}`,
        gender: `${k?.gender}`,
        student: `${k?.student}`,
        vulnerability: `${k?.vulnerabilities}`,
        workOrganisation: `${k?.workOrganisation}`,
        informedAboutUs: `${k?.informedAboutUs}`
      })
    )

    )
}
</div>
        )
      : (
    <div>    {searchAplicant?.result?.map((s: any) => (
      data.push({
        key: `${s?.id}`,
        name: `${s?.fullName}`,
        age: `${Number(moment?.(today)?.format('YYYY').valueOf()) - Number(moment(s?.dob).format('YYYY'))}`,
        education: `${s?.educationLevel}`,
        sector: `${s?.courseMap?.course?.sector?.title}`,
        course: `${s?.courseMap?.course?.title}`,
        status: `${s?.courseMap?.status}`,
        region: `${s?.region}`,
        phoneNumber: `${s?.phone}`,
        gender: `${s?.gender}`,
        student: `${s?.student}`,
        vulnerability: `${s?.vulnerabilities}`,
        workOrganisation: `${s?.workOrganisation}`,
        informedAboutUs: `${s?.informedAboutUs}`
      })
    )

    )
}
</div>
        );
  }
  return (
    <>
    <Table columns={columns} dataSource={ data } rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}/>

</>
  );
};
export default ApplicantsDataList;
