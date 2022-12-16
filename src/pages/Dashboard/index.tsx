import React from 'react';
import { Row, Col } from 'antd';
import useCreateActivityTemplate from '../../api/Activity/Template/useCreateActivityTemplate';
import { ICreateTemplateResponse } from '../../types/api/activity/template';
import GetTemplates from '../../api/Activity/Template/useGetActivityTemplates';
import GetSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import usePublishActivityTemplate from '../../api/Activity/Template/usePublishActivityTemplate';
import useCreateSecondStepTemplate from '../../api/Activity/Template/useCreateSecondStep';
import useCreateRequiredDocs from '../../api/Activity/Template/Sections/useCreateRequiredDocs';
import useDeleteRequiredDocs from '../../api/Activity/Template/Sections/useDeleteRequiredDoc';
import useDeleteActivityTemplate from '../../api/Activity/Template/useDeleteActivityTemplate';
import useCreateNewSetting from '../../api/Activity/Template/Settings/useCreateSetting';
import useUpdateSingleSetting from '../../api/Activity/Template/Settings/useUpdateSingleSetting';
import useUpdateSettingStatus from '../../api/Activity/Template/Settings/useUpdateSettingStatus';

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

  const { mutate: createTemplateSetting } = useCreateNewSetting({
    onSuccess: (options: any) => {
      console.log(options);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const { mutate: updateTemplateSetting } = useUpdateSingleSetting({
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

  const { mutate: changeSingleSettingStatus } = useUpdateSettingStatus({
    onSuccess: (options: any) => {
      console.log(options);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const { mutate: deleteTemplateById } = useDeleteActivityTemplate({
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
    '8dde47a4-639b-4918-8f43-fb8555323e14',
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
        title: 'images',
        count: 15
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

  const createSetting = (): void => {
    createTemplateSetting({
      id: '8dde47a4-639b-4918-8f43-fb8555323e14',
      data: {
        answerType: 'DROPDOWN',
        title: 'drop',
        data: ['drop text']
      }
    });
  };

  const updateSetting = (): void => {
    updateTemplateSetting({
      id: '41d1b333-711d-4d94-8312-068426d9d515',
      data: {
        answerType: 'DROPDOWN',
        title: 'bbbbb',
        data: ['as']
      }
    });
  };

  const updateStatus = (): void => {
    changeSingleSettingStatus({ id: 'b1e4ed4c-e967-4b3c-86c1-5b83847dea76' });
  };

  const deleteTemplate = (): void => {
    deleteTemplateById({ id: '48319c4f-8771-443c-a05f-f766c6d6542a' });
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={createTemplate}>create Template</button>
      <button onClick={refetch}>GET single</button>
      <button onClick={onPub}>Publish Template</button>
      <button onClick={createSecond}>create step 2</button>
      <button onClick={createDocs}>Create Docs</button>
      <button onClick={deleteDoc}>delete Doc by Id</button>
      <button onClick={deleteTemplate}>delete template</button>
      <button onClick={createSetting}>Create Settings</button>
      <button onClick={updateSetting}>Update Settings</button>
      <button onClick={updateStatus}>Update Settings</button>
      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
