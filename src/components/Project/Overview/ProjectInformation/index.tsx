import React from 'react'
import styled from 'styled-components'
import { Typography, Card, Space } from 'antd'
import CardTitle from './CardTitle'
import GeneralInfo from './GeneralInfo'
import ResultAndActivities from './ResultAndActivities'
import ProjectDetails from './ProjectDetails'
import ActivityName from './ActivityName'
import { generalInfo, resultAndActivities, organisations, regionas, sectors } from '../../../../helpers/constants'
import { AsnButton } from '../../../Forms/Button'

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

const ProjectInformation: React.FC = () => {
  return (
        <ProjectInfoContainer>
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
                <AsnButton>Back</AsnButton>
        </ProjectInfoContainer>
  )
}

export default ProjectInformation
