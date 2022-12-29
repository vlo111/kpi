import { Steps } from 'antd';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import { ResultArea } from './ResultArea';
import { ProjectDetails } from './ProjectDetails';
import { useParams } from 'react-router-dom';
import useGetProjectDetails from '../../api/Details/useGetProjectDetails';
import { StepsHeaderText } from '../../types/project';

const StepList = [
  {
    title: 'Project Input',
    content: (isUpdate: boolean) => <ResultArea isUpdate={isUpdate} />
  },
  {
    title: 'Project details',
    content: (isUpdate: boolean) => <ProjectDetails isUpdate={isUpdate} />
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

  .ant-spin {
    height: auto;
    width: 71%;
    top: 55%;
    position: absolute;
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

const Mode = {
  Create: 'create',
  Update: 'update'
};

export const ProjectSteps: React.FC = () => {
  const { index, id } = useParams();

  // @ts-expect-error
  const { projectDetails } = useGetProjectDetails(id);

  const isUpdate = projectDetails?.sectors?.length > 0;

  const [current, setCurrent] = useState(parseInt(index ?? '0'));

  useEffect(() => {
    return setCurrent(parseInt(index ?? '0'));
  }, [index]);

  const headerText: StepsHeaderText = (mode) => {
    if (Mode.Update === mode) {
      return index === '0'
        ? 'Update Result Area and Activities'
        : 'Update Project details';
    } else {
      return index === '0'
        ? 'To create a new project, please input at least one Result Area and at least one Activity'
        : 'To create a new project, please input Project details';
    }
  };

  return (
    <ProjectContainer>
      <div className="project-header">
        <span className="project-title">
          {isUpdate ? headerText(Mode.Update) : headerText(Mode.Create)}
        </span>
        <AsnStepsHeader current={current}>
          {StepList.map((item) => (
            !isUpdate ? <Step key={item.title} title={item.title} /> : ''
          ))}
        </AsnStepsHeader>
      </div>
      <div className={`step_${current}`}>{StepList[current].content(isUpdate)}</div>
    </ProjectContainer>
  );
};
