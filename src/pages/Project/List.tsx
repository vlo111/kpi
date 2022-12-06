import { Card, Col, Row } from 'antd';
import React from 'react';
import { useGetProject } from '../../api/Project/useGetProjects';

export const ProjectList: React.FC = () => {
  const {
    data: { data: { result = [], has_more, count } } = { data: { result: [], has_more: null, count: null } }
  } = useGetProject();

  console.log(result);
  return (
    <Row gutter={16}>
      {result.map(
        (result: {
          id: React.Key
          title: string
          description: string
          startDate: string
          endDate: string
        }) => (
          <Col span={8} key={result.id}>
            <Card title={result.title} bordered={false}>
              <p>{result.description}</p>
              <p>{result.startDate}</p>
              <p>{result.endDate}</p>
            </Card>
          </Col>
        )
      )}
    </Row>
  );
};
