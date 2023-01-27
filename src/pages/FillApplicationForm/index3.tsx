import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Row, Space, Spin, Typography } from 'antd';
import PersonalDetails from '../../components/FillApplicationForm/PersonalDetails';
import { FormText } from '../../components/FillApplicationForm/style';
import { FormFinish, Void } from '../../types/global';
import { AsnButton } from '../../components/Forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';
import { PATHS } from '../../helpers/constants';
import _ from 'lodash';
import { AsnForm } from '../../components/Forms/Form';
import EducationsWork from '../../components/FillApplicationForm/EducationsWork';
import OtherInformation from '../../components/FillApplicationForm/OtherInformation';
import TermsConditions from '../../components/FillApplicationForm/TermsConditions';
import useCreateApplicant from '../../api/Applicant/useApplyApplicant';
import { AsnModal } from '../../components/Forms/Modal';
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

  return {
    text: ''
  };
};

const getAnswers: (items: any) => any = (items) => (
  items?.map((p: { id: any, answers: any, keyName: string }) => {
    return {
      questionId: p.id,
      keyName: p.keyName,
      answers: [getDefaultAnswer(p.keyName, p.answers)]
    };
  })
);

const concatRelatedAnswers: (items: any, educationQuestion: any) => any = (items, educationQuestion) => {
  const relatedQuestions = items.questions.map((q: any) => q.relatedQuestions).filter((f: any) => f.length).flat();

  const rq = getAnswers(relatedQuestions);

  const key = Object.keys(educationQuestion)[0];

  educationQuestion[key] = educationQuestion[key].concat(rq);
};

const initFormData: (personalInfo: any, educationQuestion: any, otherInfo: any) => any = (personalInfo, education, otherInfo) => {
  const personalInfoQuestions = {
    [personalInfo.keyName]: getAnswers(personalInfo.questions)
  };

  const educationQuestion: any = {
    [education.keyName]: getAnswers(education.questions)
  };

  concatRelatedAnswers(education, educationQuestion);

  const otherInfoQuestion = {
    [otherInfo.keyName]: getAnswers(otherInfo.questions)
  };

  concatRelatedAnswers(otherInfo, otherInfoQuestion);

  return {
    termsAndConditions: '',
    income: education.questions.find((e: any) => e.keyName === 'income')?.title,
    disability: otherInfo.questions.find((e: any) => e.keyName === 'disability')?.title,
    vulnerabilities: otherInfo.questions.find((e: any) => e.keyName === 'vulnerabilities')?.title ?? '',
    informedAboutUs: otherInfo.questions.find((e: any) => e.keyName === 'informedAboutUs')?.title,
    ...personalInfoQuestions,
    ...educationQuestion,
    ...otherInfoQuestion
  };
};

const getAnswersByKey: (item: any, key: string) => any = (item, key) => (
  item.questions.find(
    (q: { keyName: string }) => q.keyName === key
  )?.answers.map((a: any) => ({
    id: a.id,
    text: a.title
  }))
);

const getRelatedAnswersByKey: (item: any, key: string) => any = (item, key) => {
  const relatedQuestions = item.questions.map((q: any) => q.relatedQuestions).filter((f: any) => f.length).flat();

  return relatedQuestions.find(
    (q: { keyName: string }) => q.keyName === key
  )?.answers.map((a: any) => ({
    id: a.id,
    text: a.title
  }));
};

const FillApplicationForm: React.FC = () => {
  const [isSuccessPublishModal, setIsSuccessPublishModal] = useState(false);

  const [form] = Form.useForm();

  const { mutate: createApplicat } = useCreateApplicant({
    onSuccess: (options: any) => {
      form.resetFields();
      initForm();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsSuccessPublishModal(true);
    },
    onError: (err: any) => {
      console.log(err);
    }
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading }: any = useSingleApplicationForm(id ?? '',
    {
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
    try {
      const personalInfo = _.cloneDeep(form.getFieldValue('personal_info'));
      const educationalInfo = _.cloneDeep(form.getFieldValue('educational_info'));
      const otherInfo = _.cloneDeep(form.getFieldValue('other_info'));

      personalInfo.forEach((p: any) => {
        if (p.keyName === 'dob') {
          p.answers[0].text = p.answers[0].text.toJSON();
        }
      });

      const data = personalInfo.concat(educationalInfo, otherInfo);

      createApplicat({
        ...values,
        text: values.dob.answers[0].toJSON()
      });

      createApplicat({
        id,
        data
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(data)) {
      initForm();
    }
  }, [data, id, form]);

  const initForm: Void = () => {
    const { applicationFormSections } = data;

    const [personalInfo, education, otherInfo] = applicationFormSections;

    initStates(personalInfo, education, otherInfo);

    const initial = initFormData(personalInfo, education, otherInfo);

    form.setFieldsValue({
      ...initial
    });
  };

  const initStates: (personalInfo: any, education: any, otherInfo: any) => void = (personalInfo, education, otherInfo) => {
    setGender(getAnswersByKey(personalInfo, 'gender'));

    setEducations(getRelatedAnswersByKey(education, 'studyType'));

    setEducationLevel(getAnswersByKey(education, 'educationLevel'));

    setAreStudent(getAnswersByKey(education, 'student'));

    setHasJobsIncome(getAnswersByKey(education, 'income'));

    setVulnerabilities(getRelatedAnswersByKey(otherInfo, 'vulnerabilities'));

    setInformedAboutUs(getAnswersByKey(otherInfo, 'informedAboutUs'));

    setDisability(getAnswersByKey(otherInfo, 'disability'));
  };

  console.log(data);

  return (
    <Spin spinning={isLoading}>
      <FillApplicationFormContainer>
        <FormTitle>{data?.title}</FormTitle>
        <FormText>{data?.description}</FormText>
        <AsnForm
          form={form}
          onFinish={onFinish}
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

export default FillApplicationForm;
