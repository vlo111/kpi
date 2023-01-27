import React from 'react';
import { AsnForm } from '../components/Forms/Form';
import { clearLocalStorage } from '../hooks/useLocalStorage';
import { TVoid } from '../types/global';
import { CollapseHeader, SetResultArea, SetTitleColor } from '../types/project';
import { AsnInput } from '../components/Forms/Input';
import _ from 'lodash';
import { ConvertAnswerForm, GetAnswers, InitAnswer } from '../types/application';
import { IQuestion } from '../types/api/application/applicationForm';
import { AnswerTypes } from './constants';

/** Logout the user */
export const logOut: TVoid = () => {
  clearLocalStorage();
  window.location.reload();
};

export const noop: TVoid = () => { };

export const handleErrorMessage = (response: any): string => {
  return response?.data?.message;
};

export const HeaderElement: CollapseHeader = (key, name, index, placeholder, className) => (
  <div key={`${className}${key}`} onClick={(e) => e.stopPropagation()}>
    <AsnForm.Item name={name} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={index} placeholder={placeholder} />
    </AsnForm.Item>
  </div>
);

export const TollTipText: (
  ...items: string[]
) => React.ReactNode = (...items) => (
  <div>
    <p style={{ marginBottom: '1rem' }}>
      Must include at least one result area and at least one expected result
      measurement.
    </p>
    <ul
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        marginLeft: '1rem'
      }}
    >
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  </div>
);

const setTitleColor: SetTitleColor = (element, color) => {
  const titleElement = element.firstChild as HTMLElement;

  const pathElement = element.lastChild?.firstChild as HTMLElement;

  titleElement.style.color = color;

  pathElement.style.fill = color;
};

export const validateResultArea: SetResultArea = (values) => {
  // @ts-expect-error
  const errorsIndex = [...new Set(values.errorFields.map((r) => r.name[1]))];

  const resultAreaElement: (id: string) => void = (id) => {
    const resultAreaElement = document.getElementById(
      `ans-title-${id}`
    ) as HTMLElement;

    setTitleColor(resultAreaElement, 'var(--error)');
  };

  const resultAreaElements: HTMLCollectionOf<HTMLElement> =
    document.getElementsByClassName(
      'result_area_title'
    ) as HTMLCollectionOf<HTMLElement>;

  if (!_.isEmpty(resultAreaElements)) {
    Array.from(resultAreaElements).forEach((element) => {
      setTitleColor(element, 'var(--dark-2)');
    });
  }

  errorsIndex.map((i: any) => resultAreaElement(i));
};

const initAnswers: InitAnswer = (keyName, answerType, answers) => {
  if (keyName === AnswerTypes.region || answerType === AnswerTypes.checkbox) {
    return [];
  }
  return [convertAnswerForm(keyName, answers)];
};

const convertAnswerForm: ConvertAnswerForm = (key, answers) => ({
  id: answers[0]?.id,
  text: answers[0]?.title
});

/**
 * Init Applicant Form Answers
 * Get Form answers array
 * @param items
 */
export const getAnswers: GetAnswers = (items) =>
  items?.map((p: IQuestion) => ({
    id: p.id,
    keyName: p.keyName,
    answerType: p.answerType,
    title: p.title,
    answers: initAnswers(p.keyName, p.answerType, p.answers)
  }));
