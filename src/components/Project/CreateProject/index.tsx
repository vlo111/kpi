import React from 'react'
// import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { StepProps } from '../../../types/project'
import { Typography, Card, Row, Col, Space, Divider } from 'antd'
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg'
import { ReactComponent as DateSvg } from '../../../assets/icons/date.svg'

const { Title } = Typography

const MainTitle = styled(Title)`
  text-align: center; 
  font-size: 48px;
  font-weight: 700;
`
const CardWrapper = styled(Card)`
  border: none;
  background: var(--white);
  border-top: 3px solid var(--secondary-light-amber);
  box-shadow:  var( --base-box-shadow);
  border-radius: 20px;
 .ant-card-body{
  padding: 16px;
  margin-bottom: 16px;
 }
`
const ProjectInfoContainer = styled.div`
  padding: 0px 32px;
`
const CardTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  color: var(--dark-border-ultramarine);
`
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

export const CreateProject: React.FC<StepProps> = ({ setStep }) => {
  return (
    // <Container onClick={() => setStep(true)}>
    //     <CreateProjectSvg/>
    //     <span className="create-project-text">Create your first project</span>
    // </Container>
    <ProjectInfoContainer>
      <MainTitle>Project Information</MainTitle>
      <CardWrapper>
        <Row align='bottom' gutter={[10, 0]} style={{ marginBottom: '32px' }}>
          <Col>
            <CardTitle>General info</CardTitle>
          </Col>
          <Col>
            <EditSvg />
          </Col>
        </Row>
        <Space direction={'vertical'} size={[0, 16]}>
          <Row>
            <Col xl={2} lg={3} xs={4} offset={5}>Title</Col>
            <Col span={12}>AWDA</Col>
          </Row>
          <Row>
            <Col xl={2} lg={3} xs={4} offset={5}>Description</Col>
            <Col span={12}>Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
              Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills</Col>
          </Row>
          <Row>
            <Col xl={2} lg={3} xs={4} offset={5}>Start Date</Col>
            <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
            <Col span={12}>
              10/11/21
            </Col>
          </Row>
          <Row>
            <Col xl={2} lg={3} xs={4} offset={5}>End Date</Col>
            <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
            <Col span={12}>
              10/10/26
            </Col>
          </Row>
        </Space>
      </CardWrapper>
      <CardWrapper style={{ borderTop: '3px solid #68A395' }}>
        <Row align='bottom' gutter={[10, 0]} style={{ marginBottom: '32px' }}>
          <Col>
            <CardTitle>Result areas and Activities</CardTitle>
          </Col>
          <Col>
            <EditSvg />
          </Col>
        </Row>
        <div style={{ marginBottom: '16px' }}>1.Skill gap reduced</div>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}><Divider style={{ borderLeft: '1px solid black', height: '100%', width: '0', margin: '0', verticalAlign: 'baseline', top: '0' }} type='vertical' /></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}>OP1.ii1</Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>individuals with improved technical and soft skills following participation in USG-assisted workforce development programs</Col>
          <Col span={2}>1000</Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}><Divider style={{ borderLeft: '1px solid black', height: '100%', width: '0', margin: '0', verticalAlign: 'baseline', top: '0' }} type='vertical' /></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}>OP1.iuoiu2</Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>vulnerable persons including persons with disabilities (PWD) benefiting from U.S. Government supported work-based training and dual education programs</Col>
          <Col span={2}>50</Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}><Divider style={{ borderLeft: '1px solid black', height: '100%', width: '0', margin: '0', verticalAlign: 'baseline', top: '0' }} type='vertical' /></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}>OP1.3ii</Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>female participants in USG-assisted programs s</Col>
          <Col span={2}>50%</Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}><Divider style={{ borderLeft: '1px solid black', height: '100%', width: '0', margin: '0', verticalAlign: 'baseline', top: '0' }} type='vertical' /></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}>OP1.ii4</Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>service providers trained who serve vulnerable persons</Col>
          <Col span={2}>20</Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}><Divider style={{ borderLeft: '1px solid black', height: '100%', width: '0', margin: '0', verticalAlign: 'baseline', top: '0' }} type='vertical' /></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}>OP1.5</Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>U.S. Government‐assisted organization and/or service delivery system that serves vulnerable persons strengthened</Col>
          <Col span={2}>1</Col>
        </Row>
        <Row>
          <Col offset={1}>
            <Divider orientation='left' style={{ borderLeft: '1px solid black', borderTop: '1px solid black', height: '100%', width: '24px', margin: '0 -30%' }} type='horizontal' />
          </Col>
          <Col offset={1}>
          </Col>
          <Col style={{ paddingBottom: '16px' }} offset={2}>1.1 Mapping the labor market</Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}><Divider style={{ borderLeft: '1px solid black', height: '100%', width: '0', margin: '0', verticalAlign: 'baseline', top: '0' }} type='vertical' /></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}>OC1.3n</Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>skill mapping study completed and study report, summarizing findings and recommendations developed. </Col>
          <Col span={2}>1</Col>
        </Row>
        <Row>
          <Col offset={1}>
            <Divider orientation='left' style={{ borderTop: '1px solid black', height: '100%', width: '24px', margin: '0 -30%' }} type='horizontal' />
          </Col>
          <Col offset={1}>
          </Col>
          <Col style={{ paddingBottom: '16px' }} offset={2}>1.2 Mapping the labor market</Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}></Col>
          <Col span={2} offset={4} lg={3} xl={2} xs={4}></Col>
          <Col style={{ paddingBottom: '16px' }} span={12}>multimedia lab established in Gyumri</Col>
          <Col span={2}>1</Col>
        </Row>
      </CardWrapper>
      <CardWrapper style={{ borderTop: '3px solid #F6976D' }}>
        <Row align='bottom' gutter={[10, 0]} style={{ marginBottom: '32px' }}>
          <Col>
            <CardTitle>Projects details</CardTitle>
          </Col>
          <Col>
            <EditSvg />
          </Col>
        </Row>
        <Col>
          <Row>
            <Col offset={5}>Organisations</Col>
          </Row>
          <Row>
            <Col offset={7}>Analysed</Col>
          </Row>
          <Row>
            <Col offset={7}>EIF</Col>
          </Row>
          <Row>
            <Col offset={7}>Synergy</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col offset={5}>Organisations</Col>
          </Row>
          <Row>
            <Col offset={7}>Analysed</Col>
          </Row>
          <Row>
            <Col offset={7}>EIF</Col>
          </Row>
          <Row>
            <Col offset={7}>Synergy</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col offset={5}>Organisations</Col>
          </Row>
          <Row>
            <Col offset={7}>Analysed</Col>
          </Row>
          <Row>
            <Col offset={7}>EIF</Col>
          </Row>
          <Row>
            <Col offset={7}>Synergy</Col>
          </Row>
        </Col>
      </CardWrapper>
    </ProjectInfoContainer>
  )
}
