import React, { Fragment } from 'react';
import { Divider, Radio, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import {
  CardTitle,
  DetailsContainer,
  DividerLine,
  ModalText
} from '../../applicationStyle';
import { AsnCheckbox } from '../../../Forms/Checkbox';
import { IAnswers, IEducationWorkQuestion } from '../../../../types/project';
import { AsnInput } from '../../../Forms/Input';

const OtherInformation: React.FC<any> = ({ otherInformationData }) => {
  return (
    <DetailsContainer>
      <CardTitle>{otherInformationData.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {otherInformationData?.description}
      </ModalText>
      {otherInformationData?.questions?.map(
        (question: IEducationWorkQuestion) => (
          <Fragment key={question?.id !== undefined ? question.id : uuidv4()}>
            <ModalText style={{ margin: '1rem 0 0.3rem' }}>
              {question?.title}
            </ModalText>
            {question?.answerType === 'YES_NO'
              ? (
                <>
              <Radio.Group value="Yes/Այո">
                <Space direction="vertical">
                  {question?.answers?.map((answer: IAnswers) => (
                    <Radio key={answer.id !== undefined ? answer.id : uuidv4() } value={answer.title}>
                      {answer.title}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
              {question.relatedQuestions?.length > 0
                ? (
                <>
                  {question.relatedQuestions?.map((relatedQuestion: any) => (
                    <Fragment key={relatedQuestion?.id}>
                      <ModalText style={{ margin: '1rem 0 0.3rem' }}>
                        {relatedQuestion?.title}
                      </ModalText>
                      {relatedQuestion.answerType === 'SHORT_TEXT'
                        ? (
                        <AsnInput value="" />
                          )
                        : relatedQuestion.answerType === 'OPTION'
                          ? (
                        <Radio.Group value={relatedQuestion?.answers[0]?.title}>
                          <Space direction="vertical">
                            {relatedQuestion?.answers?.map((answer: IAnswers) => (
                              <Fragment
                                key={
                                  answer.id !== undefined ? answer.id : uuidv4()
                                }
                              >
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
                                  <Radio value={answer.title}>
                                    {answer.title}
                                  </Radio>
                                    )}
                              </Fragment>
                            ))}
                          </Space>
                        </Radio.Group>
                            )
                          : relatedQuestion.answerType === 'CHECKBOX'
                            ? <Space direction="vertical">
                          {relatedQuestion?.answers?.map((answer: IAnswers, index: number) => (
                            <AsnCheckbox defaultChecked={index === 0} key={answer.id}>
                              {answer.title}
                            </AsnCheckbox>
                          ))}
                        </Space>
                            : null}
                    </Fragment>
                  )
                  )}
                </>
                  )
                : (
                    null
                  )}
              </>
                )
              : question?.answerType === 'OPTION'
                ? (
              <Radio.Group value={question?.answers[0]?.title}>
                <Space direction="vertical">
                  {question?.answers?.map((answer: IAnswers) => (
                    <Fragment key={answer.id !== undefined ? answer.id : uuidv4() }>
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
                  <Fragment key={answer.id !== undefined ? answer.id : uuidv4() }>
                    {answer.title?.includes('Other')
                      ? (
                      <DividerLine>
                        <AsnCheckbox />
                        <Divider orientation="left" plain>
                          {answer.title}
                        </Divider>
                      </DividerLine>
                        )
                      : (
                      <AsnCheckbox defaultChecked={index === 0} key={answer.id !== undefined ? answer.id : uuidv4() }>
                        {answer.title}
                      </AsnCheckbox>
                        )}
                  </Fragment>
                ))}
              </Space>
                    )}
          </Fragment>
        )
      )}
    </DetailsContainer>
  );
};

export default OtherInformation;
