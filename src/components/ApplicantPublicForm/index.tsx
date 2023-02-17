import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Form, Row, Spin } from 'antd';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { AsnForm } from '../Forms/Form';
import { AsnButton } from '../Forms/Button';

import { GetAnswers, GetField, IAnswerProps } from '../../types/application';
import { FormFinish, Void } from '../../types/global';
import {
  IApplicant,
  IQuestion,
  IRelatedQuestion
} from '../../types/api/application/applicationForm1';

import ApplicationForm from './Form';
import { AsnModal } from '../Forms/Modal';
import { FormText, SectionTitle } from './Form/style';

import useGetForm from '../../api/Applicant/useGetForm';
import useCreateApplicant from '../../api/Applicant/useApplyApplicant';
import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';

import { KeyName, PATHS, SectionName } from '../../helpers/constants';
import { getRelatedQuestions, getAnswers } from '../../helpers/applicationForm';

import { ReactComponent as SuccessfulIcon } from '../../assets/icons/successful.svg';
import { IApplicantPublicForm } from '../../types/applicant';

const FillApplicationFormContainer = styled.div`
  padding: 3rem 3.75rem 3.75rem;
  width: 55%;
  background-color: var(--white);
  box-shadow: 0px 4px 30px rgba(113, 103, 246, 0.2);
  border-radius: 10px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;

  .title {
    font-size: var(--large-font-size) !important;
    justify-content: center;
  }

  .ant-form-item {
    margin: 12px 0 16px;

    input {
      font-size: var(--font-size-semismall);
    }
  }

  .ant-checkbox-disabled .ant-checkbox-inner {
    background-color: #f5f5f5;
    border-color: var(--dark-5) !important;
  }

  .ant-radio-disabled .ant-radio-inner:after {
    background-color: rgba(0,0,0,.2);
  }

  .ant-radio.ant-radio-disabled .ant-radio-inner {
    border-color: var(--dark-5);
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: var(--white) !important;
    border: 1px solid var(--dark-5) !important;
  }

  .ant-picker.ant-picker-disabled {
    background-color: var(--white) !important;
    border-color: var(--dark-5);
  }
  
  .ant-input-disabled {
    &:hover {
      border: 1px solid var(--dark-5) !important;
    }
  }
`;

const ApplicantPublicForm: React.FC<IApplicantPublicForm> = ({
  preview = false,
  applicantId,
  sectionDataId,
  type
}) => {
  const { id } = useParams();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [isSuccessPublishModal, setIsSuccessPublishModal] = useState(false);

  const { data, isLoading } = !preview
    ? useSingleApplicationForm(id ?? '', {
      onSuccess: (data: IApplicant) => {
        // console.log(''success');
      },
      onError: (data: IApplicant) => {
        navigate(`/${PATHS.ERROR_403}`);
      }
    })
    : useGetForm(applicantId, sectionDataId, type);

  const { mutate: createApplicant } = useCreateApplicant({
    onSuccess: (options: any) => {
      form.resetFields();
      initForm();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        setIsSuccessPublishModal(true);
      }, 500);
    },
    onError: (err: any) => {
      console.log(err);
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
    if (!_.isEmpty(data)) {
      if (!preview) {
        initForm();
      } else {
        fillForm();
      }
    }
  }, [data, id, form]);

  const initForm: Void = () => {
    if (applicationFormSections !== undefined) {
      const [personalDetails, education, otherInfo, personalInfo] =
        applicationFormSections;

      const educationQuestion = getRelatedQuestions(education);

      const otherInfoQuestion = getRelatedQuestions(otherInfo);

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
  };

  const fillForm: Void = () => {
    if (applicationFormSections !== undefined) {
      const [personalDetails, education, otherInfo, personalInfo] =
        applicationFormSections;

      const getAnswers: GetAnswers = (items) =>
        items?.map((p: IQuestion | IRelatedQuestion) => {
          const answer: IAnswerProps = {
            questionId: p.id,
            keyName: p.keyName,
            answerType: p.answerType,
            title: p.title,
            radioId: p.answers.filter((a) => a.checked).map((a) => a.id),
            answers: p.answers.filter((a) => a.checked)
          };

          if (p.answers.find((a) => a.type === 'SHORT_TEXT' && a.checked) != null) {
            answer.radioText = p.answers.find((a) => a.type === 'SHORT_TEXT' && a.checked)?.text;
          }

          return answer;
        });

      const relatedQuestionsEducation: IRelatedQuestion[] = education.questions
        .map((q: IQuestion) => q.relatedQuestions)
        .filter((f: IRelatedQuestion[]) => f.length)
        .flat();

      const educationAnswers = getAnswers(relatedQuestionsEducation);

      const relatedQuestionsOther: IRelatedQuestion[] = otherInfo.questions
        .map((q: IQuestion) => q.relatedQuestions)
        .filter((f: IRelatedQuestion[]) => f.length)
        .flat();

      const otherAnswers = getAnswers(relatedQuestionsOther);

      const questions = {
        [personalDetails.keyName]: getAnswers(personalDetails.questions),
        [education.keyName]: getAnswers(education.questions).concat(educationAnswers),
        [otherInfo.keyName]: getAnswers(otherInfo.questions).concat(otherAnswers),
        [personalInfo.keyName]: getAnswers(personalInfo.questions)
      };

      questions[personalDetails.keyName][1].answers[0].text = moment(questions[personalDetails.keyName][1].answers[0].text, 'YYYY-MM-DD');

      JSON.parse(termsAndConditions)?.forEach((p: any, i: number) => {
        form.setFieldValue(`community${i}`, true);
      });

      form.setFieldsValue({
        ...questions
      });
    }
  };

  const getField: GetField = (name) => _.cloneDeep(form.getFieldValue(name));

  const onFinish: FormFinish = () => {
    try {
      const personalInfo = getField(SectionName.personalInfo);
      const educationalInfo = getField(SectionName.educationalInfo);
      const otherInfo = getField(SectionName.otherInfo);
      const professionalInfo = getField(SectionName.professionalInfo);

      personalInfo.forEach((p: any) => {
        if (p.keyName === KeyName.dob) {
          p.answers[0].text = p.answers[0].text.toJSON();
        }
      });

      const data = personalInfo.concat(
        educationalInfo,
        otherInfo,
        professionalInfo
      );

      createApplicant({
        id,
        data
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <FillApplicationFormContainer>
        <AsnForm
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          disabled={preview}
        >
          <SectionTitle className="title">{title}</SectionTitle>
          <FormText>{description}</FormText>
          <ApplicationForm
            sections={applicationFormSections}
            terms={termsAndConditions}
            online={onlineSignature}
          />
          {!preview && (
            <AsnButton
              className="primary"
              htmlType="submit"
              style={{ width: 'clamp(8.5rem, 7vw, 24rem)', float: 'right' }}
            >
              Publish
            </AsnButton>
          )}
        </AsnForm>
      </FillApplicationFormContainer>
      <AsnModal
        footer={false}
        open={isSuccessPublishModal}
        title={data?.successMessage}
        onCancel={() => setIsSuccessPublishModal(false)}
        width="50%"
      >
        <Row justify="center">
          <SuccessfulIcon />
        </Row>
      </AsnModal>
    </Spin>
  );
};

export default ApplicantPublicForm;
