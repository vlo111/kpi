import { IAnswer, IApplicationFormSections, IQuestion } from './api/application/applicationForm';

export interface IFormAnswer {
  id: string
  text: string
}

export interface IAnswerProps {
  title: string
  id: string
  keyName: string
  answers: IFormAnswer[]
  answerType: string
}

export type GetAnswers = (items: IQuestion[]) => IAnswerProps[];

export type ConvertAnswerForm = (key: string, answers: IAnswer[]) => IFormAnswer;

export type InitAnswer = (
  keyName: string,
  answerType: string,
  answers: IAnswer[]
) => IFormAnswer[] | [];

export type GetSectionItem = (index: number) => JSX.Element;

export interface IApplicationFormProps {
  name: string
  section: IApplicationFormSections
}

export interface ISection {
  title: string
  index: number
  required: boolean
}

export interface ISectionProps extends ISection {
  answers: IAnswer[]
}

export interface ISectionCheckProps extends ISectionProps {
  otherOption: boolean
}

export interface IParse {
  str: string | undefined
}
