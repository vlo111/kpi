import { Card, Col, Row } from 'antd';
import React from 'react';
import { useGetProjects } from '../../api/Project/useGetProjects';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ProjectListRow = styled(Row)`
  padding: 2rem;
  
  .ant-col {
    padding: 1rem;
  }
`;

interface Result {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  stepStatus: string
}

export const ProjectList: React.FC = () => {
  const navigate = useNavigate();

  const {
    data: { data: { result = [], has_more: hasMore, count } } = { data: { result: [], has_more: null, count: null } }
  } = useGetProjects();

  return (
    <>
      <Row gutter={16}>
        <Col>
          Count: {count}
        </Col>
        <Col>
          Has more: {(hasMore === null || hasMore === false) ? 'no' : 'yes'}
        </Col>
      </Row>
      <ProjectListRow gutter={16}>
        {result.map(
          (r: Result) => (
            <Col span={8} key={r.id}>
              <Card title={r.title} bordered={false} extra={<><div onClick={() => {
                navigate(`../${r.id}`, { replace: true });
              }} style={{ marginRight: '10px' }}>Edit</div> <a href="#">Delete</a></>}>
                {Object.keys(r).map((e: string) => <p key={r.id + e}>{e}: {(r as any)[e]}</p>)}
              </Card>
            </Col>
          )
        )}
      </ProjectListRow>
    </>
  );
};
