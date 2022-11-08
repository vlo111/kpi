import React from 'react'
// import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { StepProps, SubActivityProps } from '../../../types/project'
import { ReactComponent as ArrowLeftSvg } from '../../../assets/icons/arrowLeft.svg'
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg'
import { ReactComponent as DateSvg } from '../../../assets/icons/date.svg'

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

const NavigationDepth = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`
const NavigationPlace = styled.div`
  color: var(--dark-3);
  font-size: var(--base-font-size);
`
const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  text-align: center;
  margin-bottom: 32px;
`
const GeneralInfo = styled.div`
  background: var(--white);
  border-radius: 20px;
  border-top: 3px solid #F3C262;
  box-shadow: var(--base-box-shadow);
  margin-bottom: 16px;
`
const InfoNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0px 0px 16px;
  margin-bottom: 32px;
  h3{
    font-size: var(--headline-font-size);
    color: var(--dark-border-ultramarine);
    margin: 0;
  }
`
const FlexWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 34px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  width: 50%;
  .grid1 { grid-area: 1 / 1 / 2 / 2; }
  .grid2 { grid-area: 1 / 2 / 2 / 3; }
  .grid3 { grid-area: 2 / 1 / 3 / 2; }
  .grid4 { grid-area: 2 / 2 / 3 / 3; }
  .grid5 { grid-area: 3 / 1 / 4 / 2; }
  .grid6 { grid-area: 3 / 2 / 4 / 3; }
  .grid7 { grid-area: 4 / 1 / 5 / 2; }
  .grid8 { grid-area: 4 / 2 / 5 / 3; }
`

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`
const ResultAndActivity = styled.div`
  background: var(--white);
  border-radius: 20px;
  border-top: 3px solid #68A395;
  box-shadow: var(--base-box-shadow);
  margin-bottom: 16px;
`
const GridResult = styled.div`
  display: grid;
grid-template-columns:40px 90% 30px;
grid-column-gap: 16px;
grid-row-gap: 0px;
width: 65%;
.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
`
const ProjectDetails = styled.div`
  background: var(--white);
  border-radius: 20px;
  border-top: 3px solid #F6976D;
  box-shadow: var(--base-box-shadow);
  margin-bottom: 12px;
`
const actvities = [
  {
    actvity: '1.1 Mapping the labor market',
    subActivities: ['skill mapping study completed and study report, summarizing findings and recommendations developed.']
  },
  {
    actvity: '1.2 Mapping the labor market',
    subActivities: ['multimedia lab established in Gyumri', 'computer labs established in Vanadzor']
  }
]
const SubActivity: React.FC<SubActivityProps> = ({ multiple, activity, subActivities }) => {
  return (
    <div style={ { marginLeft: '50px' } }>
    <div className={ multiple ? '' : 'mybox' } style={ multiple ? { display: 'flex', alignItems: 'center', gap: '30px', borderLeft: '1px solid black' } : { display: 'flex', alignItems: 'center', gap: '30px' } }>
      <div style={{ border: '1px solid #000000', width: '28px' }}></div>
      <div>{activity}</div>
    </div>
      {subActivities.map((item, i) => (
       <div key={i} style={ multiple ? { display: 'flex', justifyContent: 'start', paddingLeft: '20%', borderLeft: '1px solid black' } : { display: 'flex', justifyContent: 'start', paddingLeft: '20%' } }>
       {item}
       </div>
      ))}
  </div>
  )
}
export const CreateProject: React.FC<StepProps> = ({ setStep }) => {
  return (
    // <Container onClick={() => setStep(true)}>
    //     <CreateProjectSvg/>
    //     <span className="create-project-text">Create your first project</span>
    // </Container>
    <>
      <NavigationDepth>
        <ArrowLeftSvg />
        <NavigationPlace>Project Overview {'>'} {''}</NavigationPlace>
        <NavigationPlace>Project Information</NavigationPlace>
      </NavigationDepth>
      <Title>Project Information</Title>
      <GeneralInfo>
        <InfoNameWrapper>
          <h3>General Info</h3>
          <EditSvg />
        </InfoNameWrapper>
        <FlexWrap>
          <Grid>
            <div className="grid1">Title</div>
            <div className="grid2">AWDA</div>
            <div className="grid3">Description</div>
            <div className="grid4">Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
              Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills</div>
            <div className="grid5">Start Date</div>
            <div className="grid6">
              <DateWrapper>
                <DateSvg />
                <div>10/22/21</div>
              </DateWrapper>
            </div>
            <div className="grid7">End Date</div>
            <div className="grid8">
              <DateWrapper>
                <DateSvg />
                <div>10/22/26</div>
              </DateWrapper>
            </div>
          </Grid>
        </FlexWrap>
      </GeneralInfo>
      <ResultAndActivity>
        <InfoNameWrapper>
          <h3>Result areas and Activities</h3>
          <EditSvg />
        </InfoNameWrapper>
        <div style={{ paddingLeft: '16px', paddingBottom: '37px' }}>
          <div style={{ marginBottom: '16px' }}>1.Skill gap reduced</div>
          <div style={{ display: 'flex', alignItems: 'center', borderLeft: '1px solid black', marginLeft: '50px', flexDirection: 'column', gap: '16px' }}>
            <GridResult>
              <div className='div1'>OP1.1</div>
              <div className='div2'>individuals with improved technical and soft skills following participation in USG-assisted workforce development programs</div>
              <div className='div3'>1000</div>
            </GridResult>
            <GridResult>
              <div className='div1'>OP1.2</div>
              <div className='div2'>vulnerable persons including persons with disabilities (PWD) benefiting from U.S. Government supported work-based training and dual education programs</div>
              <div className='div3'>50</div>
            </GridResult>
            <GridResult>
              <div className='div1'>OP1.3</div>
              <div className='div2'>female participants in USG-assisted programs </div>
              <div className='div3'>50%</div>
            </GridResult>
            <GridResult >
              <div className='div1'>OP1.4</div>
              <div className='div2'>service providers trained who serve vulnerable personss</div>
              <div className='div3'>20</div>
            </GridResult>
            <GridResult >
              <div className='div1'>OP1.5</div>
              <div className='div2'>vulnerable persons including persons with disabilities (PWD) benefiting from U.S. Government supported work-based training and dual education programs</div>
              <div className='div3'>20</div>
            </GridResult>
          </div>
          {actvities.map((item, i) => (
            <SubActivity key={i} multiple={ actvities.length - 1 !== i } activity={item.actvity} subActivities={item.subActivities} />
          ))}
        </div>
      </ResultAndActivity>
      <ProjectDetails>
      <InfoNameWrapper>
          <h3>Project details</h3>
          <EditSvg />
        </InfoNameWrapper>
      </ProjectDetails>
    </>
  )
}
