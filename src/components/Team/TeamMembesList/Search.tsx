import React from 'react';
import { Col, Row } from 'antd';

import { ReactComponent as DownloadInfo } from '../../../assets/icons/download.svg';
import { AsnInput } from '../../Forms/Input';
import { AsnButton } from '../../Forms/Button';
import AddTeamMemberModal from './CreateTeamMemberModal';
import { ShowDeleteUserModal } from '../../../types/teams';

const SearchTeamMembers: React.FC<ShowDeleteUserModal> = ({
  showModal,
  setShowModal,
  totalCount,
  permissionsList
}) => {
  return (
    <Row gutter={24}>
      <Col span={24}>
        <Row>
          <Col span={10}>
            <Row justify="space-between" align="middle" style={{ height: '100%' }}>
              <Col
                xxl={{ span: 2 }}
                xl={{ span: 5 }}
                lg={{ span: 4 }}
                md={{ span: 3 }}
                style={{
                  fontSize: 'var(--headline-font-size)',
                  color: 'var(--dark-border-ultramarine)'
                }}
              >
                Team
              </Col>
              <Col
                xxl={{ span: 20 }}
                xl={{ span: 19 }}
                lg={{ span: 18 }}
                md={{ span: 16 }}
              >
                <AsnInput
                   placeholder="Search"
                   className='search_users'
                   style={{
                     height: '32px',
                     border: 'none',
                     fontWeight: 'var(--font-normal)',
                     fontSize: 'var(--font-size-small)',
                     borderRadius: '10px',
                     boxShadow: 'var(--search-box-shadow)',
                     color: 'var(--dark-4)',
                     maxWidth: '300px'
                   }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Row justify="end">
              <AsnButton
                type="primary"
                className="primary"
                htmlType="submit"
                onClick={() => setShowModal('create')}
              >
                Add user
              </AsnButton>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="end" align='middle' style={{ marginTop: '1.6vh' }}>
          <Col>
            <DownloadInfo />
          </Col>
          <Col
            style={{
              border: '0.5px solid var(--dark-5)',
              padding: '8px',
              borderRadius: '6px',
              marginLeft: '10px'
            }}
          >
            Total members: {totalCount}
          </Col>
        </Row>
      </Col>
      {showModal === 'create' && <AddTeamMemberModal permissionsList={permissionsList} setShowModal={setShowModal} />}
    </Row>
  );
};

export default SearchTeamMembers;
