import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Col, Row, Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnSelect } from '../../Forms/Select';
import { AsnSwitch } from '../../Forms/Switch';

import { ReactComponent as DuplicateIcon } from '../../../components/Project/SubActivity/SubActivityIcons/copy.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
// import { ReactComponent as RadioIcon } from '../../../assets/icons/radio.svg';
// import { ReactComponent as CheckboxIcon } from '../../../assets/icons/checkbox.svg';
// import { ReactComponent as TextIcon } from '../../../assets/icons/text.svg';
import { assessmentSelect } from '../../../helpers/constants';

const { Option } = AsnSelect;
const { Title } = Typography;

const HeaderWrapper = styled(Row)`
  border-bottom: 1px dashed var(--dark-border-ultramarine);
  padding-bottom: 2vh;
  .select_question_item {
    width: 30%;
  }
  .ant-form-item {
    margin: 0;
  }
  .icons {
    display: flex;
    cursor: pointer;
  }
`;

const AnswerTypeSelect = styled(AsnSelect)`
  width: 100% !important;
  .ant-select {
    .ant-select-in-form-item {
      :hover {
        border: 1px solid red !important;
      }
    }
  }

  .ant-select-selector {
    height: 44px !important;
    display: flex;
    align-items: center;
    border: none !important;
  }
`;

const QuestionHeader: React.FC<any> = ({ remove, name, questionsLists }) => {
  const form = AsnForm.useFormInstance();
  const onDuplicateForm = (): any => {
    console.log(form.getFieldsValue());
  };

  return (
    <HeaderWrapper align="middle" justify="space-between">
      <AsnForm.Item name={[name[0], 'type']} className="select_question_item">
        <AnswerTypeSelect>
          {assessmentSelect.map((item) => (
            <Fragment key={item.value}>
              <Option value={item.value}>{item.name}</Option>
            </Fragment>
          ))}
        </AnswerTypeSelect>
      </AsnForm.Item>
      <AsnForm.Item name="required" valuePropName="checked">
        <Row align="middle" justify="center" gutter={16}>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Title
              level={5}
              style={{ fontWeight: '400', margin: '0 0.5rem 0 ' }}
            >
              Required Question
            </Title>
            <AsnSwitch />
          </Col>
          <Col className="icons" onClick={onDuplicateForm}>
            <DuplicateIcon />
          </Col>
          {questionsLists.length > 1
            ? (
            <Col className="icons" onClick={() => remove(name)}>
              <DeleteIcon />
            </Col>
              )
            : null}
        </Row>
      </AsnForm.Item>
    </HeaderWrapper>
  );
};

export default QuestionHeader;
