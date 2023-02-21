import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Space, message } from 'antd';
import { FormProps } from 'antd/es/form/Form';
import moment from 'moment';

import AsnSpin from '../../components/Forms/Spin';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnInputNumber } from '../../components/Forms/Input';
import CheckBoxType from './CheckBoxType';
import OptionType from './OptionType';
import ShortTextType from './ShortTextType';
import { TVoid } from '../../types/global';
import { IAssessmentFormSumTotalScore } from '../../types/api/assessment';
import { PATHS } from '../../helpers/constants';
import useGetApplicantCourseForm from '../../api/Applicant/useGetApplicantCourseForm';
import useAssessForm from '../../api/AssessmentForm/useAssessForm';
import {
  FormItemWrapperCol,
  FormTitle,
  AsnParagraph,
  FormWrapper
} from './styles';

const FilledOutAssessmentForm: React.FC = () => {
  const [allScore, setAllScore] = useState<number | undefined>();
  const navigate = useNavigate();
  const [form] = AsnForm.useForm();

  const location = useLocation();
  const { id } = useParams();

  const { sectionDataId, type } = location.state;
  const { data, isLoading, refetch } = useGetApplicantCourseForm(
    id as string,
    sectionDataId,
    type,
    { enabled: Boolean(id) && Boolean(sectionDataId) && Boolean(type) }
  );
  const { mutate: assessForm } = useAssessForm({});

  if (isLoading) {
    return <AsnSpin />;
  }

  const {
    email,
    id: formId,
    preAssessmentForm,
    postAssessmentForm
  } = data;

  const initialValue = (preAssessmentForm ?? postAssessmentForm)?.questions.map((question) => {
    return {
      questionId: question.id,
      score: question.userEarnedScore
    };
  });

  const onFinish: TVoid = (values) => {
    const requestBody = {
      type,
      assess: values.assess
    };
    assessForm(
      { formId, requestBody },
      {
        onSuccess: () => {
          void message.success('Successfully assessed', 2);
          refetch();
          window.scrollTo(0, 0);
        },
        onError: () => {
          void message.error('Something went wrong', 2);
        }
      }
    );
  };

  const sumAllScores: FormProps['onValuesChange'] = (
    _changedValues,
    allValues: IAssessmentFormSumTotalScore
  ) => {
    const allScores = allValues?.assess?.reduce(
      (sum, current) => sum + current.score,
      0
    );
    setAllScore(allScores);
  };

  return (
    <FormWrapper justify="center">
      <AsnForm
        form={form}
        layout="vertical"
        onFinish={onFinish}
        name="preassesment-assess"
        style={{ width: '80vw' }}
        onValuesChange={sumAllScores}
      >
        <FormItemWrapperCol span={24} style={{ marginBottom: '16px' }}>
          <FormTitle level={2}>{preAssessmentForm?.title ?? postAssessmentForm?.title}</FormTitle>
          <AsnParagraph className="courseName">
            Pre-assessment form for {preAssessmentForm?.sectionDataTitle ?? postAssessmentForm?.sectionDataTitle} course
          </AsnParagraph>
          <AsnParagraph className="submissionDate">
            Submission date: {moment(preAssessmentForm?.preAssessmentAppliedAt ?? postAssessmentForm?.postAssessmentAppliedAt).format('DD/MM/YY')}{' '}
          </AsnParagraph>
          <AsnForm.Item
            name="email"
            label={'Email address (same as in the submitted application form)*'}
            initialValue={email}
            style={{ fontWeight: 'var(--font-semibold)' }}
          >
            <UnderLineInput disabled={true} />
          </AsnForm.Item>
        </FormItemWrapperCol>
        <AsnForm.List name="assess" initialValue={initialValue}>
          {(_fields) => (
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              {(preAssessmentForm?.questions ?? postAssessmentForm?.questions).map((question, i: number) =>
                question.answerType === 'SHORT_TEXT'
                  ? (
                  <ShortTextType key={i} question={question} i={i} />
                    )
                  : question.answerType === 'OPTION'
                    ? (
                  <OptionType key={i} question={question} i={i} />
                      )
                    : (
                  <CheckBoxType key={i} question={question} i={i} />
                      )
              )}
            </Space>
          )}
        </AsnForm.List>
        <FormItemWrapperCol style={{ marginTop: '16px' }}>
          <AsnForm.Item>
            <Space
              direction="horizontal"
              align="center"
              style={{ paddingTop: '30px' }}
            >
              <AsnParagraph className="main">Online Signature</AsnParagraph>
              <UnderLineInput
                style={{ width: 'calc(80vw - 354px)' }}
                disabled
              />
              <Space direction="horizontal">
                <AsnParagraph className="main">Total</AsnParagraph>
                <AsnInputNumber
                  disabled
                  className="primary"
                  value={preAssessmentForm?.userAssessedScore ?? allScore ?? preAssessmentForm?.userEarnedScore ?? postAssessmentForm?.userEarnedScore}
                />
              </Space>
            </Space>
          </AsnForm.Item>
        </FormItemWrapperCol>
        {(preAssessmentForm?.userAssessedScore !== undefined || postAssessmentForm?.userAssessedScore !== undefined) && (
          <Space direction="vertical" style={{ paddingTop: '14px' }}>
            <AsnParagraph className="main">
              Assessed by {data?.checker?.firstName} {data?.checker?.lastName}: {moment(preAssessmentForm?.preAssessmentCheckedAt ?? postAssessmentForm?.postAssessmentCheckedAt).format('DD/MM/YY')}
            </AsnParagraph>
            <AsnParagraph className="main">
              Submission date: {moment(preAssessmentForm?.preAssessmentAppliedAt ?? postAssessmentForm?.postAssessmentAppliedAt).format('DD/MM/YY')}
            </AsnParagraph>
          </Space>
        )}
        <Space
          direction="horizontal"
          align="baseline"
          size={60}
          style={{ width: '100%', justifyContent: 'end', marginTop: 100 }}
        >
          {(preAssessmentForm?.userAssessedScore === undefined && postAssessmentForm?.userAssessedScore === undefined)
            ? (
            <>
              <AsnButton
                className="default"
                onClick={() =>
                  navigate(`/${PATHS.APPLICANT.replace(':id', id as string)}`)
                }
              >
                Cancel
              </AsnButton>
              <AsnForm.Item>
                <AsnButton
                  className="primary"
                  htmlType="submit"
                  style={{ marginTop: '30px' }}
                >
                  Assess
                </AsnButton>
              </AsnForm.Item>
            </>
              )
            : (
            <>
              <AsnButton
                className="primary"
                style={{ marginTop: '30px' }}
                onClick={() =>
                  navigate(`/${PATHS.APPLICANT.replace(':id', id as string)}`)
                }
              >
                Back
              </AsnButton>
            </>
              )}
        </Space>
      </AsnForm>
    </FormWrapper>
  );
};

export default FilledOutAssessmentForm;
