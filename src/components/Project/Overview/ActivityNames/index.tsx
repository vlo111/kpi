import React from 'react'
import styled from 'styled-components'
import { ReactComponent as EditSvg } from '../../../../assets/icons/projectPage.svg'
import { AsnButton } from '../../../Forms/Button'
import ActiveName from '../ActiveName'
import { ActivityNamesProps } from '../../../../types/project'

const Activities = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 20vw;
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

const ActivityNames: React.FC<ActivityNamesProps> = ({ names, activeName, setActiveName }) => {
  return (
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
  )
}

export default ActivityNames