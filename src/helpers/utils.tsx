import React, { Fragment } from 'react';
import { AsnForm } from '../components/Forms/Form';
import { clearLocalStorage } from '../hooks/useLocalStorage';
import { TVoid } from '../types/global';
import { CollapseHeader, SetResultArea, SetTitleColor } from '../types/project';
import { AsnInput } from '../components/Forms/Input';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Col, Divider, Radio, Row, Space } from 'antd';
import { DividerLine } from '../components/Application/applicationStyle';
import RelatedQuestion from '../components/Application/Preview/RelatedQuestion';
import { AsnCheckbox } from '../components/Forms/Checkbox';
import {
  GetApplicationData,
  IAnswer,
  IApplicant,
  IQuestion
} from '../types/api/application/applicationForm';
import { CascadedData } from '../types/teams';
import { ApplicantAccessStatus, ApplicantDefaultStatus } from './constants';
import { ReactComponent as RejectSvg } from '../assets/icons/reject.svg';
import { ReactComponent as ApproveSvg } from '../assets/icons/approve.svg';
import { ReactComponent as WordSvg } from '../assets/icons/word.svg';
import { ReactComponent as ExcelSvg } from '../assets/icons/excel.svg';
import { ReactComponent as ImageSvg } from '../assets/icons/image.svg';
import { ReactComponent as PdfSvg } from '../assets/icons/pdf.svg';
import { ReactComponent as FileTypeSvg } from '../assets/icons/file.svg';

/** Logout the user */
export const logOut: TVoid = () => {
  clearLocalStorage();
  window.location.reload();
};

export const noop: TVoid = () => { };

export const handleErrorMessage = (response: any): string => {
  return response?.data?.message;
};

export const HeaderElement: CollapseHeader = (
  key,
  name,
  index,
  placeholder,
  className
) => (
  <div key={`${className}${key}`} onClick={(e) => e.stopPropagation()}>
    <AsnForm.Item name={name} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={index} placeholder={placeholder} />
    </AsnForm.Item>
  </div>
);

export const TollTipText: (...items: string[]) => React.ReactNode = (
  ...items
) => (
  <div>
    <p style={{ marginBottom: '1rem' }}>
      Must include at least one result area and at least one expected result
      measurement.
    </p>
    <ul
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        marginLeft: '1rem'
      }}
    >
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  </div>
);

const setTitleColor: SetTitleColor = (element, color) => {
  const titleElement = element.firstChild as HTMLElement;

  const pathElement = element.lastChild?.firstChild as HTMLElement;

  titleElement.style.color = color;

  pathElement.style.fill = color;
};

export const validateResultArea: SetResultArea = (values) => {
  // @ts-expect-error
  const errorsIndex = [...new Set(values.errorFields.map((r) => r.name[1]))];

  const resultAreaElement: (id: string) => void = (id) => {
    const resultAreaElement = document.getElementById(
      `ans-title-${id}`
    ) as HTMLElement;

    setTitleColor(resultAreaElement, 'var(--error)');
  };

  const resultAreaElements: HTMLCollectionOf<HTMLElement> =
    document.getElementsByClassName(
      'result_area_title'
    ) as HTMLCollectionOf<HTMLElement>;

  if (!_.isEmpty(resultAreaElements)) {
    Array.from(resultAreaElements).forEach((element) => {
      setTitleColor(element, 'var(--dark-2)');
    });
  }

  errorsIndex.map((i: any) => resultAreaElement(i));
};

