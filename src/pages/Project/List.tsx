import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Space, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { PATHS } from '../../helpers/constants';
import { ICreateProject } from '../../types/project';
import useGetProjects from '../../api/Project/useGetProjects';

const { Title } = Typography;

export const ProjectList: FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState({ data: [], totalRecords: 0 });

  const { isLoading } = useGetProjects(
    {},
    {
      onSuccess: (data: { result: any, count: any }) =>
        setResult((prev) => ({
          data: data.result,
          totalRecords: data.count
        })),
      enabled: true
    }
  );
  const handleEdit = (id: string): void => {
    navigate(`/${PATHS.PROJECT}/${id}`);
  };
  console.log(result);
  return (
    <Spin spinning={isLoading}>
      <Space direction="vertical">
        <Row gutter={[16, 16]}>
          <Col span={4} offset={1}>
            <Title level={5}>Count: {result?.totalRecords}</Title>
          </Col>
        </Row>
        <Row gutter={16}>
          {result?.data?.map((item: ICreateProject) => (
            <Col span={6} key={item?.id}>
              <Card
                headStyle={{ background: 'var(--secondary-light-amber)' }}
                title={
                  <Space
                    direction="horizontal"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                  >
                    {item?.title}{' '}
                    <a onClick={() => handleEdit(item?.id)}> Edit</a>
                  </Space>
                }
                bordered={false}
              >
                <p>
                  <b>Description</b> {item?.description}
                </p>
                <p>
                  <b>Start Date</b>
                  {dayjs(item?.startDate).format('DD/MM/YYYY')}
                </p>
                <p>
                  <b>End Date</b> {dayjs(item?.endDate).format('DD/MM/YYYY')}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </Spin>
  );
};
