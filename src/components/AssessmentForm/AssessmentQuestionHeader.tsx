import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { AsnForm } from '../Forms/Form';
import { AsnSelect } from '../Forms/Select';
import { AsnSwitch } from '../Forms/Switch';

import { ReactComponent as DuplicateIcon } from '../../components/Project/SubActivity/SubActivityIcons/copy.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const HeaderWrapper = styled(Row)`
  border-bottom: 1px dashed var(--dark-border-ultramarine);
  padding-bottom: 2vh;
  .select_question_item{
    width: 20%;
  }
  .ant-form-item {
    margin: 0;
  }
  .icons{
    display: flex;
  }
`;

const QuestionHeader: React.FC = () => {
  const { Option } = AsnSelect;
  return (
    <HeaderWrapper align="middle" justify="space-between">
      <AsnForm.Item name='AnswerType' className='select_question_item'>
        <AsnSelect>
          <Option value="NUMBER">One answer</Option>
          <Option value="ATTACHMENT">Multiple answers</Option>
          <Option value="PERCENTAGE">Text answer</Option>
        </AsnSelect>
      </AsnForm.Item>
      <Row align="middle" justify="center" gutter={16}>
        <Col>Required Question</Col>
        <AsnForm.Item name="required" valuePropName="checked">
          <AsnSwitch />
        </AsnForm.Item>
        <Col className='icons'>
          <DuplicateIcon />
        </Col>
        <Col className='icons'>
          <DeleteIcon />
        </Col>
      </Row>
    </HeaderWrapper>
  );
};

export default QuestionHeader;
