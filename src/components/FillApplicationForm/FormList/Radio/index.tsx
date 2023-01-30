import React, { useState } from 'react';
import {
  IAnswer,
  IRelatedQuestion
} from '../../../../types/api/application/applicationForm';
import { AsnForm } from '../../../Forms/Form';
import { Radio, Space } from 'antd';
import { BorderBottomInput, CustomRadio } from '../../style';
import { ISectionCheckProps } from '../../../../types/application';
import { renderQuestionForm } from '../../../../helpers/applicationForm';

const SectionRadio: React.FC<ISectionCheckProps> = ({
  title,
  answers,
  index,
  otherOption,
  formName,
  relatedQuestions
}) => {
  const form = AsnForm.useFormInstance();

  const [showRelatedQuestion, setShowRelatedQuestion] = useState(true);

  const renderRelatedQuestion: (question: IRelatedQuestion) => JSX.Element = (
    question
  ) => {
    const { answerType, keyName, title, answers, otherOption, required } =
      question;

    const formSection = form.getFieldValue(formName ?? '');

    const index = formSection
      .map((f: { keyName: string }) => f.keyName)
      .indexOf(keyName);

    const props = {
      index,
      title,
      otherOption,
      answers,
      required
    };

    return renderQuestionForm(keyName, answerType, index, props);
  };

  return (
    <>
      <AsnForm.Item
        key={index}
        label={title}
        labelCol={{ span: 24 }}
        name={[index, 'answers', 0, 'id']}
        rules={[{ required: true, message: 'The field is required' }]}
      >
        <Radio.Group>
          <Space direction="vertical">
            {answers.map((item: IAnswer) => (
              <CustomRadio
                value={item.id}
                key={item.id}
                onChange={() => {
                  setShowRelatedQuestion(!showRelatedQuestion);
                }}
              >
                {item.title}
              </CustomRadio>
            ))}
            {otherOption && (
              <>
                <span>Other (specify)/ Այլ (նշել)</span>
                <BorderBottomInput />
              </>
            )}
          </Space>
        </Radio.Group>
      </AsnForm.Item>
      {showRelatedQuestion &&
        relatedQuestions !== undefined &&
        relatedQuestions?.map((question) => renderRelatedQuestion(question))}
    </>
  );
};

export default SectionRadio;
