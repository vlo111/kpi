import React, { Fragment, useId } from 'react';
import { Divider, Radio, Space } from 'antd';
import {
  CardTitle,
  ModalText,
  DetailsContainer,
  DividerLine
} from '../../applicationStyle';
import { IAnswers, IEducationWorkQuestion } from '../../../../types/project';
import { AsnInput } from '../../../Forms/Input';
import { AsnCheckbox } from '../../../Forms/Checkbox';

const EducationWork: React.FC<any> = ({ educationWorkData }) => {
  return (
    <DetailsContainer>
      <CardTitle>{educationWorkData?.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {educationWorkData?.description}
      </ModalText>
      {educationWorkData?.questions?.map((question: IEducationWorkQuestion) => (
        <Fragment key={question?.id}>
          <ModalText style={{ margin: '1rem 0 0.3rem' }}>{question?.title}</ModalText>
          {question?.answerType === 'YES_NO'
            ? (
            <Radio.Group value="Yes/Այո">
              <Space direction="vertical">
                {question?.answers?.map((answer: IAnswers) => (
                  <Radio key={answer.id !== undefined ? answer.id : useId() } value={answer.title}>
                    {answer.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
              )
            : question?.answerType === 'OPTION'
              ? (
            <Radio.Group value={question?.answers[0]?.title}>
              <Space direction="vertical">
                {question?.answers?.map((answer: IAnswers) => (
                  <Fragment key={answer.id !== undefined ? answer.id : useId() }>
                    {answer.title?.includes('Other')
                      ? (
                      <DividerLine>
                        <Radio />
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
                )
              : question?.answerType === 'SHORT_TEXT'
                ? (
            <AsnInput value="" />
                  )
                : (
            <Space direction="vertical">
              {question?.answers?.map((answer: IAnswers, index: number) => (
                <AsnCheckbox defaultChecked={index === 0} key={answer.id}>
                  {answer.title}
                </AsnCheckbox>
              ))}
            </Space>
                  )}
        </Fragment>
      ))}
    </DetailsContainer>
  );
};

export default EducationWork;
