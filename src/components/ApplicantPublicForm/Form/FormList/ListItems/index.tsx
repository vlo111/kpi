import React from 'react';

import { AsnForm } from '../../../../Forms/Form';
import { renderQuestionForm } from '../../../../../helpers/applicationForm';
import {
  GetSectionItem,
  IApplicationFormProps
} from '../../../../../types/application';

const ListItems: React.FC<IApplicationFormProps> = ({ name, section, preview }) => {
  const form = AsnForm.useFormInstance();

  const getSectionItem: GetSectionItem = (index) => {
    try {
      if (index < section.questions.length) {
        const {
          questions: {
            [index]: { answers, otherOption, required, relatedQuestions }
          }
        } = section;

        const { answerType, keyName, title } = form.getFieldValue(name)[index];

        const props = {
          index,
          title,
          answers,
          required,
          otherOption,
          formName: name,
          relatedQuestions
        };

        return renderQuestionForm(keyName, answerType, index, props, preview);
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

export default ListItems;
