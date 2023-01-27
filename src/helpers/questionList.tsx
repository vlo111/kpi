import React from 'react';
import { Col, Row } from 'antd';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import { FormFinish, NumberVoidType } from '../types/global';
import { IApplicant } from '../types/api/application/applicationForm';

export const addQuestion = (
  value: any,
  section: number,
  applicationData: any,
  answerTypeValue: string
): void => {
  applicationData?.applicationFormSections[section].questions?.push({
    relatedQuestions: [],
    answerType: answerTypeValue,
    title: value.question,
    answers:
      value.names !== undefined && value.answerTypeName !== 'YES_NO'
        ? value.names.map((item: string) => {
          return {
            title: item,
            type: answerTypeValue
          };
        })
        : value.answerTypeName === 'YES_NO'
          ? [
              { type: 'OPTION', title: 'Yes/Այո' },
              { type: 'OPTION', title: 'No/Ոչ' }
            ]
          : [],
    editable: true,
    otherOption: value.otherOption !== undefined ? value.otherOption : false,
    required: value.requiredFiled !== undefined ? value.requiredFiled : true,
    active: true
  });
};

export const updateQuestion = (
  value: any,
  sectionNumber: number,
  applicationData: any,
  questionRowIndex: number | undefined,
  answerTypeValue: string
): void => {
  applicationData?.applicationFormSections[sectionNumber].questions?.splice(
    questionRowIndex,
    1,
    {
      relatedQuestions: [],
      answerType: answerTypeValue,
      title: value.question,
      answers:
        value.names !== undefined && value.answerTypeName !== 'YES_NO'
          ? value.names.map((item: string) => {
            return {
              title: item,
              type: answerTypeValue
            };
          })
          : value.answerTypeName === 'YES_NO'
            ? [
                { type: 'OPTION', title: 'Yes/Այո' },
                { type: 'OPTION', title: 'No/Ոչ' }
              ]
            : [],
      editable: true,
      otherOption: value.otherOption !== undefined ? value.otherOption : false,
      required: value.requiredFiled !== undefined ? value.requiredFiled : true,
      active: true
    }
  );
};

export const addDescription = (
  applicationData: IApplicant,
  sectionNumber: number,
  descriptionRef: any
): void => {
  applicationData.applicationFormSections[sectionNumber].description =
    descriptionRef !== null ? descriptionRef?.current?.input?.value ?? '' : '';
};

export const contentPopover: (
  i: number,
  onEditedQuestion: FormFinish,
  onDeletedQuestion: NumberVoidType
) => JSX.Element = (item, onEditedQuestion, onDeletedQuestion) => (
  <Row
    style={{
      fontSize: 'var(--font-size-small)',
      color: 'var(--dark-2)',
      cursor: 'pointer'
    }}
    gutter={[8, 8]}
  >
    <Col onClick={() => onEditedQuestion(item)} span={24}>
      <EditIcon /> Edit
    </Col>
    <Col onClick={() => onDeletedQuestion(item)} span={24}>
      <DeleteIcon /> Delete
    </Col>
  </Row>
);
