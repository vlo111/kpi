import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import type { ColumnsType } from 'antd/es/table'
import { TemUsersType } from '../../../types/teams'
import { TeamList } from '../../../helpers/fakeData'
import { AsnModal } from '../../../components/Forms/Modal/index'
import { AsnButton } from '../../Forms/Button'

const ApplicantListSmall = styled(AsnModal)`
    .ant-modal-content{
        padding: 0;
        background: var(--background);
        border: 1px solid #263238;
        border-radius: 10px;
        padding: 44px 16px 15px 16px;
    }
    .ant-table-tbody>tr>td{
        border-bottom: 0.5px solid #EDF0F4;

        .user_icon{
            display: flex;
            text-align: center;
            align-items: center;

            img{
                width: 26px;
                height: 26px;
                justify-content: center;
                border-radius: 50%;
            }
            p{
                padding: 0;
                margin: 0;
                margin-left: 7px;
                font-weight: 400;
                font-size: 16px;
                color: var(--dark-2);
            }
        }
        p {
            font-weight: 400;
            font-size: 12px;
            color: var(--dark-4);
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: flex-end;
        }
    }
    .ant-table-thead>tr>th{
      display: none;
    }
    .ant-table-tbody>tr>td{
      padding: 2px 8px !important;
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
    }
    .managed_users{
        display: flex;
        justify-content: center;
        margin-top: 16px;
    }
`

const columns: ColumnsType<TemUsersType> = [
  {
    render: item => {
      return (
        <div className='user_icon'>
          <img src={item.picture} />
          <p>{item.name}</p>
        </div>
      )
    }
  },
  {
    dataIndex: 'status',
    render: item => {
      return (
        <p>{item}</p>
      )
    }
  }
]

const ApplicantsListSmall: React.FC<{ showModal: boolean, setShowModal: any }> = ({ showModal, setShowModal }) => {
  return (
        <ApplicantListSmall
         open={showModal}
         width={'360px'}
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
            <div className='managed_users'>
            <AsnButton type="primary" htmlType="submit">
               Manage users
            </AsnButton>
            </div>
        </ApplicantListSmall>
  )
}

export default ApplicantsListSmall
