import React from 'react'
import styled from 'styled-components'
import Tab from '../Tab'
import { AsnButton } from '../../../Forms/Button'
import { TabsNames } from '../../../../types/project'

const TabNameWrapper = styled.div`
 position: relative;
 display: flex; 
 height: 50px;
 padding-left: 28px;
 justify-content: space-between;
`

const Tabs: React.FC<TabsNames> = ({ tabNames, handleActiveTab, activeTab }) => {
  return (
        <TabNameWrapper>
        <div style={ { display: 'flex' } }>
          {tabNames?.map((tab, i) => (
            <Tab
              key={i}
              handleActiveTab={handleActiveTab}
              tabNumber={+i + 1}
              name={tab.name}
              zIndex={tabNames.length - i}
              active={i === 0 ? activeTab.default : activeTab.number === +i + 1}
              tabNames={tabNames}
            />
          ))}
        </div>
        <AsnButton style={{ height: '48px', border: 'none', background: 'var(--primary-light-1)' }} className='primary'>Draft</AsnButton>
      </TabNameWrapper>
  )
}

export default Tabs