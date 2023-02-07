import { Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import QuestionHeader from './AssessmentQuestionHeader';
import QuestionContent from './AssessmentQuestionContent';

const QuestionsWrapper = styled(Space)`
    width: 100%;
    background-color: var(--white);
    border-top: 3px solid var(--secondary-green);
    box-shadow: var(--base-box-shadow);
    border-radius: 10px;
    padding: 10px;
`;

const AssessmentFormItems: React.FC<{ items: any }> = ({ items }) => {
  return (
        <QuestionsWrapper direction='vertical'>
            <QuestionHeader />
            <QuestionContent items={items}/>
        </QuestionsWrapper>
  );
};

export default AssessmentFormItems;
