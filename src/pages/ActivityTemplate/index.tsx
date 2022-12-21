import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Form, Radio, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { AsnButton } from '../../components/Forms/Button';
import CreateFields from '../../components/ActivityTemplate/CreateField';
import { AsnCheckbox } from '../../components/Forms/Checkbox';
import QuestionsRow from '../../components/ActivityTemplate/QuestionsRow';
import { FormFinish, Void } from '../../types/global';
import { IHelpText } from '../../types/project';
import { PATHS, VALIDATE_MESSAGES } from '../../helpers/constants';
import GetSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import useCreateNewSetting from '../../api/Activity/Template/Settings/useCreateSetting';
import useCreateSecondStepTemplate from '../../api/Activity/Template/useCreateSecondStep';
// import useUpdateSingleSetting from '../../api/Activity/Template/Settings/useUpdateSingleSetting';
// import useUpdateSettingStatus from '../../api/Activity/Template/Settings/useUpdateSettingStatus';

const ActivityTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;

  .ant-btn-primary {
    width: 100%;
    margin-top: 2rem;
  }

  .courseDescriptionInput {
    border: none;
    box-shadow: inset var(--header-box-shadow);
    border-radius: 0px;

    :hover {
      border: none !important;
    }
  }

  .ant-form {
    width: 100%;
  }
`;

const CourseTitle = styled.span`
  color: var(--dark-2);
  font-size: var(--headline-font-size);
  margin-bottom: 2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3.75rem;
  padding: 3.75rem 0rem 3.75rem;
  width: 100%;

  .ant-btn-primary {
    width: auto;
    margin-top: 0rem;
  }
`;

const FormsStructureContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3rem;

  .ant-form-item {
    margin: 0;
  }

  .ant-row {
    .ant-checkbox-inner {
      border: 3px solid var(--dark-border-ultramarine);

      ::after {
        border: 3px solid var(--white);
        border-top: 0;
        border-left: 0;
      }
    }

    .ant-checkbox-checked {
      .ant-checkbox-inner {
        color: var(--dark-border-ultramarine);
      }
    }

    .ant-checkbox-wrapper {
      margin-left: 0px;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .ant-radio-checked .ant-radio-inner {
      border-color: var(--dark-border-ultramarine);
    }

    .ant-radio-wrapper {
      margin-bottom: 1rem;
    }

    .ant-radio-inner {
      width: 20px;
      height: 20px;

      ::after {
        transform: scale(0.7);
        background-color: var(--dark-border-ultramarine);
      }
    }
    .ant-radio-group {
      display: flex;
      flex-direction: column;
    }
  }
`;