export const answerTypes = (type: string, question: IQuestion): JSX.Element => {
  const option = (
    <Radio.Group value={question?.answers[0]?.title}>
      <Space direction="vertical">
        {question?.answers?.map((answer: IAnswer) => (
          <Fragment key={answer?.id !== undefined ? answer.id : uuidv4()}>
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

  const yesNo = (
    <>
      <Radio.Group value="Yes/Այո">
        <Space direction="vertical">
          {question?.answers?.map((answer: IAnswer) => (
            <Radio
              key={answer?.id !== undefined ? answer.id : uuidv4()}
              value={answer.title}
            >
              {answer.title}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      {question.relatedQuestions?.length > 0
        ? (
          <>
            {question.relatedQuestions?.map((relatedQuestion: any) => (
              <RelatedQuestion
                key={
                  relatedQuestion?.id !== undefined
                    ? relatedQuestion?.id
                    : uuidv4()
                }
                relatedQuestion={relatedQuestion}
              />
            ))}
          </>
          )
        : null}
    </>
  );

  const checkbox = (
    <Space direction="vertical">
      {question?.answers?.map((answer: IAnswer, index: number) => (
        <Fragment key={answer?.id !== undefined ? answer.id : uuidv4()}>
          {answer.title?.includes('Other')
            ? (
              <DividerLine>
                <AsnCheckbox value={answer.title} />
                <Divider orientation="left" plain>
                  {answer.title}
                </Divider>
              </DividerLine>
              )
            : (
              <AsnCheckbox defaultChecked={index === 0}>
                {answer.title}
              </AsnCheckbox>
              )}
        </Fragment>
      ))}
    </Space>
  );

  switch (type) {
    case 'YES_NO':
      return yesNo;
    case 'OPTION':
      return option;
    case 'SHORT_TEXT':
      return <AsnInput value="" />;
    default:
      return checkbox;
  }
};

export const getApplicationData: GetApplicationData = (data) =>
  _.pick(
    data,
    'applicationFormSections',
    'title',
    'description',
    'successMessage',
    'termsAndConditions',
    'onlineSignature',
    'deadline'
  ) as IApplicant;

export const convertArrayToResult = (array: string[][]): CascadedData => {
  const result: CascadedData = { id: array.length > 0 ? array[0][0] : '' };

  array.forEach((innerArray) => {
    const [id, resultAreaId, activityId, templateId] = innerArray;

    if (result.id !== '') {
      result.id = id;
    }

    if (resultAreaId === undefined || resultAreaId === '') {
      return null;
    }

    if (result.resultAreas == null) {
      result.resultAreas = [];
    }

    let resultAreaIndex = result.resultAreas.findIndex(
      (ra) => ra.id === resultAreaId
    );

    if (resultAreaIndex === -1) {
      result.resultAreas.push({
        id: resultAreaId
      });
      resultAreaIndex = result.resultAreas.length - 1;
    }

    if (activityId === undefined || activityId === '') {
      return null;
    }

    const resultArea = result.resultAreas[resultAreaIndex];

    if (resultArea.activities == null) {
      resultArea.activities = [];
    }

    let activityIndex = resultArea.activities.findIndex(
      (a) => a.id === activityId
    );

    if (activityIndex === -1) {
      resultArea.activities.push({ id: activityId });
      activityIndex = resultArea.activities.length - 1;
    }
    const activity = resultArea.activities[activityIndex];

    if (templateId === undefined || templateId === '') {
      return null;
    }

    if (templateId !== '') {
      if (activity.templates == null) {
        activity.templates = [];
      }

      activity.templates.push({ id: templateId });
    }
  });

  return result;
};

export const TollTipStatus: () => React.ReactNode = () => (
  <div>
    <div className="applicant-status-header">Learning statuses</div>
    {ApplicantRow(
      ApplicantAccessStatus.Applicant,
      ApplicantDefaultStatus.APPLICANT,
      ApplicantAccessStatus.NotEnrolled,
      ApplicantDefaultStatus.NOT_ENROLLED
    )}
    {Separate()}
    {ApplicantRow(
      ApplicantAccessStatus.Selection,
      ApplicantDefaultStatus.SELECTION,
      ApplicantAccessStatus.NotEnrolled,
      ApplicantDefaultStatus.NOT_ENROLLED
    )}
    {Separate()}
    {ApplicantRow(
      ApplicantAccessStatus.PreAssessment,
      ApplicantDefaultStatus.PRE_ASSESSMENT,
      ApplicantAccessStatus.NotEnrolled,
      ApplicantDefaultStatus.NOT_ENROLLED
    )}
    {Separate()}
    {ApplicantRow(
      ApplicantAccessStatus.Participant,
      ApplicantDefaultStatus.PARTICIPANT,
      ApplicantAccessStatus.Dropped,
      ApplicantDefaultStatus.DROPPED
    )}
    {Separate()}
    {ApplicantRow(
      ApplicantAccessStatus.PostAssessment,
      ApplicantDefaultStatus.POST_ASSESSMENT,
      ApplicantAccessStatus.Dropped,
      ApplicantDefaultStatus.DROPPED
    )}
    {Separate()}
    <Row className="applicant-status-row">
      <Col span={8}>
        <Space>
          <Space
            className={`status ${ApplicantAccessStatus.Trained}`}
            direction="horizontal"
          >
            <Space className="name" align="start">
              {ApplicantDefaultStatus.TRAINED}
            </Space>
          </Space>
        </Space>
      </Col>
    </Row>
  </div>
);

const ApplicantRow: (...items: string[]) => React.ReactNode = (...items) => (
  <Row className="applicant-status-row">
    <Col span={8}>
      <Space>
        <Space className={`status ${items[0]}`} direction="horizontal">
          <Space className="name" align="start">
            {items[1]}
          </Space>
        </Space>
      </Space>
    </Col>
    <Col span={8}>
      <Space>
        <RejectSvg />
      </Space>
    </Col>
    <Col span={8}>
      <Space>
        <Space className={`status ${items[2]}`} direction="horizontal">
          <Space className="name" align="start">
            {items[3]}
          </Space>
        </Space>
      </Space>
    </Col>
  </Row>
);

const Separate: () => React.ReactNode = () => (
  <Row>
    <Col offset={3} span={2}>
      <ApproveSvg />
    </Col>
  </Row>
);

const svgStyle = {
  width: 16,
  height: 21
};

export const findFileType = (name: string): React.ReactNode => {
  const type = name.split('.').pop();
  switch (type) {
    case 'xlsx':
      return <ExcelSvg style={{ ...svgStyle }} />;
    case 'doc':
    case 'docx':
      return <WordSvg style={{ ...svgStyle }} />;
    case 'pdf':
      return <PdfSvg style={{ ...svgStyle }} />;
    case 'gif':
    case 'png':
    case 'jpeg':
      return <ImageSvg style={{ ...svgStyle }}/>;
    default:
      return <FileTypeSvg style={{ ...svgStyle }}/>;
  }
};
