import React, { useEffect } from 'react'
// import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { LayoutElement, StepProps } from '../../../types/project'
import { ReactComponent as People } from '../../../assets/icons/people.svg'
import { ReactComponent as Warning } from '../../../assets/icons/projectWarning.svg'

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

const Wrapper = styled.div`
  height: '100%';
  padding: 10px 0 0 0;
`
const FlexWrap = styled.div`
   display: flex;
   gap: 9vw;
`
const ProjectName = styled.div`
   font-size: 20px;
   color: #2A5578; 
   padding: 9px 0 0 0; 
   padding-left: 6.5vw;
`
const ProjectDescription = styled.div`
  max-width: 44vw;
  font-size: var(--font-size-semismall);
`
const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const ProjectInformation = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;
`

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #68A395;
`
const VerticalLine = styled.div`
  width: 2px;
  height: 20px;
  background: #2A5578;
`
const Status = styled.div`
  font-size: var( --base-font-size);
`
const Date = styled.div`
  font-size: var( --base-font-size);
`
const PeopleCount = styled.div`
  font-size: var( --base-font-size);
`
const TabContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  border-radius: 0px 40px 0px 0px;
  width: 16vw;
  max-width: 231px;
  margin-left: -28px;
  `
const TabInfoWrapper = styled.div`
    display: flex;
    height: 75%;
    background: #EDF0F4;
    justify-content: center;
    border-radius: 0px 40px 0px 0px;
    align-items: center;
    width: 95%; 
  `
const TabNumber = styled.div`
    width: 20px;
    height: 20px;
    border: 1px solid #2A5578;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-semismall);
  `
const TabName = styled.div`
    font-size: var(--base-font-size);
    padding-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 10vw;
  `

const Tab: React.FC = () => {
  return (
    <TabContainer>
     <TabInfoWrapper>
     <TabNumber>1</TabNumber>
     <TabName>Societal perception hhhh</TabName>
    </TabInfoWrapper>
  </TabContainer>
  )
}

export const CreateProject: React.FC<StepProps> = ({ setStep }) => {
  useEffect(() => {
    const layout: LayoutElement = document.querySelector('.ant-layout')

    if (layout) {
      layout.style.height = '100%'
    }
    return () => {
      if (layout) {
        layout.style.height = 'auto'
      }
    }
  }, [])

  return (
    // <Container onClick={() => setStep(true)}>
    //     <CreateProjectSvg/>
    //     <span className="create-project-text">Create your first project</span>
    // </Container>
    <Wrapper>
      <FlexWrap>
        <ProjectName>AWDA</ProjectName>
        <ProjectInfoContainer>
          <ProjectDescription>
            Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
            Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
          </ProjectDescription>
          <ProjectInformation>
            <Circle />
            <Status>Active</Status>
            <VerticalLine />
            <Date>10/22/2021 - 4/06/2022</Date>
            <VerticalLine />
            <People />
            <PeopleCount>17</PeopleCount>
            <VerticalLine />
            <Warning />
          </ProjectInformation>
        </ProjectInfoContainer>
      </FlexWrap>
      <div style={ { position: 'relative', display: 'flex' } }>
        <div style={ { display: 'flex', background: '#FFFFFF', height: '50px', alignItems: 'center', justifyContent: 'center', borderRadius: '0px 40px 0px 0px', width: '230px', clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 100%, 75% 0)' } }>
          <div style={ { width: '30px', height: '30px', border: '1px solid #2A5578', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>1</div>
           <span style={ { paddingLeft: '4px' } }>Skill gap reduced</span>
          </div>
          <div style={ { height: '50px', width: '230px', display: 'flex', background: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: '0px 40px 0px 0px' } }>
            <div style={ { display: 'flex', height: '75%', background: '#EDF0F4', alignItems: 'center', justifyContent: 'center', borderRadius: '0px 40px 0px 0px', width: '95%' } }>
          <div style={ { width: '30px', height: '30px', border: '1px solid #2A5578', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>1</div>
           <span style={ { paddingLeft: '4px' } }>Skill gap reduced</span>
           </div>
          </div>
          <div style={ { height: '50px', width: '230px', display: 'flex', background: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: '0px 40px 0px 0px' } }>
            <div style={ { display: 'flex', height: '75%', background: '#EDF0F4', alignItems: 'center', justifyContent: 'center', borderRadius: '0px 40px 0px 0px', width: '95%' } }>
          <div style={ { width: '30px', height: '30px', border: '1px solid #2A5578', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>1</div>
           <span style={ { paddingLeft: '4px' } }>Skill gap reduced</span>
           </div>
          </div>
            {/* <div style={ { height: '50px', width: '230px', display: 'flex', background: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderRadius: '0px 40px 0px 0px' } }>
            <div style={ { display: 'flex', height: '75%', background: '#EDF0F4', alignItems: 'center', justifyContent: 'center', borderRadius: '0px 40px 0px 0px', width: '95%' } }>
          <div style={ { width: '30px', height: '30px', border: '1px solid #2A5578', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>1</div>
           <span style={ { paddingLeft: '4px' } }>Skill gap reduced</span>
           </div>
          </div> */}
          {/* <div style={ { display: 'flex', background: '#FFFFFF', height: '50px', alignItems: 'center', justifyContent: 'center', borderRadius: '0px 40px 0px 0px', width: '230px', top: 0, left: '350px' } }>
          <div style={ { width: '30px', height: '30px', border: '1px solid #2A5578', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } }>1</div>
           <span style={ { paddingLeft: '4px' } }>Skil gap reduced</span>
          </div> */}
          <Tab />
        <div style={ { background: '#FFFFFF', minHeight: '70vh' } }></div>
      </div>
    </Wrapper>
  )
}
