import React from 'react';
import { Row, Col } from 'antd';
import useCreateActivityTemplate from '../../api/Activity/Template/createActivityTemplate';

const Dashboard: React.FC = () => {
  const { mutate: createTemplateFn } = useCreateActivityTemplate({
    onSuccess: (options: {
      data: {
        result: {
          id: string
          category: string
          title: string
          description: string
        }
      }
    }) => {
      const {
        data: { result }
      } = options;
      console.log(result?.id);
    },
    onError: ({ response }: any) => {
      const { data: { errors: { message } } } = response;
      console.log(message, response);
    }
  });

  const createTemplate = (): void => {
    createTemplateFn({
      id: 'f9bdc882-5118-4e78-8cb1-1b1de7b26edc',
      data: {
        category: 'COURSESddd',
        title: 'test2',
        description: 'test3 description'
      }
    });
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={createTemplate}>create Template</button>
      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
