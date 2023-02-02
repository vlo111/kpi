import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';

import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import { FormFinish } from '../../types/global';
import {
  IApplicant,
  IQuestion,
  IRelatedQuestion
} from '../../types/api/application/applicationForm';

import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';
import ApplicationForm from '../../components/FillApplicationForm';
import { getAnswers } from '../../helpers/utils';
import { PATHS } from '../../helpers/constants';
import styled from 'styled-components';
import { ConcatAnswers, IFormQuestion } from '../../types/application';
import { FormText, SectionTitle } from '../../components/FillApplicationForm/style';

const FillApplicationFormContainer = styled.div`
  padding: 3rem 3.75rem 3.75rem;
  width: 55%;
  background-color: var(--white);
  box-shadow: 0px 4px 30px rgba(113, 103, 246, 0.2);
  border-radius: 10px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  
  .ant-form-item {
    margin: 12px 0 16px;

    input {
      font-size: var(--font-size-semismall);
    }
  }
`;

const concatRelatedAnswers: ConcatAnswers = (items, educationQuestion) => {
  const relatedQuestions: IRelatedQuestion[] = items.questions
    .map((q: IQuestion) => q.relatedQuestions)
    .filter((f: IRelatedQuestion[]) => f.length)
    .flat();

  const relatedQuestionAnswer = getAnswers(relatedQuestions);

  const key = Object.keys(educationQuestion)[0];

  educationQuestion[key] = educationQuestion[key].concat(relatedQuestionAnswer);
};

const FillApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const data: IApplicant | undefined = useSingleApplicationForm(id ?? '', {
    onSuccess: (data: IApplicant) => {
      // console.log('SUCC', data);
    },
    onError: (data: IApplicant) => {
      navigate(`/${PATHS.ERROR_403}`);
    }
  });

  const {
    applicationFormSections = [],
    title,
    description,
    termsAndConditions,
    onlineSignature
  } = data ?? {};

  useEffect(() => {
    if (data?.applicationFormSections !== undefined) {
      const [personalDetails, education, otherInfo, personalInfo] =
        applicationFormSections;

      const educationQuestion: IFormQuestion = {
        [education.keyName]: getAnswers(education.questions)
      };

      concatRelatedAnswers(education, educationQuestion);

      const otherInfoQuestion: IFormQuestion = {
        [otherInfo.keyName]: getAnswers(otherInfo.questions)
      };

      concatRelatedAnswers(otherInfo, otherInfoQuestion);

      const questions = {
        [personalDetails.keyName]: getAnswers(personalDetails.questions),
        ...educationQuestion,
        ...otherInfoQuestion,
        [personalInfo.keyName]: getAnswers(personalInfo.questions)
      };

      form.setFieldsValue({
        ...questions
      });
    }
  }, [data]);

  const onFinish: FormFinish = () => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      console.log(form.getFieldValue('personal_info'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FillApplicationFormContainer>
      <AsnForm form={form} onFinish={onFinish} onFinishFailed={(val) => {
        // eslint-disable-next-line no-debugger
        debugger;
      }} autoComplete="off">
        <SectionTitle>{title}</SectionTitle>
        <FormText>{description}</FormText>
        <ApplicationForm
          sections={applicationFormSections}
          terms={termsAndConditions}
          online={onlineSignature}
        />
        <AsnButton
          className="primary"
          htmlType="submit"
          style={{ width: 'clamp(8.5rem, 7vw, 24rem)', float: 'right' }}
        >
          Publish
        </AsnButton>
      </AsnForm>
    </FillApplicationFormContainer>
  );
};

export default FillApplicationForm;
