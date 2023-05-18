import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { InputRef, message, Space, Typography } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ApplicationCard from '../../components/Application/ApplicationCard/Index';
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg';
import {
  CardContainer,
  CardTitle,
  CustomInput,
  CustomTextArea,
  ValidateMessage
} from '../../components/Application/applicationStyle';
import moment, { Moment } from 'moment';
import TermsAndCondition from '../../components/Application/TermsAndCondition/Index';
import PreviewModal from '../../components/Application/Preview';
import { AsnButton } from '../../components/Forms/Button';
import { AsnSwitch } from '../../components/Forms/Switch';
import { Void } from '../../types/global';
import { AsnDatePicker } from '../../components/Forms/DatePicker';
import { AsnInput } from '../../components/Forms/Input';
import getApplicationFormDefault from '../../api/ApplicationForm/useGetApplicationFormDefault';
import createApplicationForm from '../../api/ApplicationForm/useCreateApplicationForm';
import {
  IApplicant,
  IApplicationFormSections,
  IApplicationsOption,
  IResult
} from '../../types/api/application/applicationForm';
import FormUrlModal from '../../components/Application/FormUrlModal/Index';
import { PATHS } from '../../helpers/constants';
import useSingleApplicationForm from '../../api/ApplicationForm/useGetSingleApplicationForm';
import useUpdateApplicationForm from '../../api/ApplicationForm/useUpdateApplicationForm';
import { AsnForm } from '../../components/Forms/Form';
import _ from 'lodash';
import { getApplicationData } from '../../helpers/utils';

const ApplicationContainer = styled.div`
  margin: 0 auto;
  width: 67%;
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

const CustomDatePicker = styled(AsnDatePicker)`
  width: 100%;
  height: 3.5rem;
