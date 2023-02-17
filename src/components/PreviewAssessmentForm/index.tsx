import React from 'react';
import { Typography, Space } from 'antd';
import styled from 'styled-components';

import { UnderLineInput } from '../Forms/Input/UnderLineInput';
import { AsnForm } from '../Forms/Form';
import ShortTextType from './ShortTextType';
import OptionType from './OptionType';
import CheckBoxType from './CheckBoxType';
import { IQuestion } from '../../types/api/assessment';
import { AsnModal } from '../Forms/Modal';
import { AsnButton } from '../Forms/Button';
import { Void } from '../../types/global';

const { Title, Paragraph } = Typography;

const PreviewModalContent = styled(AsnModal)`
  .ant-modal-content {
    padding: 3rem 0rem 1rem;
  }
  .ant-modal-body{
    height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
    overflow-x: hidden;
    padding: 60px
  }
`;

const AsnTitle = styled(Title)`
  &.ant-typography {
    color: var(--dark-border-ultramarine);
    font-size: var(--large-font-size);
  }
  text-align: center;
`;
const AsnParagraph = styled(Paragraph)`
  &.ant-typography {
    color: var(--dark-border-ultramarine);
    font-size: var(--font-size-semilarge);
  }
  text-align: center;
`;

const PreviewAssessmentForm: React.FC<any> = ({
  data,
  isPreviewForm,
  setIsPreviewForm,
  courseId,
  createAssessmentForm,
  setOpenPreviewAssessmentForm,
  openPreviewAssessmentForm
}) => {
  const { questions, title } = data;

  const onPublishClick: Void = () => {
    createAssessmentForm({
      id: courseId,
      data: {
        ...data
      }
    });
  };

  const handleCancel = (): void => {
    if (openPreviewAssessmentForm === true) {
      setOpenPreviewAssessmentForm(false);
    } else {
      setIsPreviewForm(false);
    }
  };
  return (
    <PreviewModalContent
      open={(Boolean(isPreviewForm)) || openPreviewAssessmentForm}
      width={'80vw'}
      onCancel={handleCancel}
      footer={false}
    >
      <AsnTitle level={2}>{title}</AsnTitle>
      <AsnParagraph style={{ marginBottom: '60px' }}>
        Pre-assessment form for course
      </AsnParagraph>
      <AsnForm layout="vertical" name="preassesment">
        <AsnForm.Item
          name="email"
          label={'Email address (same as in the submitted application form)'}
          style={{ fontWeight: 'var(--font-semibold)' }}
          rules={[{ required: true }]}
        >
          <UnderLineInput disabled />
        </AsnForm.Item>
        <AsnForm.List name="apply">
          {(fields) => (
            <div>
              {questions.map((question: IQuestion, i: number) =>
                question.answerType === 'SHORT_TEXT'
                  ? (
                    <ShortTextType key={i} question={question} i={i} />
                    )
                  : question.answerType === 'OPTION'
                    ? (
                      <OptionType key={i} question={question} i={i} />
                      )
                    : (
                      <CheckBoxType key={i} question={question} i={i} />
                      )
              )}
            </div>
          )}
        </AsnForm.List>
        <AsnForm.Item>
          <Space
            direction="horizontal"
            align="center"
            style={{ paddingTop: '30px' }}
          >
            <Paragraph
              style={{
                marginBottom: 0,
                fontSize: 'var(--base-font-size)',
                fontWeight: 'var(--font-semibold)'
              }}
            >
              Online Signature
            </Paragraph>
            <UnderLineInput disabled />
          </Space>
        </AsnForm.Item>
      </AsnForm>
      <Space
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '3.5rem 0rem'
        }}
        size={60}
      >
        <AsnButton
          className="default"
          onClick={() => setIsPreviewForm(false)}
        >
          Cancel
        </AsnButton>
        <AsnButton className="primary" onClick={onPublishClick}>
          Publish
        </AsnButton>
      </Space>
    </PreviewModalContent>
  );
};

export default PreviewAssessmentForm;
