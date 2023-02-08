import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Space } from 'antd';

import { ReactComponent as Preview } from '../../../assets/icons/eye.svg';
import { ReactComponent as TrashSvg } from '../../../assets/icons/trash.svg';
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg';
// import AddTeamMemberModal from './CreateTeamMemberModal';
import { ConfirmModal } from '../../Forms/Modal/Confirm';
import TeamMemberPermissionInfoModal from './TeamMemberPermissionModal';
import { AsnTable } from '../../Forms/Table';
import { HandleTableOnChange, ITeamMembersTypes, TableParams, User } from '../../../types/teams';
import useGetAllTeamsList from '../../../api/Teams/useGetAllTeamMembersList';
import AsnAvatar from '../../Forms/Avatar';
import { useProject } from '../../../hooks/useProject';

const ApplicantList = styled.div`
  margin-top: 8px;
  height: calc(100% - 75px);
`;

const TeamsList: React.FC<ITeamMembersTypes> = ({ setTotalCount }) => {
  const [openApplicantDeleteModal, setOpenApplicantDeleteModal] = useState(false);
  const { projectId } = useProject();
  // const [showModal, setShowModal] = useState('');
  const [openApplicantPermissionModal, setOpenApplicantPermissionModal] = useState(false);

  const columns = [
    {
      title: 'Name Surname',
      render: (item: User) => {
        return (
          <Space direction="horizontal">
            <Space align="start">
              <AsnAvatar
                letter={`${item?.lastName?.charAt(0)}${item?.firstName?.charAt(
                  0
                )}`}
                src={item?.photo}
              />
            </Space>
            <Space
              align="end"
              style={{
                color: 'var(--dark-border-ultramarine)',
                fontSize: 'var(--base-font-size)'
              }}
            >
              {item?.firstName}
              {item?.lastName}
            </Space>
          </Space>
        );
      }
    },
    {
      title: 'Email',
      render: (item: User) => {
        return <h2>{item?.email}</h2>;
      }
    },
    {
      title: 'Access level',
      render: (item: User) => {
        return (
          <Space direction="horizontal">
            <Space align="start">
              <Preview onClick={() => setOpenApplicantPermissionModal(true)} />
            </Space>
            <Space align="end">
              <h3>{item?.position}</h3>
            </Space>
          </Space>
        );
      }
    },
    {
      title: 'User status',
      render: (item: User) => {
        return (
          <Space
            className={`${
              item?.emailVerified
                ? 'user_status_resolved'
                : 'user_status_pending'
            }`}
            style={{ width: '100%', justifyContent: 'center' }}
            direction="horizontal"
          >
            <Space align="center">
              {item?.emailVerified ? 'Resolved' : 'Pending' }
            </Space>
          </Space>
        );
      },
      width: 150
    },
    {
      render: () => {
        return (
          <Space direction="horizontal">
            <Space align="start" style={{ cursor: 'pointer' }}>
              <EditSvg />
            </Space>
            <Space align="end" style={{ cursor: 'pointer' }}>
              <TrashSvg onClick={() => setOpenApplicantDeleteModal(true)} />
            </Space>
          </Space>
        );
      },
      width: 55
    }
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 11,
      showSizeChanger: false
    }
  });

  const { data: membersListInfo, isLoading, refetch, count } = useGetAllTeamsList({
    limit: tableParams.pagination?.pageSize,
    offset: 0,
    projectId
  });

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: count
      }
    });
    setTotalCount(count);
  }, [JSON.stringify(tableParams), isLoading]);

  const handleTableChange: HandleTableOnChange = (pagination) => {
    setTableParams({
      pagination
    });
    refetch();
  };

  return (
    <ApplicantList>
      <AsnTable
        size="middle"
        scroll={{ y: 'calc(100vh - 30em)' }}
        columns={columns}
        rowKey={(record) => record?.id}
        dataSource={membersListInfo}
        pagination={tableParams.pagination}
        loading={isLoading}
        onChange={handleTableChange}
      />
      {/* {showModal === 'del' && (
        <AddTeamMemberModal setShowModal={setShowModal} />
      )} */}
      <ConfirmModal
        styles={{ gap: '80px' }}
        yes="Delete"
        no="Cancel"
        open={openApplicantDeleteModal}
        title="Are you sure you want to delete this user?"
        onCancel={() => setOpenApplicantDeleteModal(!openApplicantDeleteModal)}
        onSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <TeamMemberPermissionInfoModal
        showPermissionModal={openApplicantPermissionModal}
        setShowPermissionModal={setOpenApplicantPermissionModal}
      />
    </ApplicantList>
  );
};

export default TeamsList;
