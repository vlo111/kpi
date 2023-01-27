import React, { Fragment } from 'react';
import { Divider, Radio, Space } from 'antd';
import { ModalText, DividerLine } from '../../applicationStyle';
import { v4 as uuidv4 } from 'uuid';
import { AsnInput } from '../../../Forms/Input';
import { AsnCheckbox } from '../../../Forms/Checkbox';
import {
  IAnswer,
  IQuestion,
  IRelatedQuestionProps
} from '../../../../types/api/application/applicationForm';

export const answerTypes = (
  type: string,
  question: IQuestion
): JSX.Element | null => {
  const option = (
    <Radio.Group value={question?.answers[0]?.title}>
      <Space direction="vertical">
        {question?.answers?.map((answer: IAnswer) => (
          <Fragment key={answer.id !== undefined ? answer.id : uuidv4()}>
            {answer.title?.includes('Other')
              ? (
              <DividerLine>
                <Radio value={answer.title} />
                <Divider orientation="left" plain>
                  {answer.title}
                </Divider>
              </DividerLine>
                )
              : (
              <Radio value={answer.title}>{answer.title}</Radio>
                )}
          </Fragment>
        ))}
      </Space>
    </Radio.Group>
  );

  const checkbox = (
    <Space direction="vertical">
      {question?.answers?.map((answer: IAnswer, index: number) => (
        <AsnCheckbox defaultChecked={index === 0} key={answer.id}>
          {answer.title}
        </AsnCheckbox>
      ))}
    </Space>
  );

  switch (type) {
    case 'OPTION':
      return option;
    case 'SHORT_TEXT':
      return <AsnInput value="" />;
    case 'CHECKBOX':
      return checkbox;
    default:
      return null;
  }
};

const RelatedQuestion: React.FC<IRelatedQuestionProps> = ({
  relatedQuestion
}) => {
  return (
    <Fragment>
      <ModalText style={{ margin: '1rem 0 0.3rem' }}>
        {relatedQuestion?.title}
      </ModalText>
      <>{answerTypes(relatedQuestion?.answerType, relatedQuestion)}</>
    </Fragment>
  );
};

export default RelatedQuestion;
