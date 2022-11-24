import React, { useState } from 'react'
import styled from 'styled-components'
import ProjectInfo from './ProjectInfo'
import Tabs from './Tabs'
import ActivityNames from './ActivityNames'
import { activeTabName, OverviewProps } from '../../../types/project'
import { tabNames, names } from '../../../helpers/constants'

const Wrapper = styled.div`
  height: '100%';
  padding: 10px 0 0 30px;
  background: var(--background);
`

export const Overview: React.FC<OverviewProps> = ({ subActivity }) => {
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
      <Tabs subActivity={subActivity} tabNames={tabNames} handleActiveTab={handleActiveTab} activeTab={activeTab} />
      <ActivityNames subActivity={subActivity} names={names} setActiveName={setActiveName} activeName={activeName} />
    </Wrapper>
  )
}

/* <div className="create-resultArea" onClick={onRedirectResultHandle}>
        <CreateResultAreaSvg />
        <span>Input result areas and activities</span>
      </div>  */
// const navigate = useNavigate()

// const onRedirectResultHandle: () => void = () => {
//   navigate(`/project/steps/${uuidv4()}`)
// }
// const Wrapper = styled.div`
//   height: 100%;
//   padding: 2rem 0 0 2rem;
//   background: var(--background);

//   .create-resultArea {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     cursor: pointer;
//     height: calc(100% - 8rem);

//     span {
//       font-size: var(--headline-font-size);
//       color: var(--dark-border-ultramarine);
//     }
//   }
// `
