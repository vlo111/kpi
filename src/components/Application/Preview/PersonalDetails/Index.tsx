import React, { Fragment } from 'react';
import { Radio, Space } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { CardTitle, ModalText, DetailsContainer } from '../../applicationStyle';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import { AsnDatePicker } from '../../../Forms/DatePicker';
import { AsnCheckbox } from '../../../Forms/Checkbox';
import {
  IAnswer,
  IPersonalDetails
} from '../../../../types/api/application/applicationForm';

const RegionSelect = styled(AsnSelect)`
  .ant-select-selector {
    border-radius: 5px !important;
    border: 1px solid var(--dark-border-ultramarine) !important;
    height: 44px !important;
  }
`;

const PersonalDetails: React.FC<IPersonalDetails> = ({
  personalDetailsData
}) => {
  return (
    <DetailsContainer>
      <CardTitle>{personalDetailsData.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {personalDetailsData?.description}
      </ModalText>
      {personalDetailsData?.questions?.map((question) => (
        <Fragment key={question.id !== undefined ? question.id : uuidv4()}>
          <ModalText style={{ margin: '1rem 0rem 0.3rem' }}>
            {question.title}
          </ModalText>
          {question?.answerType === 'OPTION' &&
          question?.keyName === 'region'
            ? (
            <RegionSelect />
              )
            : question?.answerType === 'DATE'
              ? (
            <AsnDatePicker
              style={{
                height: '44px'
              }}
            />
                )
              : question?.answerType === 'OPTION'
                ? (
            <Radio.Group value={question?.answers[0]?.title}>
              <Space direction="vertical">
                {question?.answers?.map((answer: IAnswer) => (
                  <Radio
                    key={answer.id !== undefined ? answer.id : uuidv4()}
                    value={answer.title}
                  >
                    {answer.title}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
                  )
                : question?.answerType === 'YES_NO'
                  ? (
            <Radio.Group value="Yes/Այո">
              <Space direction="vertical">
                {question?.answers?.map((answer: IAnswer) => (
                  <Radio
                    key={answer.id !== undefined ? answer.id : uuidv4()}
                    value={answer.title}
                  >
                    {answer.title}
                  </Radio>
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
              {question?.answers?.map((answer: IAnswer, index: number) => (
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

export default PersonalDetails;
