import React from 'react'
// import { ReactComponent as CreateProjectSvg } from '../../../assets/icons/create-project.svg'
import styled from 'styled-components'
import { StepProps } from '../../../types/project'
import { Typography, Card, Row, Col, Space } from 'antd'
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
        <Row align='bottom' gutter={[10, 0]}>
          <Col>
            <CardTitle>General info</CardTitle>
          </Col>
          <Col>
            <EditSvg />
          </Col>
        </Row>
        {/* <Row>
          <Col span={2} offset={5}>
            <Col>Title</Col>
            <Col>Description</Col>
            <Col>Start Date</Col>
            <Col>End Date</Col>
          </Col>
          <Col span={12}>
            <Col>AWDA</Col>
            <Col>Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
              Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills</Col>
            <Col><DateSvg style={{ marginRight: '10px' }} />cvcvcv</Col>
            <Col><DateSvg style={{ marginRight: '10px' }} />cvcvc</Col>
          </Col>
        </Row> */}
        <Space direction={'vertical'} size={[0, 16]}>
          <Row>
            <Col span={2} offset={5}>Title</Col>
            <Col span={12}>AWDA</Col>
          </Row>
          <Row >
            <Col span={2} offset={5}>Description</Col>
            <Col span={12}>Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
              Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills</Col>
          </Row>
          <Row>
            <Col span={2} offset={5}>Start Date</Col>
            <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
            <Col span={12}>
              10/11/21
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={5}>End Date</Col>
            <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
            <Col span={12}>
              10/10/26
            </Col>
          </Row>
        </Space>
      </CardWrapper>
    </ProjectInfoContainer>
  )
}
