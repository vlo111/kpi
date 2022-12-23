import React from 'react';
import { Row, Space, Button, Card, Col } from 'antd';
import styled from 'styled-components';
import { AsnCardSubActivity } from '../../../../components/Forms/Card/SubActivityCard';
import { ReactComponent as Calendar } from '../../../../assets/icons/calendar.svg';
import { ReactComponent as Location } from '../../../../assets/icons/location.svg';

const Container = styled.div`
.ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border: none;
}
.ant-card-bordered {
    border: none;
}
`;
export const SubActivity: React.FC = () => {
  return (
    <Container>
      <Space align='baseline'>
      </Space>
      <Row>
        <AsnCardSubActivity >
              <Row
         gutter={24}
         style={{
           gridGap: '41px',
           height: '50.5vh',
           padding: '16px 0px'
         }}
       >
         <Button
           type="link"
           block
           style={{ color: 'var(--dark-1)', fontSize: 'var(--base-font-size)' }}
         >
           + Add Activity
         </Button>
         {[].map((data: any) => (
           <>
             <Card
               key={1}
               className={`card ${
                 data.status === 'active'
                   ? 'cardInactive'
                   : data.status === 'done'
                   ? 'cardActive'
                   : ''
               }`}
             >
               <div
                 className={`cardRound ${
                   data.status === 'active'
                     ? 'cardRoundInactive'
                     : data.status === 'done'
                     ? 'active'
                     : ''
                 }`}
               >
                 {data.cardRound}
               </div>
               <Row gutter={[8, 16]} style={{ padding: '15px 0' }}>
                 <Col style={{ color: 'var(--dark-1)', fontSize: 'var(--headline-font-size)', display: 'flex', gap: '5px' }}>{data.cardTitle}</Col>
                 <Col style={ { display: 'flex', gap: '5px' }}>
                   {' '}
                   <Location /> {data.location}
                 </Col>
                 <Col style={ { display: 'flex', gap: '5px' }}>
                   {' '}
                   <Calendar /> {data.startDate} {data.endDate}
                 </Col>
                 <Space size={[40, 16]} align="start">
                   <Col>IT </Col>
                 </Space>
               </Row>
             </Card>
           </>
         ))}
       </Row>
        </AsnCardSubActivity>
      </Row>
    </Container>
  );
};
