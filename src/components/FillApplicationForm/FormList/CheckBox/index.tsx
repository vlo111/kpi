import React, { Fragment, useState } from 'react';
import { Space } from 'antd';

import { AsnCheckbox } from '../../../Forms/Checkbox';
import { AsnForm } from '../../../Forms/Form';

import { IAnswer } from '../../../../types/api/application/applicationForm';
import { CheckboxHandler, IFormItemProps } from '../../../../types/application';

import { AnswerTypes, ErrorRequireMessages } from '../../../../helpers/constants';
import { BorderBottomInput, FormText } from '../../style';

const SectionCheckBox: React.FC<IFormItemProps> = ({
  title,
  answers,
  index,
  formName,
  rules
}) => {
  const form = AsnForm.useFormInstance();
  const [openOther, setOpenOther] = useState(false);

  const onCheckboxHandler: CheckboxHandler = (values) => {
    const id = answers.find((a) => a.type === AnswerTypes.shortText)?.id;

    if (values.includes(id ?? '')) {
      setOpenOther(true);
    } else {
      // if (form.getFieldValue([formName, index, 'answers', 1, 'text']) !== undefined) {
      // form.setFieldValue([formName, index, 'answers', 1, 'text'], undefined);
      setOpenOther(false);
      // }
    }
  };

  const other = (
    <Space direction="horizontal">
      <FormText>Other/Այլ</FormText>
      <AsnForm.Item key={index} rules={[{ required: true, message: ErrorRequireMessages.input }]} name={[index, 'answers', 1, 'text']}>
        <BorderBottomInput disabled={!openOther} />
      </AsnForm.Item>
    </Space>
  );

  return (
    <Fragment key={index}>
      <p>{title}</p>
      <AsnForm.Item
        key={index}
        name={[index, 'answers', 0, 'id']}
        rules={rules}
      >
        <AsnCheckbox.Group onChange={onCheckboxHandler}>
          <Space direction="vertical">
            {answers?.map((item: IAnswer, i) => (
              <AsnCheckbox key={item.id} value={item.id}>
                {item.type === AnswerTypes.shortText ? other : <p>{item.title}</p>}
                </AsnCheckbox>
            ))}
          </Space>
        </AsnCheckbox.Group>
      </AsnForm.Item>
    </Fragment>
  );
};

export default SectionCheckBox;
