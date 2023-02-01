import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import qs from 'qs';
import { Space } from 'antd';

import { ReactComponent as Preview } from '../../../assets/icons/eye.svg';
import { ReactComponent as TrashSvg } from '../../../assets/icons/trash.svg';
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg';
import AddTeamMemberModal from './CreateTeamMemberModal';
import { ConfirmModal } from '../../Forms/Modal/Confirm';
import TeamMemberPermissionInfoModal from './TeamMemberPermissionModal';
import { AsnTable } from '../../Forms/Table';
import { HandleTableOnChange, TableGlobals, TableParams, UsersType } from '../../../types/teams';

const ApplicantList = styled.div`
    margin-top: 8px;
    height: calc(100% - 75px);
`;

const getRandomuserParams: TableGlobals = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params
});

const TeamsList: React.FC = () => {
  const [openApplicantDeleteModal, setOpenApplicantDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState('');
  const [openApplicantPermissionModal, setOpenApplicantPermissionModal] = useState(false);
  const columns = [
    {
      title: 'Name Surname',
      render: (item: UsersType) => {
        return (
          <Space direction='horizontal'>
            <Space align='start'>
              <img style={{ borderRadius: '50%' }} src={item?.picture?.large} width={30} height={30} />
            </Space>
            <Space align='end' style={{ color: 'var(--dark-border-ultramarine)', fontSize: 'var(--base-font-size)' }}>
               {item?.name?.first}{item?.name?.last}
            </Space>
          </Space>
        );
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (item: UsersType['name']['first']) => {
        return <h2>{item}</h2>;
      }
    },
    {
      title: 'Access level',
      dataIndex: 'gender',
      render: (item: UsersType['name']['first']) => {
        return (
        <Space direction='horizontal'>
          <Space align='start'>
            <Preview onClick={() => setOpenApplicantPermissionModal(true)}/>
          </Space>
          <Space align='end'>
             <h3>{item === 'male' ? 'Sub-activity' : 'Project'}</h3>
          </Space>
        </Space>
        );
      }
    },
    {
      title: 'User status',
      dataIndex: 'gender',
      render: (item: UsersType['boolean']['status']) => {
        return (
          <Space
            className={`${item === 'male' ? 'user_status_pending' : 'user_status_resolved'}`}
            style={{ width: '100%', justifyContent: 'center' }}
            direction='horizontal'
            >
            <Space align='center'>{item === 'male' ? 'Pending' : 'Resolved'}</Space>
          </Space>
        );
      },
      width: 150
    },
    {
      render: () => {
        return (
          <Space direction='horizontal'>
            <Space align='start' style={{ cursor: 'pointer' }}>
              <EditSvg onClick={() => setShowModal('update')}/>
            </Space>
            <Space align='end' style={{ cursor: 'pointer' }}>
              <TrashSvg onClick={() => setOpenApplicantDeleteModal(true)} />
            </Space>
          </Space>
        );
      },
      width: 55
    }
  ];
  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 11,
      showSizeChanger: false
    }
  });

  const fetchData = (): void => {
    setLoading(true);
    void fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then(async res => await res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 100
          }
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange: HandleTableOnChange = (
    pagination
  ) => {
    setTableParams({
      pagination
    });
  };

  return (
        <ApplicantList>
            <AsnTable
             size="middle"
             scroll={{ y: 'calc(100vh - 30em)' }}
             columns={columns}
             rowKey={record => record.login.uuid}
             dataSource={data}
             pagination={tableParams.pagination}
             loading={loading}
             onChange={handleTableChange}
             />
            {showModal === 'del' && <AddTeamMemberModal setShowModal={setShowModal}/>}
            <ConfirmModal
              styles={{ gap: '80px' }}
              yes="Delete"
              no="Cancel"
              open={openApplicantDeleteModal}
              title="Are you sure you want to delete this user?"
              onCancel={() => setOpenApplicantDeleteModal(!openApplicantDeleteModal)}
              onSubmit={function (): void {
                throw new Error('Function not implemented.');
              } } />
              <TeamMemberPermissionInfoModal
                showPermissionModal={openApplicantPermissionModal}
                setShowPermissionModal={setOpenApplicantPermissionModal}
              />
        </ApplicantList>
  );
};

export default TeamsList;
