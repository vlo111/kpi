import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Form, Row, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { AsnForm } from '../Forms/Form';
import { AsnButton } from '../Forms/Button';

import { GetField } from '../../types/application';
import { FormFinish, Void } from '../../types/global';
import { IApplicant } from '../../types/api/application/applicationForm1';

import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';
import { AsnModal } from '../Forms/Modal';
import ApplicationForm from './Form';
import { KeyName, PATHS, SectionName } from '../../helpers/constants';
import { FormText, SectionTitle } from './Form/style';
import useCreateApplicant from '../../api/Applicant/useApplyApplicant';
import { getRelatedQuestions, getAnswers } from '../../helpers/applicationForm';
import { ReactComponent as SuccessfulIcon } from '../../assets/icons/successful.svg';

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
`;

const ApplicantPublicForm: React.FC<{ id: string | undefined }> = ({ id }) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [isSuccessPublishModal, setIsSuccessPublishModal] = useState(false);

  const { data, isLoading } = useSingleApplicationForm(id ?? '', {
    onSuccess: (data: IApplicant) => {
      // console.log(''success');
    },
    onError: (data: IApplicant) => {
      navigate(`/${PATHS.ERROR_403}`);
    }
  });

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
      initForm();
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
        <AsnForm form={form} onFinish={onFinish} autoComplete="off">
          <SectionTitle className="title">{title}</SectionTitle>
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
