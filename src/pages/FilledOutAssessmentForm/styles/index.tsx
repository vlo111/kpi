import { Col, Typography, Row } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

export const FormItemWrapperCol = styled(Col)`
   padding: 43px 32px;
   background: white;
   box-shadow: 0px 4px 30px rgba(113, 103, 246, 0.2);
   border-radius: 10px;
`;

export const FormTitle = styled(Title)`
  &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: var(--large-font-size);
    margin-bottom: 30px
  }
  text-align: center;
`;

export const AsnParagraph = styled(Paragraph)`
   &.courseName{
    &.ant-typography{
    color: var(--dark-border-ultramarine);
    font-size: var( --font-size-semilarge);
    margin-bottom: 30px
  }
   text-align: center;
  }
  &.submissionDate{
    text-align:end;
    font-size: var(--base-font-size);
    font-weight: var(--font-semibold);
    margin-bottom: 30px;
  }
  &.main{
    font-size: var(--base-font-size);
    font-weight: var(--font-semibold);
    margin-bottom: 0;
  }
   &.textAnswer{
    text-underline-offset: 0.5em;
    line-height: 2.5;
    font-size:  var(--base-font-size);;
    word-break: break-all;
    margin-bottom: 0;
    font-weight: var(--font-normal)
   }
`;

export const TotalScoreQuestion = styled.span`
    float: right;
    font-size: var(--base-font-size);
    font-weight: var(--font-semibold);
`;

export const AnswerScore = styled.span`
    position: absolute;
    right: 3px;
    font-size: var(--base-font-size);
`;

export const AnswerWrapper = styled.div`
  &.isTrue{
    background-color: rgba(52, 168, 83, 0.1);
    position: relative
  }
  &.isFalse{}
 `;

export const FormWrapper = styled(Row)`
  width: 100%; 
  height: 100%;
  background: var(--assessment-form-background); 
  padding: 25px 0px
 `;
