import React, { useState } from 'react'
import styled from 'styled-components'
import ProjectInfo from './ProjectInfo'
import Tabs from './Tabs'
import ActivityNames from './ActivityNames'
import { activeTabName } from '../../../types/project'

const Wrapper = styled.div`
  height: '100%';
  padding: 10px 0 0 30px;
  background: var(--background);
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
  const [activeTab, setActiveTab] = useState<activeTabName>({
    number: null,
    default: true
  })
  const [activeName, setActiveName] = useState<number>()

  const handleActiveTab = (tabNumber: number): void => {
    tabNumber === 1 ? setActiveTab({ number: tabNumber, default: true }) : setActiveTab({ number: tabNumber, default: false })
  }
  return (
    <Wrapper>
      <ProjectInfo />
      <Tabs tabNames={tabNames} handleActiveTab={handleActiveTab} activeTab={activeTab} />
      <ActivityNames names={names} setActiveName={setActiveName} activeName={activeName} />
    </Wrapper>
  )
}
