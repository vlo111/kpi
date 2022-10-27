import React, { useEffect, useState } from 'react'
// import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { LayoutElement, StepProps } from '../../../types/project'
import { ReactComponent as People } from '../../../assets/icons/people.svg'
import { ReactComponent as Warning } from '../../../assets/icons/projectWarning.svg'

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 10px;
//   margin-top: -45px;
//   height: 100%;
//   cursor: pointer;

//   .create-project-text {
//     font-weight: var(--font-bold);
//     font-size: var(--large-font-size);
//     color: var(--dark-border-ultramarine);
//   }
// `

const Wrapper = styled.div`
  height: '100%';
  padding: 10px 0 0 0;
`
const FlexWrap = styled.div`
   display: flex;
   gap: 9vw;
`
const ProjectName = styled.div`
   font-size: 20px;
   color: #2A5578; 
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
  background: #2A5578;
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
const TabContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
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
    background: #EDF0F4;
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
  &:hover{
    z-index: 1070 !important;
    display: grid;
    visibility: visible;
    font-size: 12px;
    z-index: 1000 !important;
    border-radius: 0px 40px 0px 40px;
    /* width: auto;
    max-width: 50vw;
    z-index: 1070 !important;
    display: block;
    visibility: visible;
    font-size: 12px;
    line-height: 1.5;
    opacity: .9; */
    .tabName{
      overflow: visible;
      width: auto;
      font-size: 24px;
      color: var(--dark-border-ultramarine)
    }
    .tabInfoWrapper{
      padding-left: 28px;
      padding: 0px 30px;
      border-radius: 0px 40px 0px 40px;
      width: auto;
      height: auto;
      position: absolute
    }
    .tabNumber{
      font-size: var(--headline-font-size);
      width: 24px;
      height: 24px;
      padding: 6px;
    }
  }
  `
// const TabInfoWrapper = styled.div`
//   `
// const TabNumber = styled.div`
//   `
// const TabName = styled.div`
//     font-size: var(--base-font-size);
//     padding-left: 4px;
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     width: 8vw;
//   `
interface TabNames {
  tabNumber: number
  name: string
  zIndex: number
  active?: boolean
  handleActiveTab: React.Dispatch<React.SetStateAction<{}>>
}

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
  }
]

const width = window.innerWidth

const Tab: React.FC<TabNames> = ({ tabNumber, name, zIndex, active, handleActiveTab }) => {
  return (
    <TabContainer
      onClick={() => handleActiveTab(tabNumber)}
      style={active ? { clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 100%, 89% 0)', zIndex: zIndex, translate: '0px -22px', height: '72px', borderRadius: '0px 40px 0px 0px' } : { zIndex: zIndex }}>
      <div className='tabInfoWrapper' style={active ? { background: '#FFFFFF' } : {}}>
        <div className='tabNumber' style={active ? { width: '30px', height: '30px', fontSize: 'var(--base-font-size)' } : {}}>{tabNumber}</div>
        {tabNames.length > 6 ? <></> : width < 1024 ? <></> : <div className='tabName' style={active ? { color: '#2A5578' } : {}}>{name}</div>}
      </div>
    </TabContainer >
  )
}
// const TabNameActive: React.FC<TabNames> = ({ tabNumber, name, zIndex }) => {
//   return (
//     <div style={{ display: 'flex', background: '#FFFFFF', height: '50px', alignItems: 'center', justifyContent: 'center', borderRadius: '0px 40px 0px 0px', width: '230px', clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 100%, 75% 0)' }}>
//           <div style={{ width: '30px', height: '30px', border: '1px solid #2A5578', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
//           <span style={{ paddingLeft: '4px' }}>Skill gap reduced</span>
//     </div>
//   )
// }

export const CreateProject: React.FC<StepProps> = ({ setStep }) => {
  const [activeTab, setActiveTab] = useState({
    number: null,
    default: true
  })
  useEffect(() => {
    const layout: LayoutElement = document.querySelector('.ant-layout')

    if (layout) {
      layout.style.height = '100%'
    }
    return () => {
      if (layout) {
        layout.style.height = 'auto'
      }
    }
  }, [])

  const handleActiveTab = (tabNumber: any): void => {
    tabNumber === 1 ? setActiveTab({ number: tabNumber, default: true }) : setActiveTab({ number: tabNumber, default: false })
  }
  const el: any = document.getElementsByClassName('tabName')[0]
  if (el) {
    el.style.overflow = 'visible'
    el.style.width = 'auto'
  }
  console.log(el?.offsetWidth)

  return (
    // <Container onClick={() => setStep(true)}>
    //     <CreateProjectSvg/>
    //     <span className="create-project-text">Create your first project</span>
    // </Container>
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
            <People />
            <PeopleCount>17</PeopleCount>
            <VerticalLine />
            <Warning />
          </ProjectInformation>
        </ProjectInfoContainer>
      </FlexWrap>
      <div style={{ position: 'relative', display: 'flex' }}>
        {tabNames?.map((tab, i) => (
          <Tab
            key={i}
            handleActiveTab={handleActiveTab}
            tabNumber={i + 1}
            name={tab.name}
            zIndex={tabNames.length - i}
            active={i === 0 ? activeTab.default : activeTab.number === i + 1}
          />
        ))}
        {/* <Tab handleActiveTab={handleActiveTab} tabNumber={'1'} name={'Skill gap reduced'} zIndex={10} active={activeTab.default || activeTab.number === '1'} />
        <Tab handleActiveTab={handleActiveTab} tabNumber={'2'} name={'Skill gap reduced'} zIndex={9} active={activeTab.number === '2'} />
        <Tab handleActiveTab={handleActiveTab} tabNumber={'3'} name={'Societal perceptions shifted'} zIndex={8} active={activeTab.number === '3'} />
        <Tab handleActiveTab={handleActiveTab} tabNumber={'4'} name={'Skill gap reduced'} zIndex={7} active={activeTab.number === '4'} /> */}
        <div style={{ background: '#FFFFFF', minHeight: '70vh' }}></div>
      </div>
    </Wrapper>
  )
}
