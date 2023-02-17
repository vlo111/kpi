import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Space, Tooltip, Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnInput, AsnInputNumber } from '../../Forms/Input';
import AssessmentFormItems from '../FormList';
import { ICardContainer } from '../../../types/api/application/applicationForm';
import { ReactComponent as AddAssessmentIcon } from '../../../assets/icons/add-assessment.svg';
import { AsnButton } from '../../Forms/Button';
import { AsnSwitch } from '../../Forms/Switch';
import { IButtonContainer } from '../../../types/api/assessment';
import { useLocation, useParams } from 'react-router-dom';
import CreateAssessmentFormDataByCourseId from '../../../api/AssessmentForm/useCreateAssessmentFormCourseId';
import AssessmentFormUrlModal from '../FormUrlModal/Index';
import PreviewAssessmentForm from '../../PreviewAssessmentForm';

const { Title } = Typography;

export const CardContainer = styled.div<ICardContainer>`
  width: 100%;
  border-top: ${(props) => props.borderTop};
  margin-top: ${(props) => (props.marginTop != null ? props.marginTop : 0)};
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  background-color: var(--white);
  padding: 1rem 1rem 2rem;
  margin-bottom: ${(props) => props.marginBottom};

  .ant-form-item {
    margin: 0;
  }
`;

export const CardTitle = styled(Typography.Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const ScoreInputNumber = styled(AsnInputNumber)`
  display: flex;
  align-items: center;
  border-radius: 2px !important;
`;

export const ButtonsContainer = styled.div<IButtonContainer>`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(props) => props.marginTop};
  gap: 60px;
`;

export const Scores = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
`;

export const MaxScores = styled.div`
  width: 90px;
  height: 44px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--base-font-size);
`;

const AssessmentFormsContent = styled.div`
  width: 72%;
  margin: 0 auto;
  margin-bottom: 4rem;
  h4 {
    text-align: center;
    font-weight: var(--font-semibold);
    font-size: var(--headline-font-size);
  }
`;

export const AddAssessmentButton = styled.div`
  display: flex;
  background-color: var(--white);
  padding: 10px;
  height: fit-content;
  border-radius: 16px;
  margin-left: 0.5rem;
  margin-top: 2rem;
  cursor: pointer;
  position: absolute;
  left: 100%;
`;

export const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormInput = styled(AsnInput)`
  border: none;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: var(--base-box-shadow);
`;

const AssessmentForms: React.FC = () => {
  const [answerType, setAnswerType] = useState('OPTION');
  const [formUrlModal, setFormUrlModal] = useState(false);
  const [isPreviewForm, setIsPreviewForm] = useState(false);
  const [allScore, setAllScore] = useState(0);
  const [responseDataId, setResponseDataId] = useState();
  const [form] = AsnForm.useForm();
  const location = useLocation();
  const { id: courseId } = useParams<{ id: any }>();

  const { mutate: createAssessmentForm } = CreateAssessmentFormDataByCourseId({
    onSuccess: (responseData: any) => {
      setResponseDataId(responseData.data);
      setFormUrlModal(true);
    }
  });

  useEffect(() => {
    form.setFieldsValue({
      onlineSignature: true,
      title: '',
      passingScore: 0,
      questions: [
        {
          answerType,
          required: true,
          answers: [
            {
              title: '',
              score: 0,
              type: answerType
            },
            {
              title: '',
              score: 0,
              type: answerType
            }
          ]
        }
      ]
    });
  }, []);

  const onAddQuestion = (add: any): void => {
    setAnswerType('OPTION');
    add({
      answerType: 'OPTION',
      answers: [
        {
          title: '',
          score: 0,
          type: 'OPTION'
        },
        {
          title: '',
          score: 0,
          type: 'OPTION'
        }
      ],
      required: true,
      title: ''
    });
  };

  const onCreatedAssessmentFinish = (value: any): any => {
    createAssessmentForm({
      id: courseId,
      data: {
        maximumScore: allScore,
        type: location?.state.type,
        duplicate: false,
        ...value
      }
    });
  };

  return (
    <AssessmentFormsContent>
      <Title level={4}>Create assessment Form</Title>
      <AsnForm
        form={form}
        id="create-assessment-AsnForm"
        onFinish={onCreatedAssessmentFinish}
        initialValues={{ questions: [''] }}
      >
        <CardContainer
          borderTop={'3px solid var(--secondary-light-amber)'}
          marginTop={'2rem'}
        >
          <CardTitle>Form title</CardTitle>
          <AsnForm.Item
            name="title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <FormInput placeholder="Title" />
          </AsnForm.Item>
        </CardContainer>
        <CardContainer
          borderTop={'3px solid var(--secondary-light-amber)'}
          marginTop={'2rem'}
        >
          <CardTitle>
            Email address (same as in the submitted application form)
          </CardTitle>
          <FormInput placeholder="Email address" disabled={true} />
        </CardContainer>
        <AsnForm.List name="questions">
          {(questionsLists, { add, remove }) => (
            <FormItemContainer>
              {questionsLists.map(({ key, name, ...restField }) => (
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  <AssessmentFormItems
                    {...restField}
                    key={key}
                    name={[name, 'answers']}
                    add={add}
                    remove={remove}
                    answerType={answerType}
                    setAnswerType={setAnswerType}
                    questionsLists={questionsLists}
                    setAllScore={setAllScore}
                  />
                  {name === questionsLists.length - 1
                    ? (
                    <AddAssessmentButton onClick={() => onAddQuestion(add)}>
                      <Tooltip
                        placement="topLeft"
                        title={<span>Add a question</span>}
                        overlayClassName="tooltipHelper"
                      >
                        <AddAssessmentIcon />
                      </Tooltip>
                    </AddAssessmentButton>
                      )
                    : null}
                </div>
              ))}
            </FormItemContainer>
          )}
        </AsnForm.List>
        <CardContainer
          marginTop={'2rem'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '2rem 1rem '
          }}
        >
          <Space>
            <Scores>
              <Title level={5} style={{ fontWeight: '400' }}>
                Maximum Score
              </Title>
              <MaxScores>{allScore}</MaxScores>
            </Scores>
            <Scores>
              <Title level={5} style={{ fontWeight: '400' }}>
                Passing Score
              </Title>
              <AsnForm.Item name="passingScore">
                <ScoreInputNumber className="primary" min={0} max={allScore} />
              </AsnForm.Item>
            </Scores>
          </Space>
          <Scores>
            <Title level={5} style={{ fontWeight: '400' }}>
              Online signature
            </Title>
            <AsnForm.Item name="onlineSignature" valuePropName="checked">
              <AsnSwitch />
            </AsnForm.Item>
          </Scores>
        </CardContainer>
        <ButtonsContainer marginTop="4rem">
          <AsnButton className="default">Cancel</AsnButton>
          <AsnButton className="default" onClick={() => setIsPreviewForm(true)}>
            Preview
          </AsnButton>
          <AsnButton className="primary" htmlType="submit">
            Publish
          </AsnButton>
        </ButtonsContainer>
      </AsnForm>
      <AssessmentFormUrlModal
        formUrlModal={formUrlModal}
        setFormUrlModal={setFormUrlModal}
        responseIds={responseDataId}
      />
      <PreviewAssessmentForm
        isPreviewForm={isPreviewForm}
        setIsPreviewForm={setIsPreviewForm}
        createAssessmentForm={createAssessmentForm}
        courseId={courseId}
        data={{
          maximumScore: allScore,
          type: location?.state.type,
          duplicate: false,
          ...form.getFieldsValue()
        }}
      />
    </AssessmentFormsContent>
  );
};

export default AssessmentForms;
