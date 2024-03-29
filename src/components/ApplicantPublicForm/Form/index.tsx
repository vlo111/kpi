import React from 'react';

import TermsConditions from './TermsConditions';
import { SectionName } from '../../../helpers/constants';
import FormList from './FormList';
import { IApplicationForm } from '../../../types/application';

const ApplicationForm: React.FC<IApplicationForm> = ({
  sections,
  terms,
  online,
  onlineSignaturePath,
  preview
}) => {
  return (
    <>
      {sections.map((item, index) => (
        <FormList
          key={index}
          title={item?.title}
          description={item?.description}
          name={Object.values(SectionName)[index]}
          section={item}
          preview={preview}
        />
      ))}
      <TermsConditions
        text={terms}
        preview={preview}
        onlineSignature={online}
        onlineSignaturePath={onlineSignaturePath}
      />
    </>
  );
};

export default ApplicationForm;
