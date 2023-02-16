import React, { Fragment, useState } from 'react';
import { Space } from 'antd';

import { AsnCheckbox } from '../../../../Forms/Checkbox';
import { AsnForm } from '../../../../Forms/Form';

import { IAnswer } from '../../../../../types/api/application/applicationForm1';
import {
  CheckboxHandler,
  IFormAnswer,
  IFormItemProps,
  OnOtherChangeHandler,
  SetOtherState,
  SetRequired
} from '../../../../../types/application';

import {
  AnswerTypes,
  ErrorRequireMessages
} from '../../../../../helpers/constants';
import { BorderBottomInput } from '../../../../ApplicantPublicForm/Form/style';

const setRequired: SetRequired = (item) => [
  { required: item, message: ErrorRequireMessages.input }
];

const SectionCheckBox: React.FC<IFormItemProps> = ({
  title,
  answers,
  index,
  formName,
  rules
}) => {
  const form = AsnForm.useFormInstance();

  const [openOther, setOpenOther] = useState(false);
  const [otherRules, setOtherRules] = useState(setRequired(false));

  const setOtherState: SetOtherState = (value) => {
    setOpenOther(value);
    setOtherRules(setRequired(value));
  };

  const onCheckboxHandler: CheckboxHandler = (values) => {
    const otherId = answers.find((a) => a.type === AnswerTypes.shortText)?.id;

    const isCheckedOther = values.includes(otherId ?? '');

    const text = form.getFieldValue([formName, index, 'radioText']);

    if (isCheckedOther) {
      setOtherState(true);
    } else {
      form.setFieldValue([formName, index, 'radioText'], '');
      setOtherState(false);
    }

    const fieldAnswer = values.map((v) => {
      const answer: { id: string, text?: string } = {
        id: v as string
      };

      if (v === otherId && isCheckedOther) {
        answer.text = text;
      }

      return answer;
    });

    form.setFieldValue([formName, index, 'answers'], fieldAnswer);
  };

  const onOtherChangeHandler: OnOtherChangeHandler = (event) => {
    const otherIndex = form
      .getFieldValue([formName, index, 'answers'])
      .findIndex((a: IFormAnswer) => a.text);

    form.setFieldValue(
      [formName, index, 'answers', otherIndex, 'text'],
      event.target.value
    );
  };

  const other = (
    <Space direction="horizontal">
      <span className="other">Other/Այլ</span>
      <AsnForm.Item key={index} rules={otherRules} name={[index, 'radioText']}>
        <BorderBottomInput
          disabled={!openOther}
          onChange={onOtherChangeHandler}
        />
      </AsnForm.Item>
    </Space>
  );

  return (
    <Fragment key={index}>
      <p>{title}</p>
      <AsnForm.Item key={index} name={[index, 'radioId']} rules={rules}>
        <AsnCheckbox.Group onChange={onCheckboxHandler}>
          <Space direction="vertical">
            {answers?.map((item: IAnswer, i) => (
              <AsnCheckbox key={item.id} value={item.id}>
                {item.type === AnswerTypes.shortText
                  ? (
                      other
                    )
                  : (
                  <p>{item.title}</p>
                    )}
              </AsnCheckbox>
            ))}
          </Space>
        </AsnCheckbox.Group>
      </AsnForm.Item>
    </Fragment>
  );
};

export default SectionCheckBox;
