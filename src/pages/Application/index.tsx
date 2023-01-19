import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { InputRef, Space, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import createApplicationForm from '../../api/ApplicationForm/useCreateApplicationForm';
import { IApplicationsOption } from '../../types/api/application/applicationForm';
import FormUrlModal from '../../components/Application/FormUrlModal/Index';
import { PATHS } from '../../helpers/constants';

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
  const { id: courseId } = useParams<{ id: string | undefined }>();
  const { data } = getApplicationFormDefault(courseId, {});
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: createApplicationFn } = createApplicationForm({
    onSuccess: (options: IApplicationsOption) => {
      const { data } = options;
      setFormUrlModal(true);
      setCreatedItemResponse(data);
    },
    onError: (err: any) => {
      console.log(err);
    }
  });

  const [isValidateMessage, setIsValidateMessage] = useState<boolean>(false);
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);
  const [termsConditionsValue, setTermsConditionsValue] = useState<any>({});
  const [applicationData, setApplicationData] = useState<any>({});
  const [onlineSignature, setOnlineSignature] = useState<boolean>(true);
  const [formUrlModal, setFormUrlModal] = useState<boolean>(false);
  const [createdItemInfo, setCreatedItemResponse] = useState({});
  const [deadlineDate, setDeadlineDate] = useState<string>('');
  const [isAddTermsConditions, setIsAddTermsConditions] = useState<
  IIsAddTermsConditions[]
  >([
    {
      id: uuidv4(),
      placeholder: 'Type the agreement text'
    },
    {
      id: uuidv4(),
      placeholder: 'Type the agreement text'
    }
  ]);
  const [isQuestionCardVisible, setIsQuestionCardVisible] = useState<string[]>(
    []
  );
  const formTitle = useRef<InputRef>(null);
  const formDescription = useRef<any>(null);
  const successMessage = useRef<InputRef>(null);

  useEffect(() => {
    setApplicationData(data);
  }, [data]);

  useEffect(() => {
    const applicationDataParse =
      applicationData?.termsAndConditions !== undefined
        ? JSON.parse(applicationData?.termsAndConditions)
        : [];
    setTermsConditionsValue({
      condition0: applicationDataParse[0],
      condition1: applicationDataParse[1]
    });
  }, [applicationData]);

  const termsConditionsValueArray = useCallback((): string[] => {
    const termsConditionsArr = [];
    for (const key in termsConditionsValue) {
      termsConditionsArr.push(termsConditionsValue[key]);
    }
    return termsConditionsArr;
  }, [termsConditionsValue]);

  const onPublishClick: Void = () => {
    if (
      formTitle?.current?.input?.value.length !== undefined &&
      (formTitle?.current?.input?.value.length < 1 ||
        formTitle?.current?.input?.value.length > 255)
    ) {
      setIsValidateMessage(true);
    } else {
      setIsValidateMessage(false);
      applicationData.description =
        formDescription.current !== null
          ? formDescription.current.resizableTextArea.textArea.value
          : '';
      applicationData.title =
        formTitle !== null ? formTitle?.current?.input?.value : '';
      applicationData.onlineSignature = onlineSignature;
      applicationData.deadline = deadlineDate;
      applicationData.termsAndConditions = JSON.stringify(
        termsConditionsValueArray()
      );
      createApplicationFn({
        id: courseId,
        data: {
          ...applicationData
        }
      });
    }
  };

  return (
    <ApplicationContainer>
      <ApplicationTitle>Application form</ApplicationTitle>
      <Typography.Title level={5} style={{ fontWeight: 'var(--font-normal)' }}>
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
      <Typography.Title level={5} style={{ fontWeight: 'var(--font-normal)' }}>
        Description
      </Typography.Title>
      <CustomTextArea
        style={{ border: 'none', marginBottom: '2rem' }}
        placeholder={data?.description}
        ref={formDescription}
      />
      {applicationData?.applicationFormSections?.map((data: ICardsData) => (
        <ApplicationCard
          key={data?.keyName}
          title={data?.title}
          content={data?.questions}
          cardId={data?.keyName}
          isQuestionCardVisible={isQuestionCardVisible}
          setIsQuestionCardVisible={setIsQuestionCardVisible}
          applicationData={applicationData}
          setApplicationData={setApplicationData}
        />
      ))}
      <TermsAndCondition
        isAddTermsConditions={isAddTermsConditions}
        termsConditionsValue={termsConditionsValue}
        setTermsConditionsValue={setTermsConditionsValue}
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
        <AsnSwitch
          onChange={(checked) => setOnlineSignature(checked)}
          checked={onlineSignature}
        />
      </ConditionCard>
      <CardContainer
        borderTop={'3px solid var(--secondary-light-amber)'}
        marginBottom={'2rem'}
      >
        <Space direction="horizontal">
          <CardTitle>Success message: </CardTitle> <SuccessIcon />
        </Space>
        {applicationData?.successMessage !== undefined && (
          <CustomInput
            ref={successMessage}
            defaultValue={applicationData?.successMessage}
          />
        )}
      </CardContainer>
      <CardTitle>Set deadline (optional):</CardTitle>
      <ConditionCard>
        <AsnDatePicker
          style={{ border: 'none', flexDirection: 'row-reverse' }}
          onChange={(date, dateString) =>
            setDeadlineDate(new Date(dateString).toJSON())
          }
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
        <AsnButton className="default" onClick={() => {
          if (location?.state?.SubActivityId !== undefined) {
            navigate(`/project/${PATHS.SUBACTIVITY.replace(':id', location?.state?.SubActivityId)}`);
          }
        }}>Cancel</AsnButton>
        <AsnButton
          className="default"
          onClick={() => {
            applicationData.termsAndConditions = JSON.stringify(
              termsConditionsValueArray()
            );
            applicationData.onlineSignature = onlineSignature;
            setIsOpenCreateActivityModal(true);
            applicationData.description =
              formDescription.current !== null
                ? formDescription.current.resizableTextArea.textArea.value
                : '';
            applicationData.title =
              formTitle !== null ? formTitle?.current?.input?.value : '';
          }}
        >
          Preview
        </AsnButton>
        <AsnButton className="primary" onClick={onPublishClick}>
          Publish
        </AsnButton>
      </Space>
      <PreviewModal
        questionData={applicationData}
        createApplicationFn={createApplicationFn}
        isOpenCreateActivityModal={isOpenCreateActivityModal}
        setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
        courseId={courseId}
      />
      <FormUrlModal
        formUrlModal={formUrlModal}
        setFormUrlModal={setFormUrlModal}
        responseIds={createdItemInfo}
      />
    </ApplicationContainer>
  );
};

export default Application;
