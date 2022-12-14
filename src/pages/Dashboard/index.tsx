import React from 'react';
import { Row, Col } from 'antd';
import useCreateActivityTemplate from '../../api/Activity/Template/createActivityTemplate';
import { ICreateTemplateResponse } from '../../types/api/activity/template';
import GetTemplates from '../../api/Activity/Template/getActivityTemplates';
import GetSingleTemplate from '../../api/Activity/Template/getSingleActivityTemplate';

const Dashboard: React.FC = () => {
  const { mutate: createTemplateFn, isLoading: LoadMutation } = useCreateActivityTemplate({
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
  console.log(LoadMutation);

  const getActivityTemplates = (): void => {

  };
  const { isLoading, refetch } = GetTemplates(
    { id: 'efc5016f-a9a0-4b73-bd22-b34ec30e12ef' },
    {
      onSuccess: (data: { result: any, count: any }) =>
        console.log(data)
    }
  );

  const { isLoading: loadSingle } = GetSingleTemplate(
    { id: 'bfbdb939-407b-4427-ac89-ef7aab57eb0d' },
    {
      onSuccess: (data: { result: any, count: any }) =>
        console.log(data)
    }
  );
  console.log(loadSingle, isLoading);

  const createTemplate = (): void => {
    createTemplateFn({
      id: 'efc5016f-a9a0-4b73-bd22-b34ec30e12ef',
      data: {
        category: 'COURSES',
        title: 'test 2',
        description: 'test 2 description'
      }
    });
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={createTemplate}>create Template</button>
      <button onClick={refetch}>GET single</button>
      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
