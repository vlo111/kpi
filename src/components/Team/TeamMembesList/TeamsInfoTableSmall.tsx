import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { ShowAddUserModalTypes, TemUsersType } from '../../../types/teams';
import { AsnButton } from '../../Forms/Button';
import { PATHS } from '../../../helpers/constants';
import { ApplicantListSmall } from '../Styles';

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
      );
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
      );
    }
  }
];

const ApplicantsListSmall: React.FC<ShowAddUserModalTypes> = ({ setShowModal }) => {
  const navigate = useNavigate();
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
              dataSource={[]}
              size="middle"
              pagination={false}
            />
            <Row justify='center' align='middle' style={{ marginTop: '16px' }}>
               <AsnButton
                 type="primary"
                 className="primary"
                 htmlType="submit"
                 onClick={() => navigate(PATHS.TEAMS)}
                >
                  Manage users
               </AsnButton>
             </Row>
        </ApplicantListSmall>
  );
};

export default ApplicantsListSmall;
