import React from 'react';
import { Typography, Modal, Space } from 'antd';
import styled from 'styled-components';

import { UnderLineInput } from '../Forms/Input/UnderLineInput';
import { AsnForm } from '../Forms/Form';

const AsnModal = styled(Modal)`
  .ant-modal-content{
   border-radius: 10px;
   box-shadow: var( --assessment-form-box-shadow);
  }
`;
const { Title, Paragraph } = Typography;

const AsnTitle = styled(Title)`
  &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: var(--large-font-size);
  }
  text-align: center;
`;
const AsnParagraph = styled(Paragraph)`
  &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: var( --font-size-semilarge);
  }
   text-align: center;
`;

const PreviewAssessmentForm: React.FC = () => {
  return (
        <AsnModal
            open={true}
            width={'80vw'}
            maskStyle={{ backgroundColor: 'var(--assessment-form-background)' }}
            closable={false}
            footer={false}
        >
            <AsnTitle level={2}>ASSS</AsnTitle>
            <AsnParagraph style={{ marginBottom: '60px' }}>Pre-assessment form for course</AsnParagraph>
            <AsnForm
                layout='vertical'
                name="preassesment"
            >
                <AsnForm.Item
                    name="email"
                    label={'Email address (same as in the submitted application form)'}
                    style={{ fontWeight: 'var(--font-semibold)' }}
                >
                    <UnderLineInput />
                </AsnForm.Item>
                <AsnForm.List name='apply'>
                    {(fields) => (
                        <div>
                            {/* {questions.map((question: IQuestion, i: number) =>

                              (
                                question.answerType === 'SHORT_TEXT'
                                  ? <ShortTextType key={i} question={question} i={i} />
                                  : question.answerType === 'OPTION'
                                    ? <OptionType key={i} question={question} i={i} />
                                    : <CheckBoxType key={i} question={question} i={i} />
                              )
                            )
                            } */}
                        </div>
                    )}
                </AsnForm.List>
                <AsnForm.Item>
                    <Space direction='horizontal' align='center' style={{ paddingTop: '30px' }}>
                        <Paragraph
                            style={{ marginBottom: 0, fontSize: 'var(--base-font-size)', fontWeight: 'var(--font-semibold)' }}
                        >
                            Online Signature
                        </Paragraph>
                        <UnderLineInput style={{ width: 'calc(80vw - 196px)' }} />
                    </Space>
                </AsnForm.Item>
            </AsnForm>
        </AsnModal>
  );
};

export default PreviewAssessmentForm;
