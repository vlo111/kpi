import { Steps } from 'antd';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import { First } from './First';
import { useParams } from 'react-router-dom';

const StepList = [
  {
    title: 'Project Input',
    content: <First />
  },
  {
    title: 'Project details',
    content: <div>Last</div>
  }
];

const { Step } = Steps;

export const ProjectContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding: 48px 75px;
  
  .project-header {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: clamp(19rem, 45vw, 50rem);

    .ant-steps {
      align-self: center !important;
      width: 60% !important;
    }
  }

  .step_0, .step_1 {
    width: clamp(19rem, 73vw, 90rem);
  }

  .project-title {
    display: flex;
    justify-content: center;
    font-size: var(--headline-font-size);
    color: var(--dark-2);
  }
`;

const AsnStepsHeader = styled(Steps)`
  
  .ant-steps-item-process > .ant-steps-item-container {
    > .ant-steps-item-content > .ant-steps-item-title {
      color: var(--dark-2);
    }

    > .ant-steps-item-icon {
      background: var(--dark-border-ultramarine);
      border: none;
    }
  }

  .ant-steps-finish-icon svg {
    fill: var(--white);
  }

  .ant-steps-item-finish {
    .ant-steps-item-icon {
      background: var(--secondary-green);
      border: none;
    }

    > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title {
      font-size: var(--font-size-semismall);
      letter-spacing: 0.1px;
      color: var(--dark-2);

      &:after {
        background-color: var(--dark-border-ultramarine);
      }
    }
  }
`;

export const ProjectSteps: React.FC = () => {
  const { index } = useParams();

  const [current, setCurrent] = useState(parseInt(index ?? '0'));

  useEffect(() => {
    return setCurrent(parseInt(index ?? '0'));
  }, [index]);

  return (
    <ProjectContainer>
      <div className="project-header">
        <span className="project-title">
          To create a new project, please fill in the following information
        </span>
        <AsnStepsHeader current={current}>
          {StepList.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </AsnStepsHeader>
      </div>
      <div className={`step_${current}`}>{StepList[current].content}</div>
    </ProjectContainer>
  );
};
