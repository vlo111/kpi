import React from 'react'
// import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { StepProps } from '../../../types/project'
import { ReactComponent as ArrowLeftSvg } from '../../../assets/icons/arrowLeft.svg'
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg'
import { Descriptions } from 'antd'
// import { ReactComponent as DateSvg } from '../../../assets/icons/date.svg'
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 10px;
//   margin-top: -45px;
//   height: 100%;
//   cursor: pointer;

//   .create-project-text {
//     font-weight: var(--font-bold);
//     font-size: var(--large-font-size);
//     color: var(--dark-border-ultramarine);
//   }
// `

const NavigationDepth = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`
const NavigationPlace = styled.div`
  color: var(--dark-3);
  font-size: var(--base-font-size);
`
const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  text-align: center;
`
const GeneralInfo = styled.div`
  background: var(--white);
  border-radius: 20px;
  border-top: 3px solid #F3C262;
  box-shadow: var(--base-box-shadow);
`
const InfoNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0px 0px 16px;
  margin-bottom: 32px;
  h3{
    font-size: var(--headline-font-size);
    color: var(--dark-border-ultramarine);
    margin: 0;
  }
`
export const CreateProject: React.FC<StepProps> = ({ setStep }) => {
  return (
    // <Container onClick={() => setStep(true)}>
    //     <CreateProjectSvg/>
    //     <span className="create-project-text">Create your first project</span>
    // </Container>
    <>
      <NavigationDepth>
        <ArrowLeftSvg />
        <NavigationPlace>Project Overview {'>'} {''}</NavigationPlace>
        <NavigationPlace>Project Information</NavigationPlace>
      </NavigationDepth>
      <Title>Project Information</Title>
      <GeneralInfo>
        <InfoNameWrapper>
          <h3>General Info</h3>
          <EditSvg />
        </InfoNameWrapper>
      </GeneralInfo>
    </>
  )
}
