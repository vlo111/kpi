import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Popover, Row, Space } from 'antd';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/md-menu.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';

import { AsnSwitch } from '../../Forms/Switch';
import { FormFinish, NumberVoidType, Onchange } from '../../../types/global';
import { IQuestionRowContainer } from '../../../types/project';

const CardRow = styled(Space)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 0.5px solid var(--light-border);
  background-color: var(--white);
  padding: 12px 12px 12px 8px;

  div:nth-child(1) {
    width: 70%;
  }
`;

const ChoseType = styled.span`
  font-size: var(--font-size-small);
  color: var(--dark-5);
  margin-right: 1rem;
`;

const ChoseTitle = styled.span`
  font-size: var(--base-font-size);
`;

const QuestionRowContainer: React.FC<IQuestionRowContainer> = ({
  question,
  index,
  content,
  applicationData,
  setApplicationData,
  setIsQuestionCardVisible,
  isQuestionCardVisible,
  cardId,
  setAnswerTypeValue,
  setSingleQuestionData,
  setAddOrUpdateQuestion,
  setQuestionRowIndex
}) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const onEditedQuestion: FormFinish = (item) => {
    setQuestionRowIndex(item);
    setSingleQuestionData({ ...content[item] });
    setAnswerTypeValue(question?.answerType);
    setIsQuestionCardVisible([...isQuestionCardVisible, cardId]);
    setOpenPopover(!openPopover);
    setAddOrUpdateQuestion('edit');
  };

  const onDeletedQuestion: NumberVoidType = (item) => {
    content.splice(item, 1);
    setApplicationData({ ...applicationData });
    setOpenPopover(!openPopover);
  };

  const handleOpenChange: Onchange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const handleIsRequiredQuestion: FormFinish = (check) => {
    content[index].required = check;
  };
  const contentPopover: (i: any) => JSX.Element = (item) => (
    <Row
      style={{
        fontSize: 'var(--font-size-small)',
        color: 'var(--dark-2)',
        cursor: 'pointer'
      }}
      gutter={[8, 8]}
    >
      <Col onClick={() => onEditedQuestion(item)} span={24}>
        <EditIcon /> Edit
      </Col>
      <Col onClick={() => onDeletedQuestion(item)} span={24}>
        <DeleteIcon /> Delete
      </Col>
    </Row>
  );

  return (
    <CardRow direction="horizontal">
      <ChoseTitle>{question.title}</ChoseTitle>
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <ChoseType>
          {question.answerType === 'SHORT_TEXT'
            ? 'Short text'
            : question.answerType === 'OPTION'
              ? 'Select one'
              : question.answerType === 'YES_NO'
                ? 'Yes/No'
                : question.answerType === 'CHECKBOX'
                  ? 'Multiple answers'
                  : 'DD/MM/YYYY'}
        </ChoseType>
        <AsnSwitch
          defaultChecked={question?.active}
          disabled={!question?.editable}
          onChange={handleIsRequiredQuestion}
        />
        {question?.editable
          ? (
          <Popover
            placement="topLeft"
            content={() => contentPopover(index)}
            trigger="click"
            overlayClassName="menuPopover"
            onOpenChange={handleOpenChange}
            open={openPopover}
          >
            <div style={{ marginLeft: '8px', cursor: 'pointer' }}>
              <MenuIcon />
            </div>
          </Popover>
            )
          : <div style={{ width: '11px' }}></div>}
      </span>
    </CardRow>
  );
};

export default QuestionRowContainer;
