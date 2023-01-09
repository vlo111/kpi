import React from 'react';
import { Row, Col } from 'antd';
import getApplicationFormDefault from '../../api/ApplicationForm/useGetApplicationFormDefault';
import createApplicationForm from '../../api/ApplicationForm/useCreateApplicationForm';
import { IApplicationsOption } from '../../types/api/application/applicationForm';
import getApplicationCourse from '../../api/ApplicationForm/useGetApplicationCours';
import useUpdateApplicationForm from '../../api/ApplicationForm/useUpdateApplicationForm';
import useDeleteApplicationForm from '../../api/ApplicationForm/useDeleteApplicationForm';
import duplicateApplicationForm from '../../api/ApplicationForm/useApplicationFormDuplicate';
import updateApplicationStatus from '../../api/ApplicationForm/updateApplicationStatus';

const Dashboard: React.FC = () => {
  const oneGetApplicationFormDefault = (): any => {
    const { data, refetch } = getApplicationFormDefault(
      '3e689e1b-fc29-4893-bcd8-9f381bc0b26a',
      {}
    );
    console.log(data, 'datata', refetch);
  };

  const { mutate: createApplicationFn } = createApplicationForm({
    onSuccess: (options: IApplicationsOption) => {
      const { data } = options;
      console.log(data, 'dsssssssssssssssssss');
    },
    onError: (err: any) => {
      console.log(err);
    }
  });

  const onCreateApplicationForm = (): void => {
    createApplicationFn({
      id: '3e689e1b-fc29-4893-bcd8-9f381bc0b26a',
      data: {
        title: 'Application Form 8',
        description: 'Application form used for Python courses',
        successMessage: 'Your form has been successfully submitted',
        termsAndConditions: "['TERMS AND CONDITIONS 10','TERMS AND CONDITIONS 8']",
        onlineSignature: false,
        deadline: '2023-06-12T00:00:00.00Z',
        applicationFormSections: [
          {
            title: 'Personal details/ Անձնական տվյալներ',
            description: 'string',
            order: 1,
            keyName: 'personal',
            allowedEmpty: false,
            editable: false,
            questions: [
              {
                title: 'Personal details/ Անձնական տվյալներ',
                description: 'string',
                helpText: 'string',
                editable: false,
                required: true,
                otherOption: false,
                keyName: 'fullName',
                active: true,
                answerType: 'YES_NO',
                answers: [
                  {
                    title: 'Yes/Այո',
                    type: 'YES_NO'
                  }
                ],
                relatedQuestions: [
                  {
                    title: 'Personal details/ Անձնական տվյալներ',
                    description: 'string',
                    helpText: 'string',
                    editable: false,
                    keyName: 'fullname',
                    required: true,
                    otherOption: true,
                    active: true,
                    answerType: 'SHORT_TEXT',
                    answers: [
                      {
                        title: 'string',
                        type: 'SHORT_TEXT'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    });
  };

  const onGetApplicationCourse = (): any => {
    const { data, refetch } = getApplicationCourse(
      '3e689e1b-fc29-4893-bcd8-9f381bc0b26a',
      {}
    );
    console.log(data, 'datata', refetch);
  };

  const { mutate: updateApplicationForm } = useUpdateApplicationForm({
    onSuccess: (data: any) => {
      console.log(data);
    },
    onError: (err: any) => {
      console.log(err, 'err');
    }
  });

  const onUpdateApplicationForm = (): any => {
    updateApplicationForm({
      id: '3e689e1b-fc29-4893-bcd8-9f381bc0b26a',
      data: {
        title: 'Application Form 1',
        description: 'Application form used for Python courses',
        successMessage: 'Your form has been successfully submitted',
        termsAndConditions: "['TERMS AND CONDITIONS 1','TERMS AND CONDITIONS 2']",
        onlineSignature: false,
        deadline: '2023-06-12T00:00:00.00Z',
        applicationFormSections: [
          {
            title: 'Personal details/ Անձնական տվյալներ',
            description: 'string',
            order: 1,
            keyName: 'personal',
            allowedEmpty: false,
            editable: false,
            questions: [
              {
                title: 'Personal details/ Անձնական տվյալներ',
                description: 'string',
                helpText: 'string',
                editable: false,
                required: true,
                otherOption: false,
                keyName: 'fullName',
                active: true,
                answerType: 'YES_NO',
                answers: [
                  {
                    title: 'Yes/Այո',
                    type: 'YES_NO'
                  }
                ],
                relatedQuestions: [
                  {
                    title: 'Personal details/ Անձնական տվյալներ',
                    description: 'string',
                    helpText: 'string',
                    editable: false,
                    keyName: 'fullname',
                    required: true,
                    otherOption: true,
                    active: true,
                    answerType: 'SHORT_TEXT',
                    answers: [
                      {
                        title: 'string',
                        type: 'SHORT_TEXT'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    });
  };

  const { mutate: deleteApplicationForm } = useDeleteApplicationForm(
    {
      onSuccess: () => {
        console.log('dddddd');
      },
      onError: () => {
        console.log('gg');
      }
    }
  );

  const onDeleteApplicationForm = (): void => {
    deleteApplicationForm({ id: '' });
  };

  const { mutate: duplicateApplicationFn } = duplicateApplicationForm({
    onSuccess: (options: IApplicationsOption) => {
      const { data } = options;
      console.log(data, 'dsssssssssssssssssss');
    },
    onError: (err: any) => {
      console.log(err);
    }
  });

  const onDuplicateApplicationForm = (): void => {
    duplicateApplicationFn({ id: '', data: { result: 'string' } });
  };

  const { mutate: updateApplicationFormStatus } = updateApplicationStatus({
    onSuccess: () => {
      console.log('');
    }
  });

  const onUpdateApplicationStatus = (): void => {
    updateApplicationFormStatus({
      id: ''
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <button onClick={oneGetApplicationFormDefault}>Get Application form</button>
      <button onClick={onCreateApplicationForm}>
        Create Application form
      </button>
      <button onClick={onGetApplicationCourse}>
        Get Application course
      </button>
      <button onClick={onUpdateApplicationForm}>
        Update Application
      </button>
      <button onClick={onDeleteApplicationForm}>
        Delete Application
      </button>
      <button onClick={onDuplicateApplicationForm}>
        Duplicate Application
      </button>
      <button onClick={onUpdateApplicationStatus}>
        Update Application status
      </button>
      <Col>Dashboard</Col>
    </Row>
  );
};
export default Dashboard;
