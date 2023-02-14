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

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 4rem;
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
`;

const AssessmentFormsContent = styled.div`
  width: 72%;
  margin: 0 auto;
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

const AssessmentForms: React.FC = () => {
  const [answerType, setAnswerType] = useState('OPTION');
  const [form] = AsnForm.useForm();

  useEffect(() => {
    form.setFieldsValue({
      onlineSignature: true,
      passingScore: 0,
      questions: [
        {
          type: answerType,
          required: true,
          answers: [
            { title: '', score: 0 },
            { title: '', score: 0 }
          ]
        }
      ]
    });
  }, []);

  const onCreatedAssessment = (value: any): any => {
    console.log(value);
  };

  return (
    <AssessmentFormsContent>
      <Title level={4}>Create assessment Form</Title>
      <AsnForm
        form={form}
        id="create-assessment-AsnForm"
        onFinish={onCreatedAssessment}
        initialValues={{ questions: [''] }}
      >
        <CardContainer
          borderTop={'3px solid var(--secondary-light-amber)'}
          marginTop={'2rem'}
        >
          <AsnForm.Item>
            <CardTitle>
              Email address (same as in the submitted application form)
            </CardTitle>
            <AsnInput placeholder="Email address" />
          </AsnForm.Item>
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
                  />
                  {name === questionsLists.length - 1
                    ? (
                    <AddAssessmentButton onClick={() => add()}>
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
              <MaxScores></MaxScores>
            </Scores>
            <Scores>
              <Title level={5} style={{ fontWeight: '400' }}>
                Passing Score
              </Title>
              <AsnForm.Item name="passingScore">
                <ScoreInputNumber className="primary" />
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
        <ButtonsContainer>
          <AsnButton className="default">Cancel</AsnButton>
          <AsnButton className="default">Preview</AsnButton>
          <AsnButton className="primary" htmlType="submit">
            Publish
          </AsnButton>
        </ButtonsContainer>
      </AsnForm>
    </AssessmentFormsContent>
  );
};

export default AssessmentForms;
