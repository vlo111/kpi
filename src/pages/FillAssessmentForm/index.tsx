import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Typography } from 'antd';
import styled from 'styled-components';

import OptionType from './OptionType';
import ShortTextType from './ShortTextType';
import AsnSpin from '../../components/Forms/Spin';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import { VALIDATE_MESSAGES } from '../../helpers/constants';
import { TVoid } from '../../types/global';
import useGetAssessmentForm from '../../api/AssessmentForm/useGetAssessmentForm';

const AsnModal = styled(Modal)`
  .ant-modal-content{
   border-radius: 10px;
   box-shadow: var( --assessment-form-box-shadow);
  }
`;
const { Title, Paragraph } = Typography;

const AsnTitle = styled(Title)`
  &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: 40px;
  }
  text-align: center;
`;
const AsnParagraph = styled(Paragraph)`
  &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: 24px;
  }
   text-align: center;
`;

const FillAssessMentForm: React.FC = () => {
  // id 0c83f395-3a58-4334-8abd-530e98e4b25c
  const [form] = AsnForm.useForm();
  const { id } = useParams();
  const { data: { result: assessmentForm }, isLoading } = useGetAssessmentForm(id, { enabled: Boolean(id) });

  const onFinish: TVoid = (values) => {
    console.log(values, 'values');
  };

  if (isLoading === true) {
    return <AsnSpin />;
  }
  const { title, questions } = assessmentForm;
  console.log(questions, 'questions');
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleQuestionType = (question: any, i: any) => {
    if (question.answerType === 'SHORT_TEXT') {
      return <ShortTextType question={question} i={i} />;
    }
    if (question.answerType === 'OPTION') {
      return <OptionType question={question} i={i} />;
    }
  };
  const initalValue =
    [
      ...questions.map((question: any) => {
        return {
          questionId: question.id,
          answers: question.answerType === 'SHORT_TEXT'
            ? [{
                text: ''
              }]
            : question.answers.map((item: any) => {
              if (item.type === 'SHORT_TEXT') {
                return {
                  id: item.id,
                  text: ''
                };
              } else {
                return {
                  id: item.id
                };
              }
            })
        };
      })
    ];

  // const onFinishFailed = ({ errorFields }) => {
  //   console.log(errorFields);
  // };
  return (
    <AsnModal
      open={true}
      width={'80vw'}
      maskStyle={{ backgroundColor: 'var(--assessment-form-background)' }}
      closable={false}
      footer={false}
    >
      <AsnTitle level={2}>{title}</AsnTitle>
      <AsnParagraph>Pre-assessment form for python course</AsnParagraph>
      <AsnForm
        form={form}
        layout='vertical'
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      >
        <AsnForm.List name='apply' initialValue={[initalValue]}>
          {(fields) => (
            <div>
              {questions.map((question: any, i: any) => (
                handleQuestionType(question, i)
              ))}
            </div>
          )}
        </AsnForm.List>
        <AsnButton className="primary" htmlType="submit">Submit</AsnButton>
      </AsnForm>
    </AsnModal>
  );
};

export default FillAssessMentForm;
