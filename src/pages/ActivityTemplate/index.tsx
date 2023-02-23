import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Form, Radio, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { AsnButton } from '../../components/Forms/Button';
import CreateFields from '../../components/ActivityTemplate/CreateField';
import { AsnCheckbox } from '../../components/Forms/Checkbox';
import QuestionsRow from '../../components/ActivityTemplate/QuestionsRow';
import { FormFinish, IActivityResult, Void } from '../../types/global';
import { ICreatedFieldItem, IHelpText } from '../../types/project';
import { PATHS, VALIDATE_MESSAGES } from '../../helpers/constants';
import getSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import useCreateNewSetting from '../../api/Activity/Template/Settings/useCreateSetting';
import useCreateSecondStepTemplate from '../../api/Activity/Template/useCreateSecondStep';
import useUpdateSingleSetting from '../../api/Activity/Template/Settings/useUpdateSingleSetting';
import _ from 'lodash';

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
  const [questionType, setQuestionType] = useState('');
  const [helpTextValue, setHelpTextValue] = useState<IHelpText[] | []>([]);
  const [rowItem, setRowItem] = useState<ICreatedFieldItem | null>(null);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id: templateId } = useParams<{ id: string | undefined }>();

  const { data, refetch } = getSingleTemplate(templateId, {});

  const { mutate: createTemplateSetting } = useCreateNewSetting({
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: createSecondStepTemplateFn } = useCreateSecondStepTemplate({
    onSuccess: (options: IActivityResult<ICreatedFieldItem>) => {
      const {
        data: { result }
      } = options;
      navigate(`/${PATHS.COURSESECTION.replace(':id', result?.id)}`);
    }
  });

  const { mutate: updateTemplateSetting } = useUpdateSingleSetting({
    onSuccess: () => {
      refetch();
    }
  });

  const onOpenAddVisibleField: Void = () => {
    setIsVisibleAddField(true);
  };

  const onSaveDraft: Void = () => {
    navigate(
      `/${PATHS.PROJECT}/${PATHS.OVERVIEW.replace(':id', data?.projectId)}`
    );
  };

  const onFinish: FormFinish = (values) => {
    if (templateId != null) {
      if (rowItem !== null) {
        updateTemplateSetting({
          id: rowItem.setting.id,
          data: {
            answerType:
              values.answerType === 'Short Text'
                ? 'SHORT_TEXT'
                : values.answerType === 'Number'
                  ? 'NUMBER'
                  : values.answerType === 'Attachment'
                    ? 'ATTACHMENT'
                    : 'DROPDOWN',
            title: values.question,
            data: questionType === 'DROPDOWN' ? [...values.names] : []
          }
        });
        form.resetFields();
      } else {
        createTemplateSetting({
          id: templateId,
          data: {
            answerType:
              values.answerType === 'Short Text'
                ? 'SHORT_TEXT'
                : values.answerType === 'Number'
                  ? 'NUMBER'
                  : values.answerType === 'Attachment'
                    ? 'ATTACHMENT'
                    : 'DROPDOWN',
            title: values.question,
            data: questionType === 'DROPDOWN' ? [...values.names] : []
          }
        });
      }
    }
    setIsVisibleAddField(false);
    setQuestionType('');
    setRowItem(null);
    form.resetFields();
  };

  const onNextClick: Void = () => {
    if (
      data?.sections?.length !== 0 &&
      _.isEqual(form.getFieldValue('includeForm'), data?.applicationForm) &&
      data?.courseStructure === form.getFieldValue('courseStructure')
    ) {
      if (templateId !== undefined) {
        navigate(`/${PATHS.COURSESECTION.replace(':id', templateId)}`);
      }
    } else {
      if (templateId !== undefined) {
        createSecondStepTemplateFn({
          id: templateId,
          data: {
            applicationForm: form.getFieldValue('includeForm'),
            courseStructure: form.getFieldValue('courseStructure')
          }
        });
      }
    }
  };

  useEffect(() => {
    if (rowItem !== null) {
      form.setFieldsValue({
        question: rowItem.setting.title,
        answerType:
          rowItem.setting.answerType === 'SHORT_TEXT'
            ? 'Short Text'
            : rowItem.setting.answerType === 'NUMBER'
              ? 'Number'
              : rowItem.setting.answerType === 'ATTACHMENT'
                ? 'Attachment'
                : 'Dropdown options',
        names:
          rowItem.setting.answerType === 'DROPDOWN' ? rowItem.setting.data : []
      });
    }
  }, [rowItem]);

  useEffect(() => {
    if (data?.courseStructure !== null && data?.applicationForm !== null) {
      form.setFieldsValue({
        includeForm: data?.applicationForm,
        courseStructure:
          form.getFieldValue('courseStructure') === undefined
            ? 'ONE_SECTION'
            : form.getFieldValue('courseStructure')
      });
    }
  }, [data]);

  return (
    <ActivityTemplateContainer>
      <CourseTitle>Course activity template</CourseTitle>
      <Form
        form={form}
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ names: [''] }}
      >
        {data?.courseSettingMap?.map((item: ICreatedFieldItem) => (
          <QuestionsRow
            key={item.id}
            item={item}
            setQuestionType={setQuestionType}
            setIsVisibleAddField={setIsVisibleAddField}
            setHelpTextValue={setHelpTextValue}
            helpTextValue={helpTextValue}
            refetch={refetch}
            setItem={setRowItem}
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
            item={rowItem}
            setQuestionType={setQuestionType}
            setItem={setRowItem}
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
                <AsnCheckbox.Group disabled={data?.status === 'PUBLISHED'}>
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
                <Radio.Group disabled={data?.status === 'PUBLISHED'}>
                  <Radio
                    value={'ONE_SECTION'}
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                  >
                    One Phase
                  </Radio>
                  <Radio
                    value={'MULTI_SECTION'}
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                  >
                    Multi-Phase
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </FormsStructureContainer>
      </Form>
      <ButtonsContainer>
        <AsnButton className="default" onClick={onSaveDraft}>
          Save as Draft
        </AsnButton>
        <AsnButton className="primary" onClick={onNextClick}>
          Next
        </AsnButton>
      </ButtonsContainer>
    </ActivityTemplateContainer>
  );
};

export default ActivityTemplate;
