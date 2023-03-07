import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Col, Row, Tooltip, Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnSelect } from '../../Forms/Select';
import { AsnSwitch } from '../../Forms/Switch';

import { ReactComponent as DuplicateIcon } from '../../../components/Project/SubActivity/SubActivityIcons/copy.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as RadioIcon } from '../../../assets/icons/radio.svg';
import { ReactComponent as CheckboxIcon } from '../../../assets/icons/checkbox.svg';
import { ReactComponent as TextIcon } from '../../../assets/icons/text.svg';
import { assessmentSelect } from '../../../helpers/constants';
import { FormFinish, Void } from '../../../types/global';
import { IQuestionHeader } from '../../../types/api/assessment';
import { IconButton } from '../assessmentStyle';

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
    .ant-select-selection-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

const QuestionHeader: React.FC<IQuestionHeader> = ({
  remove,
  name,
  add,
  setAnswerType,
  answerType,
  questionsLists,
  preview,
  calcScores,
  removeQuestion,
  addQuestionChecks
}) => {
  const form = AsnForm.useFormInstance();
  const onDuplicateForm: Void = () => {
    setAnswerType(form.getFieldsValue().questions[name[0]].answerType);
    add(form.getFieldsValue().questions[name[0]]);
  };

  const answerTypeChange: FormFinish = (value) => {
    removeQuestion(name[0], false);

    if (value === 'SHORT_TEXT') {
      form.setFieldValue(['questions', name[0]], {
        answers: [],
        answerType: value,
        required: true,
        title: ''
      });
    } else {
      form.setFieldValue(['questions', name[0]], {
        answerType: value,
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

      addQuestionChecks(value);
    }
    setAnswerType(value);
  };

  return (
    <HeaderWrapper align="middle" justify="space-between">
      <AsnForm.Item
        name={[name[0], 'answerType']}
        className="select_question_item"
        initialValue={answerType}
      >
        <AnswerTypeSelect
          onChange={answerTypeChange}
          getPopupContainer={(trigger) => trigger.parentNode}
        >
          {assessmentSelect.map((item) => (
            <Fragment key={item.value}>
              <Option value={item.value}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {item.value === 'OPTION'
                    ? (
                    <RadioIcon />
                      )
                    : item.value === 'CHECKBOX'
                      ? (
                    <CheckboxIcon />
                        )
                      : (
                    <TextIcon />
                        )}
                  {item.name}
                </div>
              </Option>
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
        <Col className="icons">
          <Tooltip
            placement="topLeft"
            title={<span>Duplicate</span>}
            overlayClassName="tooltipHelper"
          >
            <IconButton onClick={onDuplicateForm}>
              <DuplicateIcon />
            </IconButton>
          </Tooltip>
        </Col>
        {questionsLists.length > 2
          ? (
          <Col className="icons">
            <IconButton
              disabled={preview}
              onClick={() => {
                remove(name);
                calcScores();
                removeQuestion(name[0], true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Col>
            )
          : null}
      </Row>
    </HeaderWrapper>
  );
};

export default QuestionHeader;
