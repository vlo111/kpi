import {
  AnswerTypes,
  ErrorRequireMessages,
  KeyName,
  phoneErrorMesage,
  phoneRegExp,
  Placeholders,
  SectionName
} from './constants';
import SectionCheckBox from '../components/ApplicantPublicForm/Form/FormList/CheckBox';
import SectionSelect from '../components/ApplicantPublicForm/Form/FormList/Select';
import SectionRadio from '../components/ApplicantPublicForm/Form/FormList/Radio';
import SectionText from '../components/ApplicantPublicForm/Form/FormList/Text';
import SectionDate from '../components/ApplicantPublicForm/Form/FormList/Date';
import React from 'react';
import {
  ConcatAnswers,
  ConvertAnswerForm,
  GetAnswers,
  IFormQuestion,
  InitAnswer,
  RenderQuestionForm
} from '../types/application';
import {
  IApplicationFormSections,
  IQuestion,
  IRelatedQuestion
} from '../types/api/application/applicationForm1';

export const renderQuestionForm: RenderQuestionForm = (
  keyName,
  answerType,
  index,
  props,
  preview
) => {
  switch (keyName) {
    case KeyName.phone: {
      props.rules = [
        { required: props.required },
        { pattern: phoneRegExp, message: phoneErrorMesage }
      ];
      props.placeholder = Placeholders.phone;
      break;
    }
    case KeyName.dob: {
      props.rules = [{ required: props.required }];
      props.placeholder = Placeholders.date;
      break;
    }
    case KeyName.email: {
      props.rules = [
        { required: props.required },
        { type: KeyName.email },
        { max: 128 }
      ];
      props.placeholder = Placeholders.email;
      break;
    }
    default: {
      if (
        answerType === AnswerTypes.options ||
        answerType === AnswerTypes.checkbox
      ) {
        props.rules = props.rules = [
          { required: props.required, message: ErrorRequireMessages.checkbox }
        ];
      } else {
        props.rules = [{ required: props.required }];
      }
      props.placeholder = `${props.title}`;
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
      return (
        <SectionRadio
          key={index}
          defaultRelatedValue={SectionName.otherInfo === props.formName ? preview === true : true}
          {...props}
        />
      );
    }
    default: {
      return <SectionDate key={index} {...props} />;
    }
  }
};

const concatRelatedAnswers: ConcatAnswers = (items, educationQuestion) => {
  const relatedQuestions: IRelatedQuestion[] = items.questions
    .filter((q) => q.keyName !== 'disability')
    .map((q: IQuestion) => q.relatedQuestions)
    .filter((f: IRelatedQuestion[]) => f.length)
    .flat();

  const relatedQuestionAnswer = getAnswers(relatedQuestions);

  const key = Object.keys(educationQuestion)[0];

  educationQuestion[key] = educationQuestion[key].concat(relatedQuestionAnswer);
};

export const getRelatedQuestions: (
  section: IApplicationFormSections
) => IFormQuestion = (section) => {
  const question: IFormQuestion = {
    [section.keyName]: getAnswers(section.questions)
  };

  concatRelatedAnswers(section, question);

  return question;
};

const initAnswers: InitAnswer = (keyName, answerType, answers) =>
  keyName === AnswerTypes.region || answerType === AnswerTypes.checkbox
    ? []
    : [convertAnswerForm(keyName, answers)];

const convertAnswerForm: ConvertAnswerForm = (key, answers) => ({
  id: key === 'disability' ? answers[1]?.id : answers[0]?.id
});

/**
 * Init Applicant Form Answers
 * Get Form answers array
 * @param items
 */
export const getAnswers: GetAnswers = (items) =>
  items?.map((p: IQuestion | IRelatedQuestion) => ({
    questionId: p.id,
    keyName: p.keyName,
    answerType: p.answerType,
    title: p.title,
    answers: initAnswers(p.keyName, p.answerType, p.answers)
  }));
