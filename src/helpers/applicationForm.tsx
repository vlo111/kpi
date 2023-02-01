import { AnswerTypes, phoneErrorMesage, phoneRegExp } from './constants';
import SectionCheckBox from '../components/FillApplicationForm/FormList/CheckBox';
import SectionSelect from '../components/FillApplicationForm/FormList/Select';
import SectionRadio from '../components/FillApplicationForm/FormList/Radio';
import SectionText from '../components/FillApplicationForm/FormList/Text';
import SectionDate from '../components/FillApplicationForm/FormList/Date';
import React from 'react';
import { RenderQuestionForm } from '../types/application';

export const renderQuestionForm: RenderQuestionForm = (
  keyName,
  answerType,
  index,
  props
) => {
  switch (keyName) {
    case 'phone': {
      props.rules = [
        { required: props.required },
        { pattern: phoneRegExp, message: phoneErrorMesage }
      ];
      props.placeholder = '+(374) XXXXXX';
      break;
    }
    case 'email': {
      props.rules = [{ required: props.required }, { type: 'email' }, { max: 128 }];
      props.placeholder = 'apply@analysed.ai';
      break;
    }
    default: {
      props.rules = [{ required: props.required }];
      props.placeholder = 'Please enter the field';
      break;
    }
  }

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
};
