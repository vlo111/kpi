import React from 'react';

import { FormText, SectionTitle } from '../style';
import ListItems from './ListItems';
import { IApplicationFormItems } from '../../../types/application';

const ApplicationForm: React.FC<IApplicationFormItems> = ({
  name,
  title,
  description,
  section
}) => {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      <FormText>{description}</FormText>
      <ListItems name={name} section={section} />
    </>
  );
};

export default ApplicationForm;
