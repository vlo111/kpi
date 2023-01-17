import React from 'react';
import { Row, Space, Button, Card, Col } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { Void } from '../../../../types/global';
import { ISubActivitiesProps } from '../../../../types/project';
import { AsnCardSubActivity } from '../../../../components/Forms/Card/SubActivityCard';
import { ReactComponent as Calendar } from '../../../../assets/icons/calendar.svg';
import { ReactComponent as Location } from '../../../../assets/icons/location.svg';
import { AsnButton } from '../../../../components/Forms/Button';
import { AssingnesFilter } from '../Filter/Assigned';
import { DateFilterCards } from '../Filter/DataPicker';
import { StatusFilter } from '../Filter/Status';

const Container = styled.div`
.ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border: none;
}
.ant-card-bordered {
    border: none;
}
`;
export const SubActivity: React.FC<ISubActivitiesProps> = ({
  subActivities,
  setCheckAll,
  setIndeterminate,
  setCheckedList,
  checkAll,
  indeterminate,
  checkedList,
  setDateSearch,
  dateSearch
}) => {
  const resetFilter: Void = () => {
    setDateSearch({
      start: true,
      from: '',
      to: ''
    });
    setCheckedList([]);
  };
  return (
    <Container>
      <Space align='baseline'>
        <StatusFilter
          setCheckAll={setCheckAll}
          setIndeterminate={setIndeterminate}
          setCheckedList={setCheckedList}
          checkAll={checkAll}
          indeterminate={indeterminate}
          checkedList={checkedList}
        />
        <AssingnesFilter />
        <DateFilterCards setDateSearch={setDateSearch} dateSearch={dateSearch} />
        <AsnButton type="link" onClick={resetFilter} style={{ fontSize: 'var(--font-size-small', color: 'var(--dark-1)' }}>Reset</AsnButton>
      </Space>
      <Space align='baseline'>
      </Space>
      <Row>
        <AsnCardSubActivity >
          <Row
            gutter={24}
            style={{
              gridGap: '41px',
              padding: '16px 0px',
              overflow: 'auto',
              height: 'calc(100vh - 61vh)'

            }}
          >
            <Button
              type="link"
              block
              style={{ color: 'var(--dark-1)', fontSize: 'var(--base-font-size)' }}
            >
              + Add Activity
            </Button>
            {subActivities?.map((item: any, i: number) => (
              <Card
                key={i}
                className={`card ${item?.subActivity?.status === 'ACTIVE'
                    ? 'INACTIVE'
                    : item?.subActivity?.status === 'DONE'
                      ? 'cardActive'
                      : ''
                  }`}
              >
                <div
                  className={`cardRound ${item?.subActivity?.status === 'ACTIVE'
                      ? 'cardRoundInactive'
                      : item?.subActivity?.status === 'DONE'
                        ? 'ACTIVE'
                        : ''
                    }`}
                >
                  {item?.cardRound}
                </div>
                <Row gutter={[8, 16]} style={{ padding: '15px 0' }}>
                  <Col style={{ color: 'var(--dark-1)', fontSize: 'var(--headline-font-size)', display: 'flex', gap: '5px' }}>{item?.title}</Col>
                  <Col style={{ display: 'flex', gap: '5px' }}>
                    <Location /> {item?.subActivity?.region?.title}
                  </Col>
                  <Col style={{ display: 'flex', gap: '5px', fontSize: '12px' }}>
                    <Calendar />{moment(item?.startDate).format('DD/MM/YY')} - {moment(item?.endDate).format('DD/MM/YY')}
                  </Col>
                  <Space size={[40, 16]} align="start">
                    <Col>{item?.subActivity?.sector?.title} </Col>
                  </Space>
                </Row>
              </Card>
            ))}
          </Row>
        </AsnCardSubActivity>
      </Row>
    </Container>
  );
};