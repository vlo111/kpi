import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';

import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import { FormFinish } from '../../types/global';
import { IParse } from '../../types/application';
import { IApplicant } from '../../types/api/application/applicationForm';

import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';
import ApplicationForm from '../../components/FillApplicationForm';
import { getAnswers } from '../../helpers/utils';
import { PATHS } from '../../helpers/constants';

const Terms: React.FC<IParse> = ({ str }) => {
  if (str !== undefined) {
    return JSON.parse(str)?.map((p: string, i: number) => (
      <div key={i}>{p}</div>
    ));
  }
  return <></>;
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
    termsAndConditions
  } = data ?? {};

  useEffect(() => {
    const [personalDetails, education, otherInfo, personalInfo] =
      applicationFormSections;

    if (data?.applicationFormSections !== undefined) {
      const personalInfoQuestions = {
        [personalDetails.keyName]: getAnswers(personalDetails.questions),
        [education.keyName]: getAnswers(education.questions),
        [otherInfo.keyName]: getAnswers(otherInfo.questions),
        [personalInfo.keyName]: getAnswers(personalInfo.questions)
      };

      form.setFieldsValue({
        ...personalInfoQuestions
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
    <AsnForm form={form} onFinish={onFinish} autoComplete="off">
      <h1>{title}</h1>
      <h3>{description}</h3>
      <ApplicationForm sections={applicationFormSections} />
      <Terms str={termsAndConditions} />
      <AsnButton
        className="primary"
        htmlType="submit"
        style={{ width: 'clamp(12.5rem,12vw,24rem)' }}
      >
        Publish
      </AsnButton>
    </AsnForm>
  );
};

export default FillApplicationForm;
