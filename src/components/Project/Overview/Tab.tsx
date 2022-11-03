import React from 'react'
import styled from 'styled-components'
import { Tooltip } from 'antd'
import { TabNames } from '../../../types/project'

const TabContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--white);
  border-radius: 0px 40px 0px 0px;
  width: 16vw;
  max-width: 231px;
  margin-left: -28px;
  cursor: pointer;
  .tabName{
    font-size: var(--base-font-size);
    padding-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 8vw;
  }
  .tabInfoWrapper{
    display: flex;
    height: 75%;
    background: var(--dark-6) ;
    justify-content: center;
    border-radius: 0px 40px 0px 0px;
    align-items: center;
    width: 95%; 

  }
  .tabNumber{
    width: 20px;
    height: 20px;
    border: 1px solid #2A5578;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-semismall);
    color: #2A5578;
  }
  `
const activeTab = {
  clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 100%, 89% 0)',
  translate: '0px -22px',
  height: '72px',
  borderRadius: '40px 40px 0px 0px',
  display: 'flex'
}
const activeTabNum = {
  width: '30px',
  height: '30px',
  fontSize: 'var(--base-font-size)'
}
const activeTabInfo = {
  borderRadius: '40px 40px 0px 0px',
  background: '#FFFFFF'
}
const activeTabName = {
  color: '#2A5578',
  fontSize: 'var(--base-font-size)',
  paddingLeft: '4px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '8vw'
}

const width = window.innerWidth

const Tab: React.FC<TabNames> = ({ tabNumber, name, zIndex, active, handleActiveTab, tabNames }) => {
  return (
        <Tooltip title={name} color='#EDF0F4' overlayInnerStyle={{ color: '#2A5578', fontSize: '20px' }}>
            <TabContainer
                onClick={() => handleActiveTab(tabNumber)}
                style={active && tabNames.length > 6
                  ? { ...activeTab, zIndex, width: '10vw' }
                  : active && tabNames.length < 6
                    ? { ...activeTab, zIndex: zIndex }
                    : tabNames.length > 6
                      ? { width: '10vw', zIndex: zIndex }
                      : { zIndex: zIndex }}
                ref={(el) => {
                  if (active && el) {
                    el.style.setProperty('z-index', `${zIndex}`, 'important')
                  }
                }}
            >
                <div className='tabInfoWrapper' style={active ? { ...activeTabInfo } : {}}>
                    <div className='tabNumber' style={active ? { ...activeTabNum } : {}}>{tabNumber}</div>
                    {tabNames.length > 6 ? <></> : width < 1024 ? <></> : <div id="tabName" className='tabName' style={active ? { ...activeTabName } : {}}>{name}</div>}
                </div>
            </TabContainer >
        </Tooltip>
  )
}

export default Tab
