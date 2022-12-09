import React, { FC, ReactNode } from 'react';
import dayjs from 'dayjs';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { ICreateProject } from '../../types/project';
import { useGetProjects } from '../../api/Project/useGetProjects';

const ProjectListRow = styled(Row)`
  padding: 2rem;

  .ant-col {
    padding: 1rem;
  }
`;

export const ProjectList: FC = () => {
  const navigate = useNavigate();

  const { data: { result = [], has_more: hasMore, count } = {} } = useGetProjects();

  const extraElement: (id: string) => ReactNode = (id) => <a
    onClick={(e) => {
      e.preventDefault();
      navigate(`../${id}`, { replace: true });
    }}
    style={{ marginRight: '10px' }}
  >
    Edit
  </a>;

  return (
    <>
      <Row gutter={16}>
        <Col>Count: {count}</Col>
        <Col>
          Has more: {hasMore === null || (hasMore === false) ? 'no' : 'yes'}
        </Col>
      </Row>
      <ProjectListRow gutter={16}>
        {result?.map((r: ICreateProject) => (
          <Col span={6} key={r.id}>
            <Card
              headStyle={{ background: 'var(--secondary-light-amber)' }}
              title={r.title}
              bordered={false}
              extra={extraElement(r.id)}
            >
              <p>
                <b>Description</b> {r?.description}
              </p>
              <p>
                <b>Start Date</b> {dayjs(r?.startDate).format('DD/MM/YYYY')}
              </p>
              <p>
                <b>End Date</b> {dayjs(r?.endDate).format('DD/MM/YYYY')}
              </p>
            </Card>
          </Col>
        ))}
      </ProjectListRow>
    </>
  );
};
