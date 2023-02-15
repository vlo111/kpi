import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Col, Row, Tooltip, Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnSelect } from '../../Forms/Select';
import { AsnSwitch } from '../../Forms/Switch';

import { ReactComponent as DuplicateIcon } from '../../../components/Project/SubActivity/SubActivityIcons/copy.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
// import { ReactComponent as RadioIcon } from '../../../assets/icons/radio.svg';
// import { ReactComponent as CheckboxIcon } from '../../../assets/icons/checkbox.svg';
// import { ReactComponent as TextIcon } from '../../../assets/icons/text.svg';
import { assessmentSelect } from '../../../helpers/constants';
import { FormFinish } from '../../../types/global';

const { Option } = AsnSelect;
const { Title } = Typography;

const HeaderWrapper = styled(Row)`
  border-bottom: 1px dashed var(--dark-border-ultramarine);
  padding-bottom: 2vh;
  .select_question_item {
    width: 25%;
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

const QuestionHeader: React.FC<any> = ({
  remove,
  name,
  add,
  setAnswerType,
  answerType,
  questionsLists
}) => {
  const form = AsnForm.useFormInstance();
  const onDuplicateForm = (): any => {
    add(form.getFieldsValue().questions[name[0]]);
    // console.log(form.getFieldsValue().questions[name[0]].answers.findIndex((item: any) => item.score > 0));
  };

  const answerTypeChange: FormFinish = (value) => {
    if (value === 'SHORT_TEXT') {
      form.setFieldValue(['questions', name[0]], {
        answers: [],
        type: value,
        required: true,
        title: ''
      });
    } else {
      form.setFieldValue(['questions', name[0]], {
        type: value,
        required: true,
        answers: [
          {
            title: '',
            score: 0,
            type: value
          },
          {
            title: '',
            score: 0,
            type: value
          }
        ]
      });
    }
    setAnswerType(value);
  };

  return (
    <HeaderWrapper align="middle" justify="space-between">
      <AsnForm.Item
        name={[name[0], 'type']}
        className="select_question_item"
        initialValue={answerType}
      >
        <AnswerTypeSelect
          onChange={answerTypeChange}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {assessmentSelect.map((item) => (
            <Fragment key={item.value}>
              <Option value={item.value}>{item.name}</Option>
            </Fragment>
          ))}
        </AnswerTypeSelect>
      </AsnForm.Item>

      <Row align="middle" justify="center" gutter={16}>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Title level={5} style={{ fontWeight: '400', margin: '0 0.5rem 0 ' }}>
            Required Question
          </Title>
          <AsnForm.Item name={[name[0], 'required']} valuePropName="checked">
            <AsnSwitch />
          </AsnForm.Item>
        </Col>
        <Col className="icons" onClick={onDuplicateForm}>
          <Tooltip
            placement="topLeft"
            title={<span>Duplicate</span>}
            overlayClassName="tooltipHelper"
          >
            <DuplicateIcon />
          </Tooltip>
        </Col>
        {questionsLists.length > 1
          ? (
          <Col className="icons" onClick={() => remove(name)}>
            <DeleteIcon />
          </Col>
            )
          : null}
      </Row>
    </HeaderWrapper>
  );
};

export default QuestionHeader;
