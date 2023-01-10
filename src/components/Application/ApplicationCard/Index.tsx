import React, { useState } from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomInput
} from '../applicationStyle';
import AddQuestionCard from '../AddQuestion/Index';
import { AsnSwitch } from '../../Forms/Switch';
import { IApplicationCard, IContent } from '../../../types/project';

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

const ApplicationCard: React.FC<IApplicationCard> = ({
  title,
  content,
  isQuestionCardVisible,
  setIsQuestionCardVisible,
  cardId
}) => {
  const [cardTitle, setCardTitle] = useState(title);
  console.log(isQuestionCardVisible, 'isQuestionCardVisible');

  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-light-amber)'}
      marginBottom={'2rem'}
    >
      <CardTitle
        editable={{
          icon: <EditIcon />,
          tooltip: false,
          onChange: setCardTitle
        }}
        level={5}
      >
        {cardTitle}
      </CardTitle>
      <CustomInput placeholder="Add description" />
      {content.length > 0
        ? (
        <>
          {content.map((item: IContent) => (
            <CardRow key={item.id} direction="horizontal">
              <ChoseTitle>{item.title}</ChoseTitle>
              <span>
                <ChoseType>
                  {item.answerType === 'SHORT_TEXT'
                    ? 'Short text'
                    : item.answerType === 'OPTION'
                      ? 'Select one'
                      : item.answerType === 'YES_NO'
                        ? 'Yes/No'
                        : item.answerType === 'CHECKBOX'
                          ? 'Multiple answers'
                          : 'DD/MM/YYYY'}
                </ChoseType>
                <AsnSwitch
                  defaultChecked={item?.active}
                  disabled={!item?.editable}
                />
              </span>
            </CardRow>
          ))}
        </>
          )
        : null}
      {isQuestionCardVisible.includes(cardId)
        ? (
        <AddQuestionCard
          setIsQuestionCardVisible={setIsQuestionCardVisible}
          isQuestionCardVisible={isQuestionCardVisible}
          cardId={cardId}
        />
          )
        : (
        <CustomButton
          className="default"
          onClick={() =>
            setIsQuestionCardVisible([...isQuestionCardVisible, cardId])
          }
        >
          +Add question
        </CustomButton>
          )}
    </CardContainer>
  );
};

export default ApplicationCard;
