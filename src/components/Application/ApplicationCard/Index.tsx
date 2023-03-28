import React, { useState, useRef, Fragment } from 'react';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import {
  CardContainer,
  CardTitle,
  CustomButton,
  CustomInput,
  ValidateMessage
} from '../applicationStyle';
import AddQuestionCard from '../AddQuestion/Index';
import QuestionRowContainer from '../QuestionRow/Index';
import { FormFinish, StringVoidType } from '../../../types/global';
import { InputRef } from 'antd';
import {
  IApplicationCard,
  IQuestion
} from '../../../types/api/application/applicationForm';
import { addDescription, addQuestion, updateQuestion } from '../../../helpers/questionList';
import { v4 as uuidv4 } from 'uuid';
import { AsnForm } from '../../Forms/Form';

const ApplicationCard: React.FC<IApplicationCard> = ({
  title,
  content,
  isQuestionCardVisible,
  setIsQuestionCardVisible,
  cardId,
  description,
  applicationData,
  setApplicationData,
  validateTitle,
  setValidateTitle
}) => {
  const [form] = AsnForm.useForm();
  const [cardTitle, setCardTitle] = useState(title);
  const [answerTypeValue, setAnswerTypeValue] = useState('OPTION');
  const [addOrUpdateQuestion, setAddOrUpdateQuestion] = useState<string>('add');
  const [questionRowIndex, setQuestionRowIndex] = useState<number>(0);
  const [singleQuestionData, setSingleQuestionData] = useState<IQuestion>();
  const descriptionRef = useRef<InputRef>(null);

  const onAddDescription: FormFinish = (event) => {
    if (cardId === 'personal_info') {
      addDescription(applicationData, 0, descriptionRef);
    } else if (cardId === 'educational_info') {
      addDescription(applicationData, 1, descriptionRef);
    } else if (cardId === 'other_info') {
      addDescription(applicationData, 2, descriptionRef);
    } else {
      addDescription(applicationData, 3, descriptionRef);
    }
  };

  const onSaveTitle: StringVoidType = (title) => {
    setCardTitle(title);
    if (title.length < 1) {
      if (validateTitle === undefined) {
        setValidateTitle([cardId]);
      } else {
        setValidateTitle([...validateTitle, cardId]);
      }
    } else {
      setValidateTitle(validateTitle?.filter((title) => title !== cardId));
    }

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

  const onFinishedForm: FormFinish = (value) => {
    const applicationDataClone = JSON.parse(JSON.stringify(applicationData));
    if (addOrUpdateQuestion === 'add') {
      if (cardId === 'personal_info') {
        addQuestion(value, 0, applicationDataClone, answerTypeValue);
      } else if (cardId === 'educational_info') {
        addQuestion(value, 1, applicationDataClone, answerTypeValue);
      } else if (cardId === 'other_info') {
        addQuestion(value, 2, applicationDataClone, answerTypeValue);
      } else {
        addQuestion(value, 3, applicationDataClone, answerTypeValue);
      }
    } else if (addOrUpdateQuestion === 'edit') {
      if (cardId === 'personal_info') {
        updateQuestion(
          value,
          0,
          applicationDataClone,
          questionRowIndex,
          answerTypeValue
        );
      } else if (cardId === 'educational_info') {
        updateQuestion(
          value,
          1,
          applicationDataClone,
          questionRowIndex,
          answerTypeValue
        );
      } else if (cardId === 'other_info') {
        updateQuestion(
          value,
          2,
          applicationDataClone,
          questionRowIndex,
          answerTypeValue
        );
      } else {
        updateQuestion(
          value,
          3,
          applicationDataClone,
          questionRowIndex,
          answerTypeValue
        );
      }
    }
    form.resetFields();
    setApplicationData({ ...applicationDataClone });
    setIsQuestionCardVisible(
      isQuestionCardVisible.filter((itemId) => itemId !== cardId)
    );
    setAnswerTypeValue('OPTION');
    setSingleQuestionData(undefined);
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
      {validateTitle?.includes(cardId) ?? false
        ? (
        <ValidateMessage
          style={{
            marginBottom: '5px'
          }}
        >
          Please fill in at least one chart in the field.
        </ValidateMessage>
          )
        : null}
      <CustomInput
        placeholder="Add description"
        ref={descriptionRef}
        defaultValue={description}
        onBlur={onAddDescription}
      />
      <AsnForm
          form={form}
          initialValues={{ names: ['', ''] }}
          autoComplete="off"
          onFinish={onFinishedForm}
          name="addQuestion"
        >
      {content.length > 0
        ? (
        <>
          {content.map((item: IQuestion, index: number) => (
            <Fragment key={item.id !== undefined ? item.id : uuidv4()}>
              <QuestionRowContainer
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
              {item.answerType === 'YES_NO' && item.relatedQuestions.length > 0
                ? item.relatedQuestions.map((item, index) => (
                    <QuestionRowContainer
                      key={item.id !== undefined ? item.id : uuidv4()}
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
                ))
                : null}
            </Fragment>
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
            answerTypeValue={answerTypeValue}
            setAnswerTypeValue={setAnswerTypeValue}
            singleQuestionData={singleQuestionData}
            setSingleQuestionData={setSingleQuestionData}
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
      </AsnForm>

    </CardContainer>
  );
};

export default ApplicationCard;
