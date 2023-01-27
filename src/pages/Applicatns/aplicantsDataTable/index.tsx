/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  Form,
  Tag
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
import { useNavigate } from 'react-router-dom';

const ApplicantsDataList: React.FC<ApplicatnList> = ({
  allApplicants,
  searchAplicant,
  search,
  refetch

}) => {
  console.log(allApplicants);

  const [form] = Form.useForm();
  const [showNote, setShowNote] = useState<any>();
  const [open, setOpen] = useState(false);
  const [valueFilter, setValueFilter] = useState<any>('');

  const navigate = useNavigate();
  const { mutate: applicantsFilter } = useGetApplicantsFilter({
    onSuccess: (options: any) => {
      const { data } = options;
      setShowNote(data);
    }
  });

  // Age function
  const marks: SliderMarks = {
    0: '0',
    100: '100'
  };
  // Status data
  const optionsStatus = [
    { label: 'Applicant', value: 'APPLICANT' },
    { label: 'Selection', value: 'SELECTION' },
    { label: 'Pre-Assessment', value: 'PRE_ASSESSMENT' },
    { label: 'Participant', value: 'PARTICIPANT' },
    { label: 'Post-Assessment ', value: 'POST_ASSESSMENT' },
    { label: 'Trained', value: 'TRAINED' }
  ];
  // Region data
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
  const onFinish = (values: any): any => {
    const requestBody = {
      statuses:
        values?.status?.map((s: any) => {
          return (
            s
          );
        }),
      age:
    {
      from: values?.age?.[0] ?? 18,
      to: values?.age?.[1] ?? 50
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
    hide();
    setValueFilter(values);
  };

  const hide = (): any => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean): any => {
    setOpen(newOpen);
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
            <Form.Item name='status'>
              <AsnCheckboxGroup
                style={{ width: '200px' }}
                options={optionsStatus}
              />
            </Form.Item>
          </Panel>
          <Panel header="Paid job" key="5">
            <Form.Item name='paid_job'>
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={true}>Paid job</Radio>
                  <Radio value={false}>Unemployed</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Panel>
          <Panel header="Vulnerability" key="6">
            <Form.Item name='vulnerability'>
              <Radio.Group>
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
  );

  const columns: ColumnsType<DataType> = [
    {
      title: (
        <Popover
          content={content}
          title="Filter your results"
          trigger="click"
          overlayClassName="applicantsFilter"
          open={open}
          onOpenChange={handleOpenChange}
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
    Boolean(allApplicants?.result) && search.length < 2 && (showNote?.result === undefined || searchAplicant?.result)
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
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      <div>
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
        )
          ? (
          <div>
                 {showNote?.result?.map((f: any) =>
                   data.push({
                     key: `${f?.id}`,
                     name: `${f?.fullName}`,
                     age: `${
              Number(moment?.(today)?.format('YYYY').valueOf()) -
              Number(moment(f?.dob).format('YYYY'))
            }`,
                     education: `${f?.educationLevel}`,
                     sector: `${f?.courseMap?.course?.sector?.title}`,
                     course: `${f?.courseMap?.course?.title}`,
                     status: `${f?.courseMap?.status}`,
                     region: `${f?.region}`,
                     phoneNumber: `${f?.phone}`,
                     gender: `${f?.gender}`,
                     student: `${f?.student}`,
                     vulnerability: `${f?.vulnerabilities}`,
                     workOrganisation: `${f?.workOrganisation}`,
                     informedAboutUs: `${f?.informedAboutUs}`
                   })
                 )}
          </div>
            )
          : (<></>);
  }
  const handleClose = (allApplicants: any): any => {
    refetch();
  };
  return (
    <>
     <div>
     {valueFilter
       ? (
        <>
        {valueFilter?.gender !== undefined && <Tag closable> { `Gender:${valueFilter?.gender}`}</Tag> }
        {valueFilter?.student !== undefined && <Tag closable> { `Student:${valueFilter?.student}`}</Tag> }
        {valueFilter?.status !== undefined && <Tag closable> { `Status:${valueFilter?.status}`}</Tag>}
        {valueFilter?.paid_job !== undefined && <Tag closable> { `Paid job:${valueFilter?.paid_job}`}</Tag>}
        {valueFilter?.vulnerability !== undefined && <Tag closable> { `Vulnerability:${valueFilter?.vulnerability}`}</Tag>}
        {valueFilter?.region !== undefined && <Tag closable> { `Region:${valueFilter?.region}`}</Tag>}
        <Tag closable onClose={(e) => {
          handleClose('');
        }}> { 'Clear All'}</Tag>

        </>
         )
       : (
           <div></div>
         )}
    </div>
      <Table
        columns={columns}
        dataSource={data}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        onRow={(record) => {
          return {
            onClick: event => {
              navigate(
                `/applicant/${record?.key}`
              );
            }
          };
        }}
      />

    </>
  );
};
export default ApplicantsDataList;
