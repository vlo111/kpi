import React, { useState } from 'react';
import { Radio, Space } from 'antd';

import { IFormItemProps, RadioHandler } from '../../../../types/application';

import {
  IAnswer, IRelatedQuestion
} from '../../../../types/api/application/applicationForm';
import { AsnForm } from '../../../Forms/Form';
import { renderQuestionForm } from '../../../../helpers/applicationForm';

import { AnswerTypes, ErrorRequireMessages } from '../../../../helpers/constants';
import { BorderBottomInput, CustomRadio, FormText } from '../../style';

const SectionRadio: React.FC<IFormItemProps> = ({
  title,
  answers,
  index,
  formName,
  relatedQuestions
}) => {
  const form = AsnForm.useFormInstance();

  const [showRelatedQuestion, setShowRelatedQuestion] = useState(true);

  const [openOther, setOpenOther] = useState(false);

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

  const onRadioHandler: RadioHandler = (value) => {
    if (relatedQuestions !== undefined) {
      setShowRelatedQuestion(!showRelatedQuestion);
    }

    const id = answers.find((a) => a.type === AnswerTypes.shortText)?.id;

    if (value.target.value === id) {
      setOpenOther(true);
    } else {
      const formItemName = [formName, index, 'answers', 0, 'text'];

      if (form.getFieldValue(formItemName) !== undefined) {
        form.setFieldValue(formItemName, undefined);
        setOpenOther(false);
      }
    }
  };

  const other = (
    <Space direction="horizontal">
      <FormText>Other/Այլ</FormText>
      <AsnForm.Item key={index} name={[index, 'answers', 0, 'text']} rules={[{ required: true, message: ErrorRequireMessages.input }]}>
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
        <Radio.Group
          onChange={onRadioHandler}
        >
          <Space direction="vertical">
            {answers?.map((item: IAnswer) => (
              <>
                <CustomRadio key={item.id} value={item.id}>
                  {item.type === AnswerTypes.shortText ? other : <p>{item.title}</p>}
                </CustomRadio>
              </>
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
