import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import type { ColumnsType } from 'antd/es/table'
import { TemUsersType } from '../../../types/teams'
import { TeamList } from '../../../helpers/fakeData'
import { AsnModal } from '../../../components/Forms/Modal/index'
import { AsnButton } from '../../Forms/Button'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  return (
        <ApplicantListSmall
         open={showModal}
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
            <div className='managed_users'>
            <AsnButton
              type="primary"
              htmlType="submit"
              onClick={() => navigate('/teams')}
             >
               Manage users
            </AsnButton>
            </div>
        </ApplicantListSmall>
  )
}

export default ApplicantsListSmall
