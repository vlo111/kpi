import React from 'react'
import { ReactComponent as TeamsMembers } from '../../../assets/icons/team-members.svg'
import { ReactComponent as DownloadInfo } from '../../../assets/icons/download.svg'
import AsnInput from '../../Forms/Input'
import { AsnButton } from '../../Forms/Button'
import AddApplicantModal from './CreateApplicantsModal'
import { Col, Row } from 'antd'

const SearchApplicants: React.FC<{ showModal: any, setShowModal: any }> = ({
  showModal,
  setShowModal
}) => {
  return (
    <Row gutter={24}>
      <Col span={24}>
        <Row gutter={12}>
          <Col span={6} md={{ span: 8 }} lg={{ span: 7 }} xl={{ span: 6 }}>
            <Row justify="start" align="middle" style={{ height: '100%' }}>
              <Col
                style={{
                  fontSize: 'var(--headline-font-size)',
                  color: 'var(--dark-border-ultramarine)'
                }}
              >
                Applicants
              </Col>
              <Col style={{ marginLeft: '11px', cursor: 'pointer' }}>
                <TeamsMembers onClick={() => setShowModal('create')} />
              </Col>
              <Col style={{ marginLeft: '11px' }}>
                <DownloadInfo />
              </Col>
            </Row>
          </Col>
          <Col span={12} md={{ span: 8 }} lg={{ span: 9 }} xl={{ span: 5 }}>
            <Row
              justify="start"
              style={{ height: '100%' }}
              align="middle"
            >
              <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
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
                   width: '100%'
                 }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={6} md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 13 }}>
            <Row justify="end">
              <AsnButton
                type="primary"
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
        <Row justify="end" style={{ marginTop: '1.6vh' }}>
          <Col
            style={{
              border: '0.5px solid var(--dark-5)',
              padding: '8px',
              borderRadius: '6px'
            }}
          >
            Total members: 12
          </Col>
        </Row>
      </Col>
      {showModal === 'create' && <AddApplicantModal setShowModal={setShowModal} />}
    </Row>
  )
}

export default SearchApplicants
