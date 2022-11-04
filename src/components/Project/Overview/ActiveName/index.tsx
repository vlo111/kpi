import React from 'react'
import styled from 'styled-components'
import { ActivityName } from '../../../../types/project'

const ActivityNames = styled.div`
  padding: 16px 29px;
  font-size: var( --base-font-size);
  background: var(--dark-6);
  border-radius: 10px;
  cursor: pointer;
`
const activeName = {
  borderLeft: '6px solid #2A5578',
  background: 'var(--white)',
  boxShadow: '-4px 0px 8px rgba(17, 27, 35, 0.05), -4px -4px 8px rgba(17, 27, 35, 0.05)',
  transform: 'translate(16px, 0px)',
  borderRadius: '10px 0px 0px 10px'
}

const ActiveName: React.FC<ActivityName> = ({ name, active, names }) => {
  return (
        <ActivityNames className={`${name}`} style={active !== undefined && names[active] === name ? { ...activeName } : {}}>
            {name}
        </ActivityNames>
  )
}

export default ActiveName