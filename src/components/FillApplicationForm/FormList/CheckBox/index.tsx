import React, { Fragment, useState } from 'react';
import { Space } from 'antd';

import { AsnCheckbox } from '../../../Forms/Checkbox';
import { AsnForm } from '../../../Forms/Form';

import { IAnswer } from '../../../../types/api/application/applicationForm';
import { ISectionCheckProps } from '../../../../types/application';

import { Void } from '../../../../types/global';
import { BorderBottomInput } from '../../style';

const SectionCheckBox: React.FC<ISectionCheckProps> = ({
  title,
  answers,
  index,
  otherOption
}) => {
  const form = AsnForm.useFormInstance();
  const [openOther, setOpenOther] = useState(false);

  const checkboxHandler: Void = () => {
    form.setFieldValue(
      ['personal_info', index, 'answers', answers.length, 'text'],
      ''
    );
    setOpenOther(!openOther);
  };

  return (
    <Fragment key={index}>
      <p>{title}</p>
      {answers?.map((item: IAnswer, i) => (
        <AsnForm.Item
          style={{ marginBottom: '8px' }}
          key={i} name={[index, 'answers', i, 'id']}
        >
          <Space direction="vertical">
            <AsnCheckbox key={item.id}>
              {item.title}
            </AsnCheckbox>
          </Space>
        </AsnForm.Item>
      ))}
      {otherOption && (
        <AsnCheckbox
          onChange={checkboxHandler}
        >
          <Space direction="vertical">
            <AsnForm.Item
              key={index}
              name={[index, 'answers', answers.length, 'text']}
            >
              <BorderBottomInput disabled={!openOther} />
            </AsnForm.Item>
          </Space>
        </AsnCheckbox>
      )}
    </Fragment>
  );
};

export default SectionCheckBox;
