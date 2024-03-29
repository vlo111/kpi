import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { message, Space } from 'antd';

import { ReactComponent as Preview } from '../../../assets/icons/eye.svg';
import { ReactComponent as TrashSvg } from '../../../assets/icons/trash.svg';
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg';
import AddTeamMemberModal from './CreateTeamMemberModal';
import { ConfirmModal } from '../../Forms/Modal/Confirm';
import TeamMemberPermissionInfoModal from './TeamMemberPermissionModal';
import { AsnTable } from '../../Forms/Table';
import {
  HandleTableOnChange,
  ITeamMembersTypes,
  UpdateUserAllInfo,
  User
} from '../../../types/teams';
import useGetAllTeamsList from '../../../api/Teams/useGetAllTeamMembersList';
import AsnAvatar from '../../Forms/Avatar';
import { useProject } from '../../../hooks/useProject';
import useDeleteTeamMemberPermissionByInfo from '../../../api/Teams/useDeleteTeamMember';
import useGetSingleUserPermissions from '../../../api/Teams/useGetSingleUserPermissions';

const ApplicantList = styled.div`
  margin-top: 8px;
  height: calc(100% - 75px);
`;

const TeamsList: React.FC<ITeamMembersTypes> = ({
  setTotalCount,
  permissionsList,
  searchText,
  setOffset,
  offset
}) => {
  const [openApplicantDeleteModal, setOpenApplicantDeleteModal] = useState('');
  const { projectId } = useProject();
  const [showModal, setShowModal] = useState('');
  const [userId, setUserId] = useState('');
  const [updateUserInfo, setUpdateUserInfo] = useState<UpdateUserAllInfo>({
    updateUserId: '',
    info: {
      lastName: '',
      firstName: '',
      email: '',
      position: '',
      permissionType: ''
    }
  });

  const { data } = useGetSingleUserPermissions(
    updateUserInfo.updateUserId,
    projectId,
    {
      enabled:
        Boolean(updateUserInfo.updateUserId) &&
        Boolean(projectId) &&
        showModal === 'edit'
    }
  );

  const columns = [
    {
      title: 'Name Surname',
      render: (item: User) => {
        return (
          <Space direction="horizontal">
            <Space align="start">
              <AsnAvatar
                letter={`${item?.firstName?.charAt(0)}${item?.lastName?.charAt(
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
              <Preview onClick={() => setUserId(item?.id)} />
            </Space>
            <Space align="end">
              <h3>
                {item?.permissionLevel[0]?.maxLevel === 1
                  ? 'Project'
                  : item?.permissionLevel[0]?.maxLevel === 2
                    ? 'Result Area'
                    : item?.permissionLevel[0]?.maxLevel === 3
                      ? 'Input Activity'
                      : 'Template'}
              </h3>
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
            className={`${item?.emailVerified
                ? 'user_status_resolved'
                : 'user_status_pending'
              }`}
            style={{ width: '100%', justifyContent: 'center' }}
            direction="horizontal"
          >
            <Space align="center">
              {item?.emailVerified ? 'Resolved' : 'Pending'}
            </Space>
          </Space>
        );
      },
      width: 150
    },
    {
      render: (item: User) => {
        return (
          <Space direction="horizontal">
            <Space align="start" style={{ cursor: 'pointer' }}>
              <EditSvg
                onClick={() => {
                  setUpdateUserInfo({
                    updateUserId: item?.id,
                    info: {
                      lastName: item?.lastName,
                      firstName: item?.firstName,
                      email: item?.email,
                      position: item?.permissionLevel[0]?.position,
                      permissionType: item?.permissionLevel[0]?.permissionType
                    }
                  });
                  setShowModal('edit');
                }}
              />
            </Space>
            <Space align="end" style={{ cursor: 'pointer' }}>
              <TrashSvg onClick={() => setOpenApplicantDeleteModal(item?.id)} />
            </Space>
          </Space>
        );
      },
      width: 55
    }
  ];

  const {
    data: membersListInfo,
    isLoading,
    refetch,
    count,
    isFetching
  } = useGetAllTeamsList({
    limit: 11,
    search: searchText,
    offset,
    projectId
  }
  );

  const { mutate: deletePermission } = useDeleteTeamMemberPermissionByInfo({
    onSuccess: () => {
      refetch();
      setOpenApplicantDeleteModal('');
    },
    onError: () => {
      void message.error('Something went wrong !!');
    }
  });

  const handleTableChange: HandleTableOnChange = (pagination) => {
    const { current } = pagination;
    setOffset((current as number - 1) * 11);
  };

  useEffect(() => {
    setTotalCount(count);
  }, [isFetching]);

  return (
    <ApplicantList>
      <AsnTable
        size="middle"
        scroll={{ y: 'calc(100vh - 30em)' }}
        columns={columns}
        rowKey={(record) => record?.id}
        dataSource={membersListInfo}
        pagination={{
          current: offset / 11 + 1,
          pageSize: 11,
          showSizeChanger: false,
          total: count
        }}
        loading={isLoading}
        onChange={handleTableChange}
      />
      {showModal === 'edit' && (
        <AddTeamMemberModal
          setShowModal={setShowModal}
          edit={true}
          permissionsList={permissionsList}
          userPermissions={data}
          userInfo={updateUserInfo}
        />
      )}
      <ConfirmModal
        styles={{ gap: '80px' }}
        yes="Delete"
        no="Cancel"
        open={Boolean(openApplicantDeleteModal)}
        title="Are you sure you want to delete this user permissions ?"
        onCancel={() => setOpenApplicantDeleteModal('')}
        onSubmit={function (): void {
          deletePermission({ userId: openApplicantDeleteModal, projectId });
        }}
      />
      {showModal !== 'edit' && (
        <TeamMemberPermissionInfoModal userId={userId} setUserId={setUserId} />
      )}
    </ApplicantList>
  );
};

export default TeamsList;
