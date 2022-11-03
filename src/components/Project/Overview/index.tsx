import React, { useState } from 'react'
import styled from 'styled-components'
import { AsnButton } from '../../Forms/Button'
import Tab from './Tab'
import ActiveName from './ActiveName'
import { ReactComponent as PeopleSvg } from '../../../assets/icons/people.svg'
import { ReactComponent as WarningSvg } from '../../../assets/icons/projectWarning.svg'
import { ReactComponent as EditSvg } from '../../../assets/icons/projectPage.svg'

const Wrapper = styled.div`
  height: '100%';
  padding: 10px 0 0 30px;
  background: var(--background);
`
const FlexWrap = styled.div`
   display: flex;
   gap: 9vw;
   margin-bottom: 50px;
`
const ProjectName = styled.div`
   font-size: 20px;
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
`

const Activities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 20vw;
`
const TabNameWrapper = styled.div`
 position: relative;
 display: flex; 
 height: 50px;
 padding-left: 28px;
 justify-content: space-between;
`
const ActivitiesNames = styled.div`
  background: #FFFFFF;
  height: 65vh;
  padding: 47px 0px 0px 24px;
  display: flex;
  gap: 16px; 
  box-shadow: -2px 4px 8px rgba(42, 85, 120, 0.1);
`
const EditPublish = styled.div`
  width: 100%;
  display: flex; 
  align-items: center; 
  flex-direction: column; 
  box-shadow: -4px -4px 8px rgba(17, 27, 35, 0.05), 4px 4px 8px rgba(17, 27, 35, 0.25);
`

const names = [
  '1.1 Mapping the labor market', '1.2 Establishment of educational labs', '1.3 Courses and programs', '1.4 Establishment of educational labs', '1.5 Establishment of educational labs'
]
const tabNames = [
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Societal perceptions shifted'
  },
  {
    name: 'Skill gap reduced smnfioewbF VCFUIEWQ'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  },
  {
    name: 'Skill gap reduced'
  }
]

export const Overview: React.FC = () => {
  const [activeTab, setActiveTab] = useState({
    number: null,
    default: true
  })
  const [activeName, setActiveName] = useState<number>()

  const handleActiveTab = (tabNumber: any): void => {
    tabNumber === 1 ? setActiveTab({ number: tabNumber, default: true }) : setActiveTab({ number: tabNumber, default: false })
  }
  return (
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
            <PeopleSvg />
            <PeopleCount>17</PeopleCount>
            <VerticalLine />
            <WarningSvg />
          </ProjectInformation>
        </ProjectInfoContainer>
      </FlexWrap>
      <TabNameWrapper>
        <div style={ { display: 'flex' } }>
          {tabNames?.map((tab, i) => (
            <Tab
              key={i}
              handleActiveTab={handleActiveTab}
              tabNumber={i + 1}
              name={tab.name}
              zIndex={tabNames.length - i}
              active={i === 0 ? activeTab.default : activeTab.number === i + 1}
              tabNames={tabNames}
            />
          ))}
        </div>
        <AsnButton style={{ height: '48px', border: 'none', background: 'var(--primary-light-1)' }} className='primary'>Draft</AsnButton>
      </TabNameWrapper>
      <ActivitiesNames>
        <div>
          <Activities>
            {names.map((name, i) => (
              <div key={i} onClick={() => setActiveName(i)}>
                <ActiveName names={names} name={name} active={activeName} />
              </div>
            ))}
          </Activities>
        </div>
        <EditPublish>
          <EditSvg />
          <AsnButton style={{ maxWidth: '300px' }} className='primary' type='primary'>Edit and Publish the project</AsnButton>
        </EditPublish>
      </ActivitiesNames>
    </Wrapper>
  )
}
