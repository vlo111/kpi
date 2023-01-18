import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, message, Space, Spin, Typography } from 'antd';
import PersonalDetails from '../../components/FillApplicationForm/PersonalDetails';
import { FormText } from '../../components/FillApplicationForm/style';
import { FormFinish } from '../../types/global';
import { AsnButton } from '../../components/Forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';
import { PATHS } from '../../helpers/constants';
import _ from 'lodash';
import { AsnForm } from '../../components/Forms/Form';
import EducationsWork from '../../components/FillApplicationForm/EducationsWork';
import OtherInformation from '../../components/FillApplicationForm/OtherInformation';
import TermsConditions from '../../components/FillApplicationForm/TermsConditions';
import { IApplicationsOption } from '../../types/api/application/applicationForm';
import useCreateApplicant from '../../api/Applicant/useApplyApplicant';

const FillApplicationFormContainer = styled.div`
  padding: 3rem 3.75rem 3.75rem;
  width: 55%;
  background-color: var(--white);
  box-shadow: 0px 4px 30px rgba(113, 103, 246, 0.2);
  border-radius: 10px;
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled(Typography.Title)`
  font-size: var(--font-size-semilarge);
  color: var(--dark-border-ultramarine) !important;
  font-weight: 400;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const getDefaultAnswer: (key: any, item: any) => any = (key, item) => {
  if (item !== undefined) {
    if (key === 'gender' || key === 'student' ||
      key === 'educationLevel' || key === 'income' ||
      key === 'studyType' || key === 'disability' ||
      key === 'informedAboutUs' || key === 'vulnerabilities'
    ) {
      return {
        id: item[0].id,
        text: item[0].title
      };
    }
  }
};

const initForm: (personalInfo: any, educationQuestion: any, otherInfo: any) => any = (personalInfo, education, otherInfo) => {
  const personalInfoQuestions = {
    [personalInfo.keyName]: personalInfo.questions.map((p: { id: any, answers: any, keyName: string }) => {
      return {
        questionId: p.id,
        keyName: p.keyName,
        answers: [getDefaultAnswer(p.keyName, p.answers)]
      };
    })
  };

  const educationQuestion = {
    [education.keyName]: education.questions.map((p: { id: any, answers: any, keyName: string }) => {
      return {
        questionId: p.id,
        keyName: p.keyName,
        answers: [getDefaultAnswer(p.keyName, p.answers)]
      };
    })
  };

  const otherInfoQuestion = {
    [otherInfo.keyName]: otherInfo.questions.map((p: { id: any, answers: any, keyName: string }) => {
      return {
        questionId: p.id,
        keyName: p.keyName,
        answers: [getDefaultAnswer(p.keyName, p.answers)]
      };
    })
  };

  return {
    termsAndConditions: '',
    income: education.questions.find((e: any) => e.keyName === 'income').title,
    disability: otherInfo.questions.find((e: any) => e.keyName === 'disability').title,
    vulnerabilities: otherInfo.questions.find((e: any) => e.keyName === 'vulnerabilities')?.title ?? '',
    informedAboutUs: otherInfo.questions.find((e: any) => e.keyName === 'informedAboutUs').title,
    ...personalInfoQuestions,
    ...educationQuestion,
    ...otherInfoQuestion
  };
};

const getAnswers: (item: any, key: string) => any = (item, key) => (
  item.questions.find(
    (q: { keyName: string }) => q.keyName === key
  )?.answers.map((a: any) => ({
    id: a.id,
    text: a.title
  }))
);

const FillApplicationForm: React.FC = () => {
  const [form] = Form.useForm();

  const { mutate: createApplicat } = useCreateApplicant({
    onSuccess: (options: IApplicationsOption) => {
      form.resetFields();
      void message.success('successfully applied', 2);
    },
    onError: (err: any) => {
      console.log(err);
    }
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading }: any = useSingleApplicationForm(id,
    {
      enabled: !(id === null),
      onSuccess: (data: any) => {
        // console.log('SUCC', data);
      },
      onError: (data: any) => {
        navigate(`/${PATHS.ERROR_403}`);
      }
    });

  const [educations, setEducations] = useState();
  const [educationLevel, setEducationLevel] = useState();
  const [vulnerabilities, setVulnerabilities] = useState();
  const [informedAboutUs, setInformedAboutUs] = useState();
  const [areStudent, setAreStudent] = useState();
  const [gender, setGender] = useState();
  const [hasJobsIncome, setHasJobsIncome] = useState();
  const [disability, setDisability] = useState();

  const onFinish: FormFinish = (values) => {
    // eslint-disable-next-line no-debugger
    debugger;

    const personalInfo = form.getFieldValue('personal_info');
    const educationalInfo = form.getFieldValue('educational_info');
    const otherInfo = form.getFieldValue('other_info');

    personalInfo.forEach((p: any) => {
      if (p.keyName === 'dob') {
        p.answers[0].text = p.answers[0].text.toJSON();
      }
    });

    const data = personalInfo.concat(educationalInfo, otherInfo);

    createApplicat({
      id,
      data
    });
  };

  const onFinishFail: FormFinish = (values) => {
    // eslint-disable-next-line no-debugger
    debugger;
    console.table('form ------', form.getFieldValue([]));
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      const { applicationFormSections } = data;

      // const [personalInfo, education, otherInfo, skills] = applicationFormSections;
      const [personalInfo, education, otherInfo] = applicationFormSections;

      initStates(personalInfo, education, otherInfo);

      const initial = initForm(personalInfo, education, otherInfo);

      form.setFieldsValue({
        ...initial
      });
    }
  }, [data, id, form]);

  const initStates: (personalInfo: any, education: any, otherInfo: any) => void = (personalInfo, education, otherInfo) => {
    setGender(getAnswers(personalInfo, 'gender'));

    setEducations(getAnswers(education, 'studyType'));

    setEducationLevel(getAnswers(education, 'educationLevel'));

    setAreStudent(getAnswers(education, 'student'));

    setHasJobsIncome(getAnswers(education, 'income'));

    setVulnerabilities(getAnswers(otherInfo, 'vulnerabilities'));

    setInformedAboutUs(getAnswers(otherInfo, 'informedAboutUs'));

    setDisability(getAnswers(otherInfo, 'disability'));
  };

  return (
    <Spin spinning={isLoading}>
    <FillApplicationFormContainer>
      <FormTitle>{data.title}</FormTitle>
      <FormText>{data.description}</FormText>
      <AsnForm
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFail}
        autoComplete="off"
      >
        <PersonalDetails gender={gender}/>
        <EducationsWork educations={educations} educationLevel={educationLevel} areStudent={areStudent} hasJobsIncome={hasJobsIncome} />
        <OtherInformation informedAboutUs={informedAboutUs} vulnerabilities={vulnerabilities} disability={disability} />
        <TermsConditions text={data.termsAndConditions} onlineSignature={data.onlineSignature}/>
        <Space
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '3.5rem 0rem'
          }}
          size={60}
        >
          <AsnButton className="default">Cancel</AsnButton>
          <AsnButton className="primary" htmlType="submit">
            Submit
          </AsnButton>
        </Space>
      </AsnForm>
    </FillApplicationFormContainer>
    </Spin>
  );
};

export default FillApplicationForm;
