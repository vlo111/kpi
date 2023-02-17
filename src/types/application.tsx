import { IAnswer, IApplicationFormSections, IQuestion, IRelatedQuestion } from './api/application/applicationForm1';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { RadioChangeEvent } from 'antd';
import React from 'react';
import { SectionName } from '../helpers/constants';
import { Moment } from 'moment';

export interface IFormAnswer {
  id?: string
  text?: string | Moment
}

export interface IAnswerProps {
  title: string
  questionId: string
  keyName: string
  answers: IFormAnswer[]
  answerType: string
  radioId?: string[]
  radioText?: string
}

export type GetAnswers = (items: IQuestion[] | IRelatedQuestion[]) => IAnswerProps[];

export type ConvertAnswerForm = (key: string, answers: IAnswer[]) => IFormAnswer;

export type InitAnswer = (
  keyName: string,
  answerType: string,
  answers: IAnswer[]
) => IFormAnswer[] | [];

export type GetSectionItem = (index: number) => JSX.Element | undefined;

export interface IApplicationFormProps {
  name: string
  section: IApplicationFormSections
}

export interface IFormQuestion { [p: string]: IAnswerProps[] }

export type ConcatAnswers = (items: IApplicationFormSections, educationQuestion: IFormQuestion) => void

export interface IApplicationForm {
  sections: IApplicationFormSections[]
  terms: string | undefined
  online: boolean | undefined
}

export interface IApplicationFormItems {
  name: string
  title: string
  description: string
  section: IApplicationFormSections
}

export type RenderQuestionForm = (
  keyName: string,
  answerType: string,
  index: number,
  props: IFormItemProps
) => JSX.Element;

export interface IFormItemProps {
  index: number
  title: string
  answers: IAnswer[]
  required?: boolean
  formName: string
  placeholder?: string
  relatedQuestions?: IRelatedQuestion[]
  rules?: any
}

export type CheckboxHandler = (values: CheckboxValueType[]) => void

export type RadioHandler = (event: RadioChangeEvent) => void

export type SetRequired = (item: boolean) => Array<{ required: boolean, message: string }>

export type SetOtherState = (value: boolean) => void

export type OnOtherChangeHandler = (value: React.ChangeEvent<HTMLInputElement>) => void

export interface ITermsConditionsProps {
  text: string | undefined
  onlineSignature: boolean | undefined
}

export type GetField = (name: SectionName) => any
