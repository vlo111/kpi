import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Typography, Space, message } from 'antd';
import styled from 'styled-components';

import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import AsnSpin from '../../components/Forms/Spin';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import SuccessModal from './SuccessModal';
import CheckBoxType from './CheckBoxType';
import OptionType from './OptionType';
import ShortTextType from './ShortTextType';
import { TVoid } from '../../types/global';
import { IQuestion } from '../../types/api/assessment';
import { FormScrollToErrorOptions } from '../../helpers/constants';
import useGetAssessmentForm from '../../api/AssessmentForm/useGetAssessmentForm';
import useApplyAssessmentForm from '../../api/AssessmentForm/useApplyAssessmentForm';
import _ from 'lodash';

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
    font-size: var(--large-font-size);
  }
  text-align: center;
`;
const AsnParagraph = styled(Paragraph)`
  &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: var( --font-size-semilarge);
  }
   text-align: center;
`;

const FillAssessMentForm: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [form] = AsnForm.useForm();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') as string;

  const { data: { result: assessmentForm }, isLoading } = useGetAssessmentForm(id, { enabled: Boolean(id) });
  const { mutate: applyForm } = useApplyAssessmentForm({});

  const onFinish: TVoid = (values) => {
    const clonedValues = _.cloneDeep(values);
    const requestBody = {
      email: clonedValues.email,
      apply: clonedValues?.apply.filter((item: { checkboxIds: string[] | undefined }) => delete item.checkboxIds)
    };

    applyForm({ id, requestBody }, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => {
          window.location.replace('https://www.google.com/');
        }, 1000);
      },
      onError: ({ response: { status } }: { response: { status: number } }) => {
        if (status === 404) {
          form.scrollToField(['email'], FormScrollToErrorOptions);
          form.setFields([{ name: 'email', errors: ['Applicant with this email does not exists'] }]);
          setError(true);
        } else {
          void message.error('Something went wrong', 2);
        }
      }
    });
  };

  if (isLoading) {
    return <AsnSpin />;
  }

  const { title, questions, sectionDataTitle } = assessmentForm;

  const initalValue = questions.map((question: IQuestion) => {
    return {
      questionId: question.id,
      answers: []
    };
  });
  return (
    <>
      {!success && <AsnModal
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
          scrollToFirstError={FormScrollToErrorOptions}
        >
          <AsnForm.Item
            name="email"
            label={'Email address (same as in the submitted application form)'}
            style={{ fontWeight: 'var(--font-semibold)' }}
            rules={[
              {
                validator: async (_, file) => {
                  if (file === undefined) {
                    return await Promise.reject(new Error('Please check at least one answer'));
                  }
                  if (error) {
                    return await Promise.reject(new Error('Applicant with this email does not exists'));
                  }
                }
              },
              { required: true, message: '' }
            ]}
          >
            <UnderLineInput onChange={() => {
              if (error) {
                setError(false);
              }
            }} />
          </AsnForm.Item>
          <AsnForm.List name='apply' initialValue={[...initalValue]}>
            {(fields) => (
              <div>
                {questions.map((question: IQuestion, i: number) =>

                  (
                    question.answerType === 'SHORT_TEXT'
                      ? <ShortTextType key={i} question={question} i={i} />
                      : question.answerType === 'OPTION'
                        ? <OptionType key={i} question={question} i={i} />
                        : <CheckBoxType key={i} question={question} i={i} />
                  )
                )
                }
              </div>
            )}
          </AsnForm.List>
          <AsnForm.Item>
            <Space direction='horizontal' align='center' style={{ paddingTop: '30px' }}>
              <Paragraph
                style={{ marginBottom: 0, fontSize: 'var(--base-font-size)', fontWeight: 'var(--font-semibold)' }}
              >
                Online Signature
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
      </AsnModal>}
      <SuccessModal success={success} />
    </>
  );
};

export default FillAssessMentForm;
