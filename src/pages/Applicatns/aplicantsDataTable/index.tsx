/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import {
  Button,
  Table,
  Popover,
  Collapse,
  Space,
  Slider,
  Radio,
  Form
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterOutlined } from '@ant-design/icons';
import { Panel } from '../../../components/Forms/Collapse';
import { AsnButton } from '../../../components/Forms/Button';
import type { SliderMarks } from 'antd/es/slider';
import { AsnCheckboxGroup } from '../../../components/Forms/Checkbox';
import { ContentAssingersFilter } from '../applicantsStyle';
import moment from 'moment';
import { ApplicatnList, DataType } from '../applicantsTypes';
import useGetApplicantsFilter from '../../../api/Applicants/useGetApplicantsFilter';

const ApplicantsDataList: React.FC<ApplicatnList> = ({
  allApplicants,
  searchAplicant,
  search
}) => {
  const [form] = Form.useForm();
  const { mutate: applicantsFilter } = useGetApplicantsFilter({});

  // Age function
  const marks: SliderMarks = {
    0: '0',
    100: {
      label: <strong>100</strong>
    }
  };
  //
  // gender function
  const [value, setValue] = useState();

  const onChange = (e: any): any => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  ///
  // student function
  const [valueStudent, setValueStudent] = useState();

  const onChangeStudent = (e: any): any => {
    console.log(e.target.value);
    setValueStudent(e.target.value);
  };
  ///
  // Status fanction
  const onChangeStatus = (checkedValues: any): any => {
    console.log(checkedValues);
  };
  const optionsStatus = [
    { label: 'Applicant', value: 'APPLICANT' },
    { label: 'Selection', value: 'SELECTION' },
    { label: 'Pre-Assessment', value: 'PRE_ASSESSMENT' },
    { label: 'Participant', value: 'PARTICIPANT' },
    { label: 'Post-Assessment ', value: 'POST_ASSESSMENT' },
    { label: 'Trained', value: 'TRAINED' }
  ];
  //

  // Paid function
  const [valuePaid, setValuePaid] = useState();

  const onChangePaid = (e: any): any => {
    console.log(e.target.value);
    setValuePaid(e.target.value);
  };
  ///

  // Vulnerability function
  const [valueVulnerability, setValueVulnerability] = useState();

  const onChangeVulnerability = (e: any): any => {
    console.log(e.target.value);
    setValueVulnerability(e.target.value);
  };
  ///
  // Region fanction
  const onChangeRegion = (checkedValues: any): any => {
    console.log(checkedValues);
  };
  const optionsRegion = [
    { label: 'Yerevan', value: 'Yerevan/Երևան,' },
    { label: 'Aragatsotn', value: 'Aragatsotn/Արագածոտն,' },
    { label: 'Ararat', value: 'Ararat/Արարատ,' },
    { label: 'Armavir', value: 'Armavir/Արմավիր,' },
    { label: 'Gegharkunik', value: 'Gegharkunik/Գեղարքունիք,' },
    { label: 'Kotayk', value: 'Kotayk/Կոտայք' },
    { label: 'Lori', value: 'Lori/Լոռի,' },
    { label: 'Shirak', value: 'Shirak/Շիրակ,' },
    { label: 'Syunik', value: 'Syunik/Սյունիք,' },
    { label: 'Tavush', value: 'Tavush/Տավուշ,' },
    { label: 'Vayots Dzor', value: 'Vayots Dzor/Վայոց Ձոր,' }
  ];
  //
  const onFinish = (values: any): any => {
    console.log(values, 'values');
    const requestBody = {
      statuses:
        values?.status?.map((s: any) => {
          return (
            s
          );
        }),
      age:
      {
        from: values?.age[0],
        to: values?.age[1]
      },
      regions:
        values?.region?.map((i: any) => {
          return (
            i

          );
        }),
      student: values?.student,
      gender: values?.gender,
      disability: values?.vulnerability,
      income: values?.paid_job,
      limit: 50,
      offset: 0

    };
    applicantsFilter(requestBody);
  };
  const content = (
    <ContentAssingersFilter>
      <Form form={form} onFinish={onFinish} >
        <Collapse
          collapsible="icon"
          bordered={false}
          accordion
          expandIcon={({ isActive }) => (isActive ?? false ? '-' : '+')}
        >
          <Panel header="Age" key="1" className="fffffffffff">
            <Form.Item name='age' rules={[{ required: true }]}>
              <Slider range marks={marks} defaultValue={[16, 27]} />
            </Form.Item>
          </Panel>
          <Panel header="Gender" key="2">
            <Form.Item name='gender'>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={'FEMALE'}>Female</Radio>
                  <Radio value={'MALE'}>Male</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Panel>
          <Panel header="Student" key="3">
            <Form.Item name='student'>
              <Radio.Group onChange={onChangeStudent} value={valueStudent}>
                <Space direction="vertical">
                  <Radio value={true}>Nonstudent</Radio>
                  <Radio value={false}>Student</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Panel>
          <Panel header="Status" key="4">
            <Form.Item name='status'>
              <AsnCheckboxGroup
                style={{ width: '200px' }}
                options={optionsStatus}
                onChange={onChangeStatus}
              />
            </Form.Item>
          </Panel>
          <Panel header="Paid job" key="5">
            <Form.Item name='paid_job'>
              <Radio.Group onChange={onChangePaid} value={valuePaid}>
                <Space direction="vertical">
                  <Radio value={true}>Paid job</Radio>
                  <Radio value={false}>Unemployed</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Panel>
          <Panel header="Vulnerability" key="6">
            <Form.Item name='vulnerability'>
              <Radio.Group
                onChange={onChangeVulnerability}
                value={valueVulnerability}
              >
                <Space direction="vertical">
                  <Radio value={true}>NA</Radio>
                  <Radio value={false}>Vulnerable group member</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Panel>
          <Panel header="Region" key="7">
            <Form.Item name='region'>
              <AsnCheckboxGroup
                style={{ width: '160px' }}
                options={optionsRegion}
                onChange={onChangeRegion}
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
            <AsnButton className="default">Close</AsnButton>
            <AsnButton className="primary" htmlType="submit">Add Filter</AsnButton>
          </Space>{' '}
        </Form.Item>
      </Form>
    </ContentAssingersFilter>
  );
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Popover
          content={content}
          title="Filter your results"
          trigger="click"
          overlayClassName="applicantsFilter"
        >
          <Button type="link" style={{ padding: '0' }}>
            <FilterOutlined className="filterIcon" />
          </Button>
        </Popover>
      ),
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
    Boolean(allApplicants?.result) && search.length < 2
      ? (
      <div>
        {allApplicants?.result?.map((k: any) =>
          data.push({
            key: `${k?.id}`,
            name: `${k?.fullName}`,
            age: `${
              Number(moment?.(today)?.format('YYYY').valueOf()) -
              Number(moment(k?.dob).format('YYYY'))
            }`,
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
        )}
      </div>
        )
      : (
      <div>
        {' '}
        {searchAplicant?.result?.map((s: any) =>
          data.push({
            key: `${s?.id}`,
            name: `${s?.fullName}`,
            age: `${
              Number(moment?.(today)?.format('YYYY').valueOf()) -
              Number(moment(s?.dob).format('YYYY'))
            }`,
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
        )}
      </div>
        );
  }
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
      />
    </>
  );
};
export default ApplicantsDataList;
