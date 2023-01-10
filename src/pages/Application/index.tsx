import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { InputRef, Space, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import ApplicationCard from '../../components/Application/ApplicationCard/Index';
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg';
import {
  CardContainer,
  CardTitle,
  CustomInput,
  CustomTextArea
} from '../../components/Application/applicationStyle';
import moment from 'moment';
import TermsAndCondition from '../../components/Application/TermsAndCondition/Index';
import PreviewModal from '../../components/Application/Preview';
import { AsnButton } from '../../components/Forms/Button';
import { AsnSwitch } from '../../components/Forms/Switch';
import { Void } from '../../types/global';
import { AsnDatePicker } from '../../components/Forms/DatePicker';
import { AsnInput } from '../../components/Forms/Input';
import { ICardsData, IIsAddTermsConditions } from '../../types/project';
import getApplicationFormDefault from '../../api/ApplicationForm/useGetApplicationFormDefault';

const ApplicationContainer = styled.div`
  margin: 0 auto;
  width: 67%;
`;

const ValidateMessage = styled.span`
  font-size: var(--font-normal);
  color: var(--error);
  margin: 4px 0px 1rem !important;
`;

const ApplicationTitle = styled(Typography.Title)`
  display: flex;
  justify-content: center;
  font-weight: var(--font-semibold) !important;
  font-size: var(--headline-font-size) !important;
  width: 100%;
  margin: 2rem 0 2.5rem !important;
`;

const ConditionCard = styled(Space)`
  display: flex;
  justify-content: space-between;
  background-color: var(--white);
  box-shadow: var(--base-box-shadow);
  padding: 22px 22px 18px 24px;
  width: 100%;
  border-radius: 10px;
  box-shadow: var(--base-box-shadow);
  margin-bottom: 2rem;

  div:nth-child(1) {
    width: 100%;

    .ant-picker {
      padding: 0;
    }
  }
`;

const Application: React.FC = () => {
  const [isValidateMessage, setIsValidateMessage] = useState<boolean>(false);
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);
  const [termsConditionsValue, setTermsConditionsValue] = useState<object>({});
  const [isAddTermsConditions, setIsAddTermsConditions] = useState<
  IIsAddTermsConditions[]
  >([
    {
      id: uuidv4(),
      placeholder: ''
    },
    {
      id: uuidv4(),
      placeholder: ''
    }
  ]);
  const [isQuestionCardVisible, setIsQuestionCardVisible] = useState<string[]>(
    []
  );
  const formTitle = useRef<InputRef>(null);
  const formDescription = useRef<HTMLTextAreaElement>(null);
  const onlineSignature = useRef<HTMLButtonElement>(null);

  const { data, refetch } = getApplicationFormDefault(
    '0418e1eb-57f9-4ca9-a378-03ae0612a9b8',
    {}
  );

  console.log(data, refetch);

  const onPublishClick: Void = () => {
    if (
      formTitle?.current?.input?.value.length !== undefined &&
      (formTitle?.current?.input?.value.length < 1 ||
        formTitle?.current?.input?.value.length > 255)
    ) {
      setIsValidateMessage(true);
    } else {
      setIsValidateMessage(false);
    }
  };

  return (
    <ApplicationContainer>
      <ApplicationTitle>Application form</ApplicationTitle>
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        Form Title
      </Typography.Title>
      <AsnInput
        ref={formTitle}
        style={{
          border: 'none',
          width: '100%',
          marginBottom: isValidateMessage ? '0rem' : '1rem'
        }}
        placeholder={data?.title}
      />
      {isValidateMessage
        ? (
        <ValidateMessage>
          Field must have at least 1 character and maximum 255 characters.
        </ValidateMessage>
          )
        : null}
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        Description
      </Typography.Title>
      <CustomTextArea
        style={{ border: 'none', marginBottom: '2rem' }}
        placeholder={data?.description}
        ref={formDescription}
      />
      {data?.applicationFormSections?.map((data: ICardsData) => (
        <ApplicationCard
          key={data?.keyName}
          title={data?.title}
          content={data?.questions}
          isQuestionCardVisible={isQuestionCardVisible}
          setIsQuestionCardVisible={setIsQuestionCardVisible}
          cardId={data?.keyName}
        />
      ))}
      <TermsAndCondition
        isAddTermsConditions={isAddTermsConditions}
        setTermsConditionsValue={setTermsConditionsValue}
        termsConditionsValue={termsConditionsValue}
        setIsAddTermsConditions={setIsAddTermsConditions}
      />
      <ConditionCard>
        <span
          style={{
            fontSize: 'var(--base-font-size )'
          }}
        >
          Online signature
        </span>
        <AsnSwitch ref={onlineSignature} checked={data?.onlineSignature}/>
      </ConditionCard>
      <CardContainer
        borderTop={'3px solid var(--secondary-light-amber)'}
        marginBottom={'2rem'}
      >
        <Space direction="horizontal">
          <CardTitle>Success message: </CardTitle> <SuccessIcon />
        </Space>
        <CustomInput value={data?.successMessage} />
      </CardContainer>
      <CardTitle>Set deadline (optional):</CardTitle>
      <ConditionCard>
        <AsnDatePicker
          style={{ border: 'none', flexDirection: 'row-reverse' }}
          defaultValue={moment(new Date(), 'DD.MM.YYYY')}
        />
      </ConditionCard>
      <Space
        direction="horizontal"
        size={60}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '3.75rem 0px'
        }}
      >
        <AsnButton className="default">Cancel</AsnButton>
        <AsnButton
          className="default"
          onClick={() => setIsOpenCreateActivityModal(true)}
        >
          Preview
        </AsnButton>
        <AsnButton className="primary" onClick={onPublishClick}>
          Publish
        </AsnButton>
      </Space>
      <PreviewModal
        isOpenCreateActivityModal={isOpenCreateActivityModal}
        setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
      />
    </ApplicationContainer>
  );
};

export default Application;
