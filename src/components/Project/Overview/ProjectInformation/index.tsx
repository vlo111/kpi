import React from 'react'
import styled from 'styled-components'
import { Typography, Card, Space, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import CardTitle from './CardTitle'
import GeneralInfo from './GeneralInfo'
import ResultAndActivities from './ResultAndActivities'
import ProjectDetails from './ProjectDetails'
import ActivityName from './ActivityName'
import MainLayout from '../../../Layout/MainLayout'
import { generalInfo, resultAndActivities, organisations, regionas, sectors } from '../../../../helpers/constants'
import { AsnButton } from '../../../Forms/Button'
import { ReactComponent as ArrowLeftSvg } from '../../../../assets/icons/arrowLeft.svg'

const { Title } = Typography

const ProjectInfoContainer = styled.div`
  padding: 40px 32px 60px 32px;
`
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
const ResultAreaName = styled.div`
    margin-bottom: 16px;
    font-size: 16px;
`
const backButton = {
  borderRaduis: '10px',
  height: '44px',
  background: 'var(--dark-border-ultramarine)',
  color: 'var( --white)',
  marginTop: '44px'
}
const headerPaginationCss = {
  cursor: 'pointer',
  fontSize: 'var(--base-font-size)'
}

const ProjectInformation: React.FC = () => {
  const navigate = useNavigate()
  return (
    <MainLayout>
        <ProjectInfoContainer>
            <Row gutter={[11, 0]} align='middle'>
           <Col style={{ cursor: 'pointer' }} onClick={() => navigate('/overview')}><ArrowLeftSvg /></Col>
            <Col style={ { ...headerPaginationCss, color: 'var(--dark-3)' } } onClick={() => navigate('/overview')}>Project Overview {'>'}</Col>
            <Col style={ { ...headerPaginationCss } }>Project information</Col>
            </Row>
            <MainTitle>Project Information</MainTitle>
            <CardWrapper>
                <Space direction={'vertical'} size={[0, 16]} style={{ width: '100%' }}>
                    <CardTitle title={'General Info'} />
                    {generalInfo.map((info, i) => (
                        <GeneralInfo key={i} title={info.title} description={info.description} />
                    ))}
                </Space>
            </CardWrapper>
            <CardWrapper style={{ borderTop: '3px solid var(--secondary-green)' }}>
                <CardTitle title={'Result areas and Activities'} />
                <ResultAreaName>1.Skill gap reduced</ResultAreaName>
                {resultAndActivities.map((info, i) => (
                    <ResultAndActivities
                        key={i}
                        option={info.option}
                        description={info.description}
                        count={info.count}
                        divider={true}
                    />
                ))}
               <ActivityName activityName='1.1 Mapping the labor market' divider={true} />
               <ResultAndActivities
                        option={'OC1.3'}
                        description={'skill mapping study completed and study report, summarizing findings and recommendations developed. '}
                        count={'20'}
                        divider={true}
                    />
                     <ActivityName activityName='1.2 Establishment of educational labs' divider={false} />
                     <ResultAndActivities
                        option={''}
                        description={'multimedia lab established in Gyumri '}
                        count={'1'}
                        divider={false}
                    />
            </CardWrapper>
            <CardWrapper style={{ borderTop: '3px solid var(--secondary-light-orage)' }}>
            <CardTitle title={'Project details'} />
            <ProjectDetails info={organisations} />
            <ProjectDetails info={regionas} />
            <ProjectDetails info={sectors} />
                </CardWrapper>
                <Row justify='end'>
                <AsnButton style={ { ...backButton } } onClick={() => navigate('/overview')}>Back</AsnButton>
                </Row>
        </ProjectInfoContainer>
        </MainLayout>
  )
}

export default ProjectInformation
