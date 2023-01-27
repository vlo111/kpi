import React from 'react';

import { IApplicationFormSections } from '../../types/api/application/applicationForm';
import FormList from '../../components/FillApplicationForm/FormList';
import { SectionName } from '../../helpers/constants';

const ApplicationForm: React.FC<{ sections: IApplicationFormSections[] }> = ({
  sections: [personalDetails, educationInfo, otherInfo, b]
}) => {
  return (
    <>
      <FormList name={SectionName.personalInfo} section={personalDetails} />
      <FormList name={SectionName.educationalInfo} section={educationInfo} />
      <FormList name={SectionName.otherInfo} section={otherInfo} />
    </>
  );
};

export default ApplicationForm;
