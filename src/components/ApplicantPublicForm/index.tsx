import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Form, Row, Space, Spin, Typography, message } from 'antd';
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
import { ReactComponent as NotAccessSvg } from '../../assets/icons/error_404.svg';

import { IApplicantPublicForm, IErrorMessage } from '../../types/applicant';

const { Title } = Typography;

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

    input {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .ant-input-disabled {
    border-color: var(--dark-5) !important;
    color: rgba(0, 0, 0, 0.85);
  }

  .ant-radio-disabled + span,
  .ant-checkbox-disabled + span {
    color: rgba(0, 0, 0, 0.85);
  }

  .ant-select-disabled {
    .ant-select-selection-item {
      color: rgba(0, 0, 0, 0.85);
    }
  }

  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after {
    border-color: var(--dark-border-ultramarine);
  }
`;

const NotAccessContent = styled(Space)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-space-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h5,
  h3 {
    color: var(--dark-1);
    font-size: 20px;
    font-weight: var(--font-normal);
  }
  h5 {
    font-size: 14px !important;
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
      onSuccess: (data: IApplicant) => {},
      onError: (data: IApplicant) => {
        navigate(`/${PATHS.ERROR_403}`);
      }
    })
    : useGetForm(applicantId, sectionDataId, type);

  const { mutate: createApplicant } = useCreateApplicant({
    onSuccess: () => {
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
    onError: ({
      response: {
        data: { message: error }
      }
    }: IErrorMessage) => {
      void message.error(error, 2);
    }
  });

  const {
    applicationFormSections = [],
    title,
    description,
    termsAndConditions,
    onlineSignature,
    onlineSignaturePath
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

          if (
            p.answers.find((a) => a.type === 'SHORT_TEXT' && a.checked) != null
          ) {
            answer.radioText = p.answers.find(
              (a) => a.type === 'SHORT_TEXT' && a.checked
            )?.text;
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
        [education.keyName]: getAnswers(education.questions).concat(
          educationAnswers
        ),
        [otherInfo.keyName]: getAnswers(otherInfo.questions).concat(
          otherAnswers
        ),
        [personalInfo.keyName]: getAnswers(personalInfo.questions)
      };

      questions[personalDetails.keyName][1].answers[0].text = moment(
        questions[personalDetails.keyName][1].answers[0].text,
        'YYYY-MM-DD'
      );

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
      const onlineSignaturePath = getField(SectionName.onlineSignaturePath);

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
        data,
        onlineSignaturePath
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Spin spinning={isLoading}>
      {data?.activeDeadline === true && (
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
              onlineSignaturePath={onlineSignaturePath}
              preview={preview}
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
      )}
      {data?.activeDeadline === false && (
        <NotAccessContent direction="vertical">
          <NotAccessSvg />
          <Title level={3}>We are sorry,</Title>
          <Title level={5}>
            but you don’t have access to this page or resource
          </Title>
        </NotAccessContent>
      )}
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
