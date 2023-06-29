import React from 'react';
import styled from 'styled-components';
import { ProjectDetailComponent } from '../../components/Project/ProjectDetails';
import { IStepsUpdate } from '../../types/project';

const ProjectDetailsStyle = styled.div`
  #dynamic_form_item > .ant-row {
    margin-bottom: 54px;
  }
  
  .last-item-footer .ant-form-item {
    margin: 0;

    &-control-input-content {
      display: flex;
      
      button {
        width: 100%;
        margin: 0 auto;
      }
    }   
  }
  .delete {
    right: -14px;
    top: 12px;
    position: absolute;
    
    &-item {
      width: 100%;
      height: 65%;
      justify-content: center;
      cursor: pointer;
    }
  }
  
  input {
    border: 1px solid var(--dark-5) !important;
    box-shadow: none;
    
    &:focus, &:hover {
      border: 1px solid var(--dark-5) !important;
      box-shadow: none;
    }
  }

  .accept-buttons {
    display: flex;
    justify-content: end;
    gap: 5rem;
  }
`;

export const ProjectDetails: React.FC<IStepsUpdate> = ({ isUpdate }) => {
  return (
    <ProjectDetailsStyle>
      <ProjectDetailComponent isUpdate={isUpdate} />
    </ProjectDetailsStyle>
  );
};
