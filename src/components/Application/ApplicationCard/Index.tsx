import React, { useState, useRef } from 'react';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomInput
} from '../applicationStyle';
import AddQuestionCard from '../AddQuestion/Index';
import { IApplicationCard, IContent } from '../../../types/project';
import QuestionRowContainer from '../QuestionRow/Index';
import { FormFinish } from '../../../types/global';

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
  const [answerTypeValue, setAnswerTypeValue] = useState('OPTION');
  const [addOrUpdateQuestion, setAddOrUpdateQuestion] = useState<string>('add');
  const [questionRowIndex, setQuestionRowIndex] = useState<number | undefined>();
  const [singleQuestionData, setSingleQuestionData] = useState<
  IContent | undefined | {}
  >();
  const descriptionRef = useRef<any>();

  const onAddDescription: FormFinish = (event) => {
    if (event.key === 'Enter') {
      if (cardId === 'personal_info') {
        applicationData.applicationFormSections[0].description =
          descriptionRef !== null ? descriptionRef?.current?.input?.value : '';
      } else if (cardId === 'educational_info') {
        applicationData.applicationFormSections[1].description =
          descriptionRef !== null ? descriptionRef?.current?.input?.value : '';
      } else if (cardId === 'other_info') {
        applicationData.applicationFormSections[2].description =
          descriptionRef !== null ? descriptionRef?.current?.input?.value : '';
      } else {
        applicationData.applicationFormSections[3].description =
          descriptionRef !== null ? descriptionRef?.current?.input?.value : '';
      }
    }
  };

  const onSaveTitle: any = (title: string) => {
    setCardTitle(title);
    if (cardId === 'personal_info') {
      applicationData.applicationFormSections[0].title = title;
    } else if (cardId === 'educational_info') {
      applicationData.applicationFormSections[1].title = title;
    } else if (cardId === 'other_info') {
      applicationData.applicationFormSections[2].title = title;
    } else {
      applicationData.applicationFormSections[3].title = title;
    }
  };

  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-light-amber)'}
      marginBottom={'2rem'}
    >
      <CardTitle
        editable={{
          icon: <EditIcon />,
          tooltip: false,
          onChange: onSaveTitle
        }}
        level={5}
      >
        {cardTitle}
      </CardTitle>
      <CustomInput
        placeholder="Add description"
        ref={descriptionRef}
        onKeyDown={onAddDescription}
      />
      {content.length > 0
        ? (
        <>
          {content.map((item: IContent, index: number) => (
            <QuestionRowContainer
              key={index}
              question={item}
              index={index}
              content={content}
              applicationData={applicationData}
              setApplicationData={setApplicationData}
              setIsQuestionCardVisible={setIsQuestionCardVisible}
              isQuestionCardVisible={isQuestionCardVisible}
              cardId={cardId}
              setAnswerTypeValue={setAnswerTypeValue}
              setSingleQuestionData={setSingleQuestionData}
              setAddOrUpdateQuestion={setAddOrUpdateQuestion}
              setQuestionRowIndex={setQuestionRowIndex}
            />
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
          answerTypeValue={answerTypeValue}
          setAnswerTypeValue={setAnswerTypeValue}
          singleQuestionData={singleQuestionData}
          setSingleQuestionData={setSingleQuestionData}
          addOrUpdateQuestion={addOrUpdateQuestion}
          questionRowIndex={questionRowIndex}
        />
          )
        : (
        <CustomButton
          className="default"
          onClick={() => {
            setIsQuestionCardVisible([...isQuestionCardVisible, cardId]);
            setAddOrUpdateQuestion('add');
          }}
        >
          +Add question
        </CustomButton>
          )}
    </CardContainer>
  );
};

export default ApplicationCard;
