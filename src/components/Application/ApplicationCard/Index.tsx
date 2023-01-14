import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Popover, Row, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/md-menu.svg';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomInput
} from '../applicationStyle';
import AddQuestionCard from '../AddQuestion/Index';
import { AsnSwitch } from '../../Forms/Switch';
import { IApplicationCard, IContent } from '../../../types/project';
import { FormFinish, Onchange, StringVoidType } from '../../../types/global';

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
  cardId,
  applicationData,
  setApplicationData
}) => {
  const [cardTitle, setCardTitle] = useState(title);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const onEditedQuestion: FormFinish = (item) => {};

  const onDeletedQuestion: StringVoidType = (id) => {};

  const handleOpenChange: Onchange = (newOpen) => {
    setOpenPopover(newOpen);
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
            <CardRow
              key={item.id !== undefined ? item.id : uuidv4()}
              direction="horizontal"
            >
              <ChoseTitle>{item.title}</ChoseTitle>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
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
                {item.editable
                  ? (
                  <Popover
                    placement="topLeft"
                    content={() => contentPopover(item.id)}
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
                  : null}
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
          applicationData={applicationData}
          setApplicationData={setApplicationData}
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