const ActivityTemplate: React.FC = () => {
  const [isVisibleAddField, setIsVisibleAddField] = useState<boolean>(false);
  const [templateData, setTemplateData] = useState<any[] | []>([]);
  const [questionType, setQuestionType] = useState('');
  const [helpTextValue, setHelpTextValue] = useState<IHelpText[] | []>([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: templateId } = useParams();

  const { data, refetch } = GetSingleTemplate(templateId, {
    onSuccess: (data: { result: any, count: any }) =>
      console.log('>>>>>>>>>>>>>')
  });

  const { mutate: createTemplateSetting } = useCreateNewSetting({
    onSuccess: (options: any) => {
      refetch();
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
      if (templateId != null) {
        navigate(`/${PATHS.COURSESECTION.replace(':id', templateId)}`);
      }
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  // const { mutate: changeSingleSettingStatus } = useUpdateSettingStatus({
  //   onSuccess: (options: any) => {
  //     console.log(options);
  //   },
  //   onError: ({ response }: any) => {
  //     // const { data: { 0: { massage } } } = response;
  //     console.log(response, 'response');
  //   }
  // });

  // const updateStatus = (): void => {
  //   changeSingleSettingStatus({ id: 'b1dd4297-63ee-41d8-9843-2784a978fb75' });
  // };

  // const { mutate: updateTemplateSetting } = useUpdateSingleSetting({
  //   onSuccess: (options: any) => {
  //     console.log(options);
  //   },
  //   onError: ({ response }: any) => {
  //     // const { data: { 0: { massage } } } = response;
  //     console.log(response, 'response');
  //   }
  // });

  // const updateSetting = (): void => {
  //   updateTemplateSetting({
  //     id: '41d1b333-711d-4d94-8312-068426d9d515',
  //     data: {
  //       answerType: 'DROPDOWN',
  //       title: 'bbbbb',
  //       data: ['as']
  //     }
  //   });
  // };

  useEffect(() => {
    setTemplateData([]);
  }, [setTemplateData]);

  const onOpenAddVisibleField: Void = () => {
    setIsVisibleAddField(true);
  };

  const onFinish: FormFinish = (values) => {
    if (templateId != null) {
      createTemplateSetting({
        id: templateId,
        data: {
          answerType: questionType,
          title: values.question,
          data: questionType === 'DROPDOWN' ? [...values.names] : []
        }
      });
    }
    setIsVisibleAddField(false);
    setQuestionType('');
    form.resetFields();
  };

  const onNextClick: Void = () => {
    console.log(templateId, 'templateId');
    createSecondStepTemplateFn({
      id: templateId,
      data: {
        applicationForm: form.getFieldValue('includeForm'),
        courseStructure: form.getFieldValue('courseStructure')
      }
    });
  };

  const initFields = [
    {
      name: ['question'],
      value:
        form.getFieldValue('question') === ''
          ? ''
          : form.getFieldValue('question')
    },
    {
      name: 'answerType',
      value:
        form.getFieldValue('answerType') === ''
          ? ''
          : form.getFieldValue('answerType')
    },
    {
      name: ['names'],
      value: ['']
    },
    {
      name: ['helpText'],
      value: ['']
    },
    {
      name: ['courseStructure'],
      value:
        form.getFieldValue('courseStructure') === undefined
          ? 'ONE_SECTION'
          : form.getFieldValue('courseStructure')
    }
  ];

  return (
    <ActivityTemplateContainer>
      <CourseTitle>Course activity template</CourseTitle>
      <Form
        fields={initFields}
        form={form}
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
      >
        {data?.courseSettingMap?.map((item: any) => (
          <QuestionsRow
            key={item.id}
            item={item}
            setTemplateData={setTemplateData}
            templateData={templateData}
            setQuestionType={setQuestionType}
            setIsVisibleAddField={setIsVisibleAddField}
            setHelpTextValue={setHelpTextValue}
            helpTextValue={helpTextValue}
            refetch={refetch}
          />
        ))}
        {!isVisibleAddField
          ? (
          <AsnButton
            className="primary"
            onClick={onOpenAddVisibleField}
            style={{ width: '100%', marginTop: '2rem' }}
          >
            +Add Field
          </AsnButton>
            )
          : (
          <CreateFields
            setIsVisibleAddField={setIsVisibleAddField}
            questionType={questionType}
            form={form}
            setQuestionType={setQuestionType}
            templateId={templateId}
          />
            )}
        <FormsStructureContainer>
          <Row style={{ marginRight: '13%' }}>
            <Col
              span={24}
              style={{
                fontSize: 'clamp(0.5rem, 2.5vw, 1.25rem)',
                color: 'var(--dark-2)',
                marginBottom: '2rem'
              }}
            >
              Include Forms
            </Col>
            <Col span={24}>
              <Form.Item name="includeForm">
                <AsnCheckbox.Group>
                  <AsnCheckbox
                    width="2rem"
                    height="2rem"
                    checkWidth="10px"
                    checkHeight="18px"
                    top="12px"
                    left="7px"
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                    value="APPLICATION"
                  >
                    Application Form
                  </AsnCheckbox>
                  <AsnCheckbox
                    width="2rem"
                    height="2rem"
                    checkWidth="10px"
                    checkHeight="18px"
                    top="12px"
                    left="7px"
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                    value="ASSESSMENT"
                  >
                    Assessment Form
                  </AsnCheckbox>
                </AsnCheckbox.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[0, 0]}>
            <Col
              span={24}
              style={{
                fontSize: 'clamp(0.5rem, 2.5vw, 1.25rem)',
                color: 'var(--dark-2)',
                marginBottom: '2rem'
              }}
            >
              Course Structure
            </Col>
            <Col span={24}>
              <Form.Item name="courseStructure">
                <Radio.Group>
                  <Radio
                    value={'ONE_SECTION'}
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                  >
                    One Section
                  </Radio>
                  <Radio
                    value={'MULTI_SECTION'}
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                  >
                    Multi-Section
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </FormsStructureContainer>
      </Form>
      <ButtonsContainer>
        <AsnButton className="default">Save as Draft</AsnButton>
        <AsnButton className="primary" onClick={onNextClick}>
          Next
        </AsnButton>
      </ButtonsContainer>
    </ActivityTemplateContainer>
  );
};

export default ActivityTemplate;
