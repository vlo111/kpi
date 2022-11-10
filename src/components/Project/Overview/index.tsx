import React, { useState } from 'react'
import styled from 'styled-components'
import ProjectInfo from './ProjectInfo'
import Tabs from './Tabs'
import ActivityNames from './ActivityNames'
import { activeTabName } from '../../../types/project'
import { tabNames, names } from '../../../helpers/constants'

const Wrapper = styled.div`
  height: 100%;
  padding: 40px 0 0 40px;
  background: var(--background);
  display: flex;
  justify-content: end;
  flex-direction: column;
`

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
      <div>
        <Tabs tabNames={tabNames} handleActiveTab={handleActiveTab} activeTab={activeTab} />
        <ActivityNames names={names} setActiveName={setActiveName} activeName={activeName} />
      </div>
    </Wrapper>
  )
}
