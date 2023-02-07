import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Typography, Space } from 'antd';
import styled from 'styled-components';

import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import AsnSpin from '../../components/Forms/Spin';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import CheckBoxType from './CheckBoxType';
import OptionType from './OptionType';
import ShortTextType from './ShortTextType';
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
  const [form] = AsnForm.useForm();
  const { id } = useParams();
  const { data: { result: assessmentForm }, isLoading } = useGetAssessmentForm(id, { enabled: Boolean(id) });

  const onFinish: TVoid = (values) => {
    console.log(values, 'values');
  };

  if (isLoading === true) {
    return <AsnSpin />;
  }

  const { title, questions, sectionDataTitle } = assessmentForm;
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleQuestionType = (question: any, i: any) => {
    if (question.answerType === 'SHORT_TEXT') {
      return <ShortTextType question={question} i={i} />;
    }
    if (question.answerType === 'OPTION') {
      return <OptionType question={question} i={i} />;
    }
    if (question.answerType === 'CHECKBOX') {
      return <CheckBoxType question={question} i={i} />;
    }
  };
  const initalValue =
    questions.map((question: any) => {
      return {
        questionId: question.id,
        answers: question.answerType === 'SHORT_TEXT'
          ? [{
              text: ''
            }]
          : question.answerType === 'CHECKBOX'
            ? []
            : question.answers.map((item: any) => item.id)
      };
    });

  return (
    <AsnModal
      open={true}
      width={'80vw'}
      maskStyle={{ backgroundColor: 'var(--assessment-form-background)' }}
      closable={false}
      footer={false}
    >
      <AsnTitle level={2}>{title}</AsnTitle>
      <AsnParagraph style={{ marginBottom: '60px' }}>Pre-assessment form for {sectionDataTitle} course</AsnParagraph>
      <AsnForm
        form={form}
        layout='vertical'
        onFinish={onFinish}
        name="preassesment"
      >
        <AsnForm.Item
          name="email"
          rules={[{ required: true, message: 'Please enter valid email' }]}
          label={'Email address (same as in the submitted application form)'}
          style={{ fontWeight: 500 }}
        >
          <UnderLineInput />
        </AsnForm.Item>
        <AsnForm.List name='apply' initialValue={[...initalValue]}>
          {(fields) => (
            <div>
              {questions.map((question: any, i: any) =>
                handleQuestionType(question, i)
              )}
            </div>
          )}
        </AsnForm.List>
        <AsnForm.Item>
          <Space direction='horizontal' align='center' style={{ paddingTop: '30px' }}>
            <Paragraph
              style={{ marginBottom: 0, fontSize: '16px', fontWeight: 500 }}
            >Online Signature
            </Paragraph>
            <UnderLineInput style={{ width: 'calc(80vw - 196px)' }} />
          </Space>
        </AsnForm.Item>
        <AsnForm.Item>
          <AsnButton
            className="primary"
            htmlType="submit"
            style={{ float: 'right', borderRadius: '18px', marginTop: '30px' }}
          >
            Submit
          </AsnButton>
        </AsnForm.Item>
      </AsnForm>
    </AsnModal>
  );
};

export default FillAssessMentForm;
