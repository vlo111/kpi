import React from 'react'
import styled from 'styled-components'
import { ReactComponent as PeopleSvg } from '../../../../assets/icons/people.svg'
import { ReactComponent as WarningSvg } from '../../../../assets/icons/projectWarning.svg'

const FlexWrap = styled.div`
   display: flex;
   gap: 9vw;
   height: 8rem;
`
const ProjectName = styled.div`
   font-size: var(--headline-font-size);
   color: var(--dark-border-ultramarine); 
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
  gap: 1.2rem;
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
  background: var(--secondary-green);
`
const VerticalLine = styled.div`
  width: 2px;
  height: 20px;
  background: var(--dark-border-ultramarine);
`
const Status = styled.div`
  font-size: var( --base-font-size);
`
const Date = styled.div`
  font-size: var( --base-font-size);
`
const PeopleCount = styled.div`
  font-size: var( --base-font-size);
  text-decoration: underline;
`

const ProjectInfo: React.FC = () => {
  return (
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
            <PeopleSvg />
            <PeopleCount>17</PeopleCount>
            <VerticalLine />
            <WarningSvg />
          </ProjectInformation>
        </ProjectInfoContainer>
      </FlexWrap>
  )
}

export default ProjectInfo
