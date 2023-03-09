import React, { useState } from 'react';
import styled from 'styled-components';
import { Popover, Space } from 'antd';
import { ReactComponent as MenuIcon } from '../../../assets/icons/md-menu.svg';

import { AsnSwitch } from '../../Forms/Switch';
import { FormFinish, NumberVoidType, Onchange } from '../../../types/global';
import { IQuestionRowContainer } from '../../../types/api/application/applicationForm';
import { contentPopover } from '../../../helpers/questionList';

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
  answerTypeValue,
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
    const applicationDataClone = JSON.parse(JSON.stringify(applicationData));
    if (cardId === 'personal_info') {
      applicationDataClone?.applicationFormSections[0]?.questions.splice(
        item,
        1
      );
    } else if (cardId === 'educational_info') {
      applicationDataClone?.applicationFormSections[1]?.questions.splice(
        item,
        1
      );
    } else if (cardId === 'other_info') {
      applicationDataClone?.applicationFormSections[2]?.questions.splice(
        item,
        1
      );
    } else {
      applicationDataClone?.applicationFormSections[3]?.questions.splice(
        item,
        1
      );
    }
    setApplicationData({ ...applicationDataClone });
    setOpenPopover(!openPopover);
    setIsQuestionCardVisible(
      isQuestionCardVisible.filter((itemId) => itemId !== cardId)
    );
  };

  const handleOpenChange: Onchange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const handleIsRequiredQuestion: FormFinish = (check) => {
    content[index].required = check;
  };

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
        {question?.required !== undefined && (
          <AsnSwitch
            defaultChecked={question?.required}
            disabled={
              !question?.editable ||
              answerTypeValue === 'OPTION' ||
              answerTypeValue === 'YES_NO'
            }
            onChange={handleIsRequiredQuestion}
          />
        )}
        {question?.editable
          ? (
          <Popover
            placement="topLeft"
            content={() =>
              contentPopover(index, onEditedQuestion, onDeletedQuestion)
            }
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
          : (
          <div style={{ width: '11px' }}></div>
            )}
      </span>
    </CardRow>
  );
};

export default QuestionRowContainer;
