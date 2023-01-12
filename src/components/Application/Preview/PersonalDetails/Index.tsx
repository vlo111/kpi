import React, { Fragment, useId } from 'react';
import { Radio, Space } from 'antd';
import styled from 'styled-components';
import { CardTitle, ModalText, DetailsContainer } from '../../applicationStyle';
import { AsnInput } from '../../../Forms/Input';
import { AsnSelect } from '../../../Forms/Select';
import { AsnDatePicker } from '../../../Forms/DatePicker';
import { IAnswers } from '../../../../types/project';
import { AsnCheckbox } from '../../../Forms/Checkbox';

const RegionSelect = styled(AsnSelect)`
  .ant-select-selector {
    border-radius: 5px !important;
    border: 1px solid var(--dark-border-ultramarine) !important;
    height: 44px !important;
  }
`;

const PersonalDetails: React.FC<any> = ({ personalDetailsData }) => {
  return (
    <DetailsContainer>
      <CardTitle>{personalDetailsData.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {personalDetailsData?.description}
      </ModalText>
      {personalDetailsData?.questions?.map((question: any) => (
        <Fragment key={question.id}>
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
            <Radio.Group value="Female/Իգական">
              <Space direction="vertical">
                {question?.answers?.map((answer: IAnswers) => (
                  <Radio key={answer.id !== undefined ? answer.id : useId() } value={answer.title}>
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
                {question?.answers?.map((answer: IAnswers) => (
                  <Radio key={answer.id !== undefined ? answer.id : useId() } value={answer.title}>
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

export default PersonalDetails;
