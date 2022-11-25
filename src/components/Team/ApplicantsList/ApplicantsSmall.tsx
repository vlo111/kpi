import React from 'react'
import { Row, Space, Table } from 'antd'
import styled from 'styled-components'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate } from 'react-router-dom'

import { TemUsersType } from '../../../types/teams'
import { TeamList } from '../../../helpers/fakeData'
import { AsnModal } from '../../../components/Forms/Modal/index'
import { AsnButton } from '../../Forms/Button'
import { PATHS } from '../../../helpers/constants'

const ApplicantListSmall = styled(AsnModal)`
    .ant-modal-content{
        padding: 0;
        background: var(--background);
        border: 1px solid var(--dark-2);
        border-radius: 10px;
        padding: 42px 14px 16px 16px;
    }
    .ant-table-tbody>tr>td{
        border-bottom: 0.5px solid var(--dark-border-ultramarine);
    }
    .ant-table-thead>tr>th{
      display: none;
    }
    .ant-table-tbody>tr>td{
      padding: 7px 8px !important;
    }
    .ant-modal-close-x {
      position: relative;
      bottom: 8px;
      left: 2px;

      svg > path{
       fill: var(--dark-1) !important;
      }
    }
    .ant-table-wrapper{
        max-height: 216px;
        overflow-y: scroll;
        overflow-x: hidden;
        padding-right: 3px;
    }
`

const columns: ColumnsType<TemUsersType> = [
  {
    render: item => {
      return (
         <Space direction='horizontal'>
            <Space align='start'>
              <img style={{ borderRadius: '50%' }} src={item.picture} width={26} height={26} />
            </Space>
            <Space align='end' style={{ color: 'var(--dark-border-ultramarine)' }}>
               {item.name}
            </Space>
          </Space>
      )
    }
  },
  {
    dataIndex: 'status',
    render: item => {
      return (
        <Row
         justify='end'
         align='middle'
         style={{
           color: 'var(--dark-4)',
           fontSize: 'var(--font-size-small)'
         }
         }
         >
          {item}
        </Row>
      )
    }
  }
]

const ApplicantsListSmall: React.FC<{ setShowModal: any }> = ({ setShowModal }) => {
  const navigate = useNavigate()
  return (
        <ApplicantListSmall
         open={true}
         width={'396px'}
         onCancel={() => setShowModal(false)}
         mask={false}
         footer={false}
        >
           <Table
              columns={columns}
              dataSource={TeamList()}
              size="middle"
              pagination={false}
            />
            <Row justify='center' align='middle' style={{ marginTop: '16px' }}>
               <AsnButton
                 type="primary"
                 htmlType="submit"
                 onClick={() => navigate(PATHS.TEAMS)}
                >
                  Manage users
               </AsnButton>
             </Row>
        </ApplicantListSmall>
  )
}

export default ApplicantsListSmall
