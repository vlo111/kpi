import React from 'react';
import { Row, Col } from 'antd';
import useCreateActivityTemplate from '../../api/Activity/Template/createActivityTemplate';
import { ICreateTemplateResponse } from '../../types/api/activity/template';

const Dashboard: React.FC = () => {
  const { mutate: createTemplateFn, isLoading } = useCreateActivityTemplate({
    onSuccess: (options: ICreateTemplateResponse) => {
      const {
        data: { result }
      } = options;
      console.log(result?.id);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  console.log(isLoading, 'loading');

  const createTemplate = (): void => {
    createTemplateFn({
      id: 'f9bdc882-5118-4e78-8cb1-1b1de7b26edc',
      data: {
        category: 'COURSESxxx',
        title: 'test4',
        description: 'test4 description'
      }
    });
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={createTemplate}>create Template</button>
      <button>GET single</button>
      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
