import React from 'react';
import { Row, Col } from 'antd';
import useCreateActivityTemplate from '../../api/Activity/Template/useCreateActivityTemplate';
import { ICreateTemplateResponse } from '../../types/api/activity/template';
import GetTemplates from '../../api/Activity/Template/useGetActivityTemplates';
import GetSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import usePublishActivityTemplate from '../../api/Activity/Template/usePublishActivityTemplate';
import useCreateSecondStepTemplate from '../../api/Activity/Template/useCreateSecondStep';
import useCreateRequiredDocs from '../../api/Activity/Sections/useCreateRequiredDocs';
import useDeleteRequiredDocs from '../../api/Activity/Sections/useDeleteRequiredDoc';

const Dashboard: React.FC = () => {
  const { mutate: createTemplateFn } = useCreateActivityTemplate({
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

  const { mutate: createSecondStepTemplateFn } = useCreateSecondStepTemplate({
    onSuccess: (options: any) => {
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

  const { mutate: publishTemplate } = usePublishActivityTemplate({
    onSuccess: (options: any) => {
      console.log(options);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const { mutate: createRequiredDocs } = useCreateRequiredDocs({
    onSuccess: (options: any) => {
      console.log(options);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const { mutate: deleteDocumentById } = useDeleteRequiredDocs({
    onSuccess: (options: any) => {
      console.log(options);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const { isLoading } = GetTemplates(
    '5167d849-d674-4a3b-88d5-5aa84c7c319a',
    {
      onSuccess: (data: { result: any, count: any }) =>
        console.log(data)
    }
  );

  const { isLoading: loadSingle, refetch } = GetSingleTemplate(
    '63b15c87-17d7-46aa-aedf-3165c94f09f2',
    {
      onSuccess: (data: { result: any, count: any }) =>
        console.log(data)
    }
  );
  console.log(loadSingle, isLoading);

  const onPub = (): void => {
    publishTemplate({ id: '63b15c87-17d7-46aa-aedf-3165c94f09f2' });
  };

  const createDocs = (): void => {
    createRequiredDocs({
      id: '3c58a57c-f919-4a52-a659-55e1b86ce59a',
      data: {
        title: 'test',
        count: 8
      }
    });
  };

  const createTemplate = (): void => {
    createTemplateFn({
      id: '5167d849-d674-4a3b-88d5-5aa84c7c319a',
      data: {
        category: 'COURSES',
        title: 'not Publish',
        description: 'not Publish !!!!!!'
      }
    });
  };

  const createSecond = (): void => {
    createSecondStepTemplateFn({
      id: '63b15c87-17d7-46aa-aedf-3165c94f09f2',
      data: {
        applicationForm: ['ASSESSMENT'],
        courseStructure: 'ONE_SECTION'
      }
    });
  };

  const deleteDoc = (): void => {
    deleteDocumentById({ id: 'ff5f20d3-29c4-4238-8393-efe99f6b6a57' });
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={createTemplate}>create Template</button>
      <button onClick={refetch}>GET single</button>
      <button onClick={onPub}>Publish Template</button>
      <button onClick={createSecond}>create step 2</button>
      <button onClick={createDocs}>Create Docs</button>
      <button onClick={deleteDoc}>delete Doc by Id</button>
      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
