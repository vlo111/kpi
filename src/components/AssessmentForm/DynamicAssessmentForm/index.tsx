import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { message, Tooltip, Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import AssessmentFormItems from '../FormList';
import { IResult } from '../../../types/api/application/applicationForm';
import { ReactComponent as AddAssessmentIcon } from '../../../assets/icons/add-assessment.svg';
import { AsnButton } from '../../Forms/Button';
import {
  IAnswer,
  IAssessmentForms,
  IQuestion,
  OnAddQuestionType
} from '../../../types/api/assessment';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CreateAssessmentFormDataByCourseId from '../../../api/AssessmentForm/useCreateAssessmentFormCourseId';
import AssessmentFormUrlModal from '../FormUrlModal/Index';
import PreviewAssessmentForm from '../../PreviewAssessmentForm';
import UpdateAssessmentFormDataById from '../../../api/AssessmentForm/useUpdateAssessmentFormById';
import { PATHS } from '../../../helpers/constants';
import getAssessmentFormbyId from '../../../api/AssessmentForm/useGetAssessmentFormById';
import { FormFinish, Void } from '../../../types/global';
import {
  AddAssessmentButton,
  ButtonsContainer,
  CardContainer,
  CardTitle,
  FormInput,
  FormItemContainer
} from '../assessmentStyle';
import BottomCard from '../BottomCatd';

const { Title } = Typography;

const AssessmentFormsContent = styled.div`
  width: 72%;
  margin: 0 auto;
  margin-bottom: 4rem;
  h4 {
    text-align: center;
    font-weight: var(--font-semibold);
    font-size: var(--headline-font-size);
  }
`;

const AssessmentFormItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
`;

const AssessmentForms: React.FC<IAssessmentForms> = ({
  preview,
  footerButtons
}) => {
  const [answerType, setAnswerType] = useState('OPTION');
  const [formUrlModal, setFormUrlModal] = useState(false);
  const [isPreviewForm, setIsPreviewForm] = useState(false);
  const [allScore, setAllScore] = useState<number>(0);
  const [responseDataId, setResponseDataId] = useState<IResult | undefined>();
  const [form] = AsnForm.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id: courseId } = useParams<{ id: string }>();

  const { mutate: createAssessmentForm } = CreateAssessmentFormDataByCourseId({
    onSuccess: (responseData: { data: IResult }) => {
      setResponseDataId(responseData.data);
      setFormUrlModal(true);
    },
    onError: (e: {
      response: {
        data: { message: string }
      }
    }) => {
      void message.error(e.response.data.message);
    }
  });
  const { mutate: updateAssessmentForm } = UpdateAssessmentFormDataById({
    onSuccess: () => {
      setFormUrlModal(true);
    },
    onError: (e: {
      response: {
        data: { message: string }
      }
    }) => {
      void message.error(e.response.data.message);
    }
  });

  const { data } = getAssessmentFormbyId(
    footerButtons !== undefined
      ? footerButtons?.id
      : location?.state?.footerButtons?.id,
    {
      enabled: preview === true || location.state.preview === true
    }
  );

  useEffect(() => {
    if (preview === true || location?.state?.preview === true) {
      let cloneAssessmentData = null;
      if (data.result !== undefined) {
        cloneAssessmentData = JSON.parse(JSON.stringify(data?.result));
        cloneAssessmentData.questions.map((question: IQuestion): boolean => {
          if (question.answers.length > 0) {
            question.answers.map((answer: IAnswer) => delete answer.id);
          }
          return delete question.id;
        });
      }

      form.setFieldsValue({
        ...cloneAssessmentData
      });
      setAllScore(data?.result?.maximumScore);
    }
  }, [data, preview, location?.state?.preview]);

  useEffect(() => {
    if (preview !== true && location?.state?.preview !== true) {
      form.setFieldsValue({
        onlineSignature: true,
        title: '',
        passingScore: 0,
        questions: [
          {
            answerType,
            required: true,
            answers: [
              {
                title: '',
                score: 0,
                type: answerType
              },
              {
                title: '',
                score: 0,
                type: answerType
              }
            ]
          },
          {
            answerType,
            required: true,
            answers: [
              {
                title: '',
                score: 0,
                type: answerType
              },
              {
                title: '',
                score: 0,
                type: answerType
              }
            ]
          }
        ]
      });
    }
  }, []);

  const onAddQuestion: OnAddQuestionType = (add) => {
    setAnswerType('OPTION');
    add({
      answerType: 'OPTION',
      answers: [
        {
          title: '',
          score: 0,
          type: 'OPTION'
        },
        {
          title: '',
          score: 0,
          type: 'OPTION'
        }
      ],
      required: true,
      title: ''
    });
  };

  const onCreatedAssessmentFinish: FormFinish = (value) => {
    if (location.state.edit === true) {
      updateAssessmentForm({
        formId: location?.state?.footerButtons?.id,
        data: {
          maximumScore: allScore,
          ...value
        }
      });
    } else {
      createAssessmentForm({
        id: courseId,
        data: {
          maximumScore: allScore,
          type: location?.state.type,
          duplicate: false,
          ...value
        }
      });
    }
  };

  const onCancelClick: Void = () => {
    navigate(
      `/project/${PATHS.SUBACTIVITY.replace(
        ':id',
        location?.state?.navigateRouteInfo?.courseId
      )}`
    );
  };

  return (
    <AssessmentFormsContent>
      <Title level={4}>Create assessment Form</Title>
      <AsnForm
        form={form}
        id="create-assessment-AsnForm"
        onFinish={onCreatedAssessmentFinish}
        initialValues={{ questions: [''] }}
        disabled={preview === true}
      >
        <CardContainer
          borderTop={'3px solid var(--secondary-light-amber)'}
          marginTop={'2rem'}
        >
          <CardTitle>Form title</CardTitle>
          <AsnForm.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Enter required fields',
                min: 2,
                max: 64
              }
            ]}
          >
            <FormInput placeholder="Title" />
          </AsnForm.Item>
        </CardContainer>
        <CardContainer
          borderTop={'3px solid var(--secondary-light-amber)'}
          marginTop={'2rem'}
        >
          <CardTitle>
            Email address (same as in the submitted application form)
          </CardTitle>
          <FormInput placeholder="Email address" disabled={true} />
        </CardContainer>
        <AsnForm.List name="questions">
          {(questionsLists, { add, remove }) => (
            <FormItemContainer>
              {questionsLists.map(({ key, name, ...restField }) => (
                <AssessmentFormItemContainer key={key}>
                  <AssessmentFormItems
                    {...restField}
                    key={key}
                    name={[name, 'answers']}
                    add={add}
                    remove={remove}
                    answerType={answerType}
                    setAnswerType={setAnswerType}
                    questionsLists={questionsLists}
                    setAllScore={setAllScore}
                    preview={preview}
                    assessmentData={data?.result}
                  />
                  {name === questionsLists.length - 1 &&
                  questionsLists.length <= 50 &&
                  preview !== true
                    ? (
                    <AddAssessmentButton onClick={() => onAddQuestion(add)}>
                      <Tooltip
                        placement="topLeft"
                        title={<span>Add a question</span>}
                        overlayClassName="tooltipHelper"
                      >
                        <AddAssessmentIcon />
                      </Tooltip>
                    </AddAssessmentButton>
                      )
                    : null}
                </AssessmentFormItemContainer>
              ))}
            </FormItemContainer>
          )}
        </AsnForm.List>
        <BottomCard allScore={allScore}/>
        {preview === true
          ? null
          : (
          <ButtonsContainer marginTop="4rem">
            <AsnButton className="default" onClick={onCancelClick}>
              Cancel
            </AsnButton>
            <AsnButton
              className="default"
              onClick={() => setIsPreviewForm(true)}
            >
              Preview
            </AsnButton>
            <AsnButton
              className="primary"
              onClick={() => {
                form.submit();
              }}
            >
              {location.state.edit === true ? 'Edit' : 'Publish'}
            </AsnButton>
          </ButtonsContainer>
            )}
      </AsnForm>
      <AssessmentFormUrlModal
        formUrlModal={formUrlModal}
        setFormUrlModal={setFormUrlModal}
        subActivityId={location?.state?.navigateRouteInfo?.courseId}
        assessmentFormId={
          responseDataId?.result?.id ?? location?.state?.footerButtons?.id
        }
      />
      <PreviewAssessmentForm
        isPreviewForm={isPreviewForm}
        setIsPreviewForm={setIsPreviewForm}
        createAssessmentForm={createAssessmentForm}
        courseId={courseId}
        data={{
          maximumScore: allScore,
          type: location?.state?.type,
          duplicate: false,
          ...form.getFieldsValue()
        }}
      />
    </AssessmentFormsContent>
  );
};

export default AssessmentForms;
