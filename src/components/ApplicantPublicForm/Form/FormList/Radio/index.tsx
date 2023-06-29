import React, { useState } from 'react';
import { Radio, Space } from 'antd';

import {
  IFormItemProps,
  RadioHandler,
  SetOtherState,
  SetRequired
} from '../../../../../types/application';

import {
  IAnswer,
  IRelatedQuestion
} from '../../../../../types/api/application/applicationForm1';
import { AsnForm } from '../../../../Forms/Form';
import {
  getAnswers,
  renderQuestionForm
} from '../../../../../helpers/applicationForm';

import {
  AnswerTypes,
  ErrorRequireMessages
} from '../../../../../helpers/constants';
import {
  BorderBottomInput,
  CustomRadio
} from '../../../../ApplicantPublicForm/Form/style';
import _ from 'lodash';

const setRequired: SetRequired = (item) => [
  { required: item, message: ErrorRequireMessages.input }
];

const SectionRadio: React.FC<IFormItemProps> = ({
  title,
  defaultRelatedValue = true,
  answers,
  index,
  formName,
  relatedQuestions
}) => {
  const form = AsnForm.useFormInstance();

  const [showRelatedQuestion, setShowRelatedQuestion] = useState(defaultRelatedValue);

  const [openOther, setOpenOther] = useState(false);
  const [otherRules, setOtherRules] = useState(setRequired(false));

  const setOtherState: SetOtherState = (value) => {
    setOpenOther(value);
    setOtherRules(setRequired(value));
  };

  const renderRelatedQuestion: (question: IRelatedQuestion) => JSX.Element = (
    question
  ) => {
    const { answerType, keyName, title, answers, required } = question;

    const formSection = form.getFieldValue(formName ?? '');

    const index = formSection
      .map((f: { keyName: string }) => f.keyName)
      .indexOf(keyName);

    const props = {
      index,
      title,
      answers,
      formName,
      required
    };

    return renderQuestionForm(keyName, answerType, index, props);
  };

  /**
   * render yes or no related question
   * update state radio for form item other id or text
   * @param event
   */
  const onRadioHandler: RadioHandler = (event) => {
    const { value } = event.target;

    if (relatedQuestions !== undefined && relatedQuestions.length > 0) {
      const formValues = _.cloneDeep(form.getFieldValue(formName));
      if (showRelatedQuestion) {
        for (const relatedQuestion of relatedQuestions) {
          const index = formValues.findIndex(
            (f: IRelatedQuestion) => f?.keyName === relatedQuestion.keyName
          );

          formValues.splice(index, 1);
        }

        form.setFieldValue([formName], formValues);
      } else {
        const answers = getAnswers(relatedQuestions);

        const data = [...formValues, ...answers];
        form.setFieldValue([formName], data);
      }

      setShowRelatedQuestion(!showRelatedQuestion);
    } else {
      const otherId = answers.find((a) => a.type === AnswerTypes.shortText)?.id;

      const hasOther = value === otherId;

      if (hasOther) {
        setOtherState(true);
      } else {
        setOtherState(false);
      }

      const fieldAnswer = {
        id: value
      };

      form.setFieldValue([formName, index, 'answers', 0], fieldAnswer);
    }
  };

  const other = (
    <Space direction="horizontal">
      <span className="other">Other/Այլ</span>
      <AsnForm.Item
        key={index}
        name={[index, 'answers', 0, 'text']}
        rules={otherRules}
      >
        <BorderBottomInput disabled={!openOther} />
      </AsnForm.Item>
    </Space>
  );

  return (
    <>
      <AsnForm.Item
        key={index}
        name={[index, 'answers', 0, 'id']}
        label={title}
        labelCol={{ span: 24 }}
      >
        <Radio.Group onChange={onRadioHandler}>
          <Space direction="vertical">
            {answers?.map((item: IAnswer) => (
              <CustomRadio key={item.id} value={item.id}>
                {item.type === AnswerTypes.shortText ? other : <p>{item.title}</p>}
              </CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </AsnForm.Item>
      {showRelatedQuestion &&
        relatedQuestions?.map((question) => renderRelatedQuestion(question))}
    </>
  );
};

export default SectionRadio;
