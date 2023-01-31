import React, { Fragment } from 'react';
import { AsnForm } from '../components/Forms/Form';
import { clearLocalStorage } from '../hooks/useLocalStorage';
import { TVoid } from '../types/global';
import { CollapseHeader, SetResultArea, SetTitleColor } from '../types/project';
import { AsnInput } from '../components/Forms/Input';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Divider, Radio, Space } from 'antd';
import { DividerLine } from '../components/Application/applicationStyle';
import RelatedQuestion from '../components/Application/Preview/RelatedQuestion';
import { AsnCheckbox } from '../components/Forms/Checkbox';
import {
  GetApplicationData,
  IAnswer,
  IApplicant,
  IQuestion
} from '../types/api/application/applicationForm';

/** Logout the user */
export const logOut: TVoid = () => {
  clearLocalStorage();
  window.location.reload();
};

export const noop: TVoid = () => {};

export const handleErrorMessage = (response: any): string => {
  return response?.data?.message;
};

export const HeaderElement: CollapseHeader = (
  key,
  name,
  index,
  placeholder,
  className
) => (
  <div key={`${className}${key}`} onClick={(e) => e.stopPropagation()}>
    <AsnForm.Item name={name} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={index} placeholder={placeholder} />
    </AsnForm.Item>
  </div>
);

export const TollTipText: (...items: string[]) => React.ReactNode = (
  ...items
) => (
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

export const answerTypes = (type: string, question: IQuestion): JSX.Element => {
  const option = (
    <Radio.Group value={question?.answers[0]?.title}>
      <Space direction="vertical">
        {question?.answers?.map((answer: IAnswer) => (
          <Fragment key={answer?.id !== undefined ? answer.id : uuidv4()}>
            {answer.title?.includes('Other')
              ? (
              <DividerLine>
                <Radio value={answer.title} />
                <Divider orientation="left" plain>
                  {answer.title}
                </Divider>
              </DividerLine>
                )
              : (
              <Radio value={answer.title}>{answer.title}</Radio>
                )}
          </Fragment>
        ))}
      </Space>
    </Radio.Group>
  );

  const yesNo = (
    <>
      <Radio.Group value="Yes/Այո">
        <Space direction="vertical">
          {question?.answers?.map((answer: IAnswer) => (
            <Radio
              key={answer?.id !== undefined ? answer.id : uuidv4()}
              value={answer.title}
            >
              {answer.title}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      {question.relatedQuestions?.length > 0
        ? (
        <>
          {question.relatedQuestions?.map((relatedQuestion: any) => (
            <RelatedQuestion
              key={
                relatedQuestion?.id !== undefined
                  ? relatedQuestion?.id
                  : uuidv4()
              }
              relatedQuestion={relatedQuestion}
            />
          ))}
        </>
          )
        : null}
    </>
  );

  const checkbox = (
    <Space direction="vertical">
      {question?.answers?.map((answer: IAnswer, index: number) => (
        <Fragment key={answer?.id !== undefined ? answer.id : uuidv4()}>
          {answer.title?.includes('Other')
            ? (
            <DividerLine>
              <AsnCheckbox value={answer.title} />
              <Divider orientation="left" plain>
                {answer.title}
              </Divider>
            </DividerLine>
              )
            : (
            <AsnCheckbox defaultChecked={index === 0}>
              {answer.title}
            </AsnCheckbox>
              )}
        </Fragment>
      ))}
    </Space>
  );

  switch (type) {
    case 'YES_NO':
      return yesNo;
    case 'OPTION':
      return option;
    case 'SHORT_TEXT':
      return <AsnInput value="" />;
    default:
      return checkbox;
  }
};

export const getApplicationData: GetApplicationData = (data) =>
  _.pick(
    data,
    'applicationFormSections',
    'title',
    'description',
    'successMessage',
    'termsAndConditions',
    'onlineSignature',
    'deadline'
  ) as IApplicant;
