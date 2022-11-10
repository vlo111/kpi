import React, { useState } from 'react'
import styled from 'styled-components'
import ProjectInfo from './../ProjectInfo'
import Tabs from './../Tabs'
import ActivityNames from './../ActivityNames'
import { activeTabName } from '../../../../types/project'
import { tabNames, names } from '../../../../helpers/constants'

const Wrapper = styled.div`
  height: 100%;
  padding: 10px 0 0 30px;
  background: var(--background);
`

export const ResultAreaOverview: React.FC = () => {
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