`;

const Application: React.FC = () => {
  const { id: courseId } = useParams<{ id: string | undefined }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = AsnForm.useForm();

  const { data, isLoading } = getApplicationFormDefault(courseId, {
    enabled: location?.state?.edit !== true,
    cacheTime: 0
  });

  const { data: singleApplicantData } = useSingleApplicationForm(courseId, {
    enabled: location?.state?.edit === true,
    cacheTime: 0
  });

  const { mutate: createApplicationFn } = createApplicationForm({
    onSuccess: (options: IApplicationsOption) => {
      const { data } = options;
      setFormUrlModal(true);
      setCreatedItemResponse(data);
    },
    onError: () => {
      void message.error('Publishing failed. Please try again.');
    }
  });

  const { mutate: updateApplicationForm } = useUpdateApplicationForm({
    onSuccess: () => {
      navigate(
        `/project/${PATHS.SUBACTIVITY.replace(
          ':id',
          location?.state?.SubActivityId
        )}`
      );
    },
    onError: () => {
      void message.error('Publishing failed. Please try again.');
    }
  });

  const [isValidateMessage, setIsValidateMessage] = useState<boolean>(false);
  const [validateTitle, setValidateTitle] = useState<string[] | undefined>();
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);
  const [applicationData, setApplicationData] = useState<
  IApplicant | undefined
  >();
  const [onlineSignature, setOnlineSignature] = useState<boolean>(true);
  const [formUrlModal, setFormUrlModal] = useState<boolean>(false);
  const [createdItemInfo, setCreatedItemResponse] = useState<
  IResult | undefined
  >();
  const [deadlineDate, setDeadlineDate] = useState<string | undefined | null>();
  const [isQuestionCardVisible, setIsQuestionCardVisible] = useState<string[]>(
    []
  );
  const formDescription = useRef<any>(null);
  const successMessage = useRef<InputRef>(null);
  const formTitle = useRef<InputRef>(null);

  useEffect(() => {
    if (location?.state?.edit === true) {
      if (!_.isEmpty(singleApplicantData)) {
        setApplicationData(getApplicationData(singleApplicantData));
        setOnlineSignature(singleApplicantData?.onlineSignature);
        if (
          singleApplicantData.deadline !== undefined &&
          singleApplicantData.deadline !== null
        ) {
          setDeadlineDate(new Date(singleApplicantData.deadline).toJSON());
        } else {
          setDeadlineDate(undefined);
        }
      }
    } else {
      if (!_.isEmpty(data)) {
        setApplicationData(data);
        setOnlineSignature(data?.onlineSignature);
        if (data.deadline !== undefined && data.deadline !== null) {
          setDeadlineDate(new Date(data.deadline).toJSON());
        } else {
          setDeadlineDate(undefined);
        }
      }
    }
  }, [isLoading, singleApplicantData]);

  useEffect(() => {
    form.setFieldsValue({
      conditions:
        applicationData?.termsAndConditions !== undefined
          ? JSON.parse(applicationData?.termsAndConditions)
          : []
    });
  }, [applicationData]);

  const onPublishClick: Void = () => {
    if (applicationData !== undefined) {
      if (
        formTitle?.current?.input?.value.length !== undefined &&
        (formTitle?.current?.input?.value.length < 1 ||
          formTitle?.current?.input?.value.length > 255)
      ) {
        setIsValidateMessage(true);
      } else if (validateTitle !== undefined && validateTitle?.length > 0) {
        void message.error('Please fill in at least one chart in the field.');
        setIsValidateMessage(false);
      } else {
        setIsValidateMessage(false);
        const filteredCondition = form
          .getFieldValue('conditions')
          ?.filter((item: any) => Boolean(item));
        applicationData.description =
          formDescription.current !== null
            ? formDescription.current.resizableTextArea.textArea.value
            : '';
        applicationData.title =
          formTitle !== null ? formTitle?.current?.input?.value : '';
        applicationData.onlineSignature = onlineSignature;
        applicationData.deadline =
          deadlineDate === data.deadline || deadlineDate === undefined
            ? null
            : deadlineDate;
        applicationData.successMessage =
          successMessage !== null ? successMessage?.current?.input?.value : '';
        applicationData.termsAndConditions = JSON.stringify(filteredCondition);
        form.resetFields();
        if (location?.state?.edit === true) {
          updateApplicationForm({
            id: courseId,
            data: {
              ...applicationData
            }
          });
        } else {
          createApplicationFn({
            id: courseId,
            data: {
              ...applicationData
            }
          });
        }
      }
    }
  };

  const onPreviewClick: Void = () => {
    if (applicationData !== undefined) {
      const filteredCondition = form
        .getFieldValue('conditions')
        ?.filter((item: any) => Boolean(item));
      applicationData.termsAndConditions = JSON.stringify(filteredCondition);
      applicationData.onlineSignature = onlineSignature;
      setIsOpenCreateActivityModal(true);
      applicationData.description =
        formDescription.current !== null
          ? formDescription?.current?.resizableTextArea?.textArea?.value
          : '';
      applicationData.title =
        formTitle !== null ? formTitle?.current?.input?.value : '';
      applicationData.successMessage =
        successMessage !== null ? successMessage?.current?.input?.value : '';
    }
  };

  const disabledDateEndPicker = (current: Moment): boolean => {
    return current < moment(new Date());
  };

  return (
    <ApplicationContainer>
      <ApplicationTitle>Application form</ApplicationTitle>
      <Typography.Title level={5} style={{ fontWeight: 'var(--font-normal)' }}>
        Form Title
      </Typography.Title>
      {applicationData?.title !== undefined && (
        <AsnInput
          ref={formTitle}
          style={{
            border: 'none',
            width: '100%',
            marginBottom: isValidateMessage ? '0rem' : '1rem'
          }}
          defaultValue={applicationData?.title}
        />
      )}
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
      {applicationData?.description !== undefined && (
        <CustomTextArea
          style={{ border: 'none', marginBottom: '2rem' }}
          defaultValue={applicationData?.description}
          ref={formDescription}
        />
      )}
      {applicationData?.applicationFormSections?.map(
        (data: IApplicationFormSections) => (
          <ApplicationCard
            key={data?.keyName}
            title={data?.title}
            content={data?.questions}
            description={data?.description}
            cardId={data.keyName}
            isQuestionCardVisible={isQuestionCardVisible}
            setIsQuestionCardVisible={setIsQuestionCardVisible}
            applicationData={applicationData}
            setApplicationData={setApplicationData}
            validateTitle={validateTitle}
            setValidateTitle={setValidateTitle}
          />
        )
      )}
      <AsnForm name="dynamic_form_nest_item" form={form} autoComplete="off">
        <TermsAndCondition />
      </AsnForm>
      <ConditionCard>
        <span
          style={{
            fontSize: 'var(--base-font-size )'
          }}
        >
          Online signature
        </span>
        {applicationData?.onlineSignature !== undefined && (
          <AsnSwitch
            onChange={(checked) => setOnlineSignature(checked)}
            checked={onlineSignature}
          />
        )}
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
      {applicationData !== undefined && (
        <CustomDatePicker
          getPopupContainer={(trigger) => trigger}
          disabledDate={disabledDateEndPicker}
          style={{ border: 'none', flexDirection: 'row-reverse' }}
          onChange={(date, dateString) =>
            setDeadlineDate(new Date(dateString).toJSON())
          }
          value={
            deadlineDate !== null && deadlineDate !== undefined
              ? moment(new Date(deadlineDate).toJSON())
              : undefined
          }
        />
      )}
      <Space
        direction="horizontal"
        size={60}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '3.75rem 0px'
        }}
      >
        <AsnButton
          className="default"
          onClick={() => {
            if (location?.state?.SubActivityId !== undefined) {
              navigate(
                `/project/${PATHS.SUBACTIVITY.replace(
                  ':id',
                  location?.state?.SubActivityId
                )}`
              );
            }
          }}
        >
          Cancel
        </AsnButton>
        <AsnButton className="default" onClick={onPreviewClick}>
          Preview
        </AsnButton>
        <AsnButton className="primary" onClick={onPublishClick}>
          {location?.state?.edit !== true ? 'Publish' : 'Update'}
        </AsnButton>
      </Space>
      <PreviewModal
        questionData={applicationData}
        isOpenCreateActivityModal={isOpenCreateActivityModal}
        setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
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
