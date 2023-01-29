import React from 'react';

import { IApplicationFormSections } from '../../types/api/application/applicationForm';
import FormList from '../../components/FillApplicationForm/FormList';
import { SectionName } from '../../helpers/constants';
import TermsConditions from './TermsConditions';
import styled from 'styled-components';
import { Typography } from 'antd';
import { FormText } from './style';

export const SectionTitle = styled(Typography.Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
  margin: 2rem 0rem 1rem;
  display: flex;
  justify-content: space-between;
`;

interface IApplicationForm {
  sections: IApplicationFormSections[]
  terms: string | undefined
  online: boolean | undefined
}

const ApplicationForm: React.FC<IApplicationForm> = ({
  sections: [personalDetails, educationInfo, otherInfo, b],
  terms,
  online
}) => {
  return (
    <>
      <SectionTitle>{personalDetails?.title}</SectionTitle>
      <FormText>{personalDetails?.description}</FormText>
      <FormList name={SectionName.personalInfo} section={personalDetails} />

      <SectionTitle>{educationInfo?.title}</SectionTitle>
      <FormText>{educationInfo?.description}</FormText>
      <FormList name={SectionName.educationalInfo} section={educationInfo} />

      <SectionTitle>{otherInfo?.title}</SectionTitle>
      <FormText>{otherInfo?.description}</FormText>
      <FormList name={SectionName.otherInfo} section={otherInfo} />

      <TermsConditions text={terms} onlineSignature={online} />
    </>
  );
};

export default ApplicationForm;
