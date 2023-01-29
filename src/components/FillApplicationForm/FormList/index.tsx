import React from 'react';

import { GetSectionItem, IApplicationFormProps } from '../../../types/application';
import { AnswerTypes } from '../../../helpers/constants';
import { AsnForm } from '../../Forms/Form';

import SectionCheckBox from './CheckBox';
import SectionRadio from './Radio';
import SectionSelect from './Select';
import SectionText from './Text';
import SectionDate from './Date';

const ApplicationFormList: React.FC<IApplicationFormProps> = ({ name, section }) => {
  const form = AsnForm.useFormInstance();

  const getSectionItem: GetSectionItem = (index) => {
    try {
      if (index < section.questions.length) {
        const { questions: { [index]: { answers, otherOption, required } } } = section;

        const { answerType, keyName, title } = form.getFieldValue(name)[index];

        const props = {
          index,
          title,
          otherOption,
          answers,
          required
        };

        switch (answerType) {
          case AnswerTypes.checkbox: {
            return <SectionCheckBox key={index} {...props} />;
          }
          case AnswerTypes.options: {
            if (keyName === AnswerTypes.region) {
              return <SectionSelect key={index} {...props} />;
            }
            return <SectionRadio key={index} {...props} />;
          }
          case AnswerTypes.shortText: {
            return <SectionText key={index} {...props} />;
          }
          case AnswerTypes.yesNo: {
            return <SectionRadio key={index} {...props} />;
          }
          default: {
            return <SectionDate key={index} {...props} />;
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AsnForm.List name={name}>
      {(items) => items.map((field, index) => getSectionItem(index))}
    </AsnForm.List>
  );
};

export default ApplicationFormList;
