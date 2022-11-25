import React, { useState } from 'react'
import { Card, Row, Button, Typography } from 'antd'
import styled from 'styled-components'

import { ReactComponent as Active } from '../../../assets/icons/active.svg'
import { ReactComponent as Location } from '../../../assets/icons/location.svg'
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg'
// import { StatusFilter } from '../Filter/Status'
import AddSubActivity from '../AddSubActivy'
import { AddManagerHandle } from '../../../types/project'
// import { AssingnesFilter } from '../Filter/Assigned'

const { Title } = Typography

const Container = styled.div`
button{
  background: rgba(42, 85, 120, 0.05);
    border-top: 2px solid var(--dark-border-ultramarine);
    border-radius: 20px;
    height: 200px;
    width: 200px !important;
}
.card{
height: 200px;
width: 200px;
background: rgba(246, 151, 109, 0.05);
border-top: 2px solid var(--secondary-light-orage);
box-shadow: 0px 4px 4px rgba(246, 151, 109, 0.2);
border-radius: 20px;
p{
  color: var(--dark-2);
  display: flex;
  align-items: center;
  grid-gap: 10px;
  margin: 8px 0px;
}
}
.ant-card-body{
  padding: 0 28px;
}
.cardRound{
  background: white;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    position: absolute;
    top: -16px;
    left: 47px;
    border: 2px solid var(--secondary-light-orage);
    color: var(--secondary-light-orage);
    justify-content: center;
    display: flex;
}
.cardInactive{
background: var(--dark-5);
border-top: 2px solid var(--dark-5);
box-shadow: 0px 4px 4px rgba(104, 163, 149, 0.2);
}
.cardActive{
background: rgba(104, 163, 149, 0.05);
border-top: 2px solid var(--secondary-green);
box-shadow: 0px 4px 4px rgba(104, 163, 149, 0.2);
}
.cardRoundInactive{
  border: 2px solid var(--dark-5);
}
.active{
  border: 2px solid var(--secondary-green);
   align-Items: center;
}
.ant-card-head-title{
 font-size: var(--headline-font-size);
}
.ant-card-head{
  border-bottom: 0;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border: none !important;
}
`
export const SubActivity: React.FC = () => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState<boolean>(false)

  const onEditedPublishProject: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(true)
  }
  return (
    <Container>
            <div style={{ display: 'flex', alignItems: 'baseline', gridGap: '2rem' }}>
  <Title level={5} style={{ display: 'grid' }}> Status
   {/* <StatusFilter/> */}
   </Title>
  <Title level={5} style={{ display: 'grid' }}>Assigned
   {/* <AssingnesFilter/> */}
   </Title>
  <Title level={5}>Date</Title>
  <Title level={5}>Reset</Title>
  </div>
     <Row gutter={24} style={{ gridGap: '41px', overflow: 'scroll', height: '40.5vh', padding: '16px 0px' }}>
           <Button type="link" block onClick={onEditedPublishProject} style={{ color: 'var(--dark-1)', fontSize: 'var(--base-font-size)' }}>
       + Add Activity
   </Button>
   <AddSubActivity isOpenCreateActivityModal={isOpenCreateActivityModal} setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}/>
   <Card title="Card title" className='cardInactive card'>
          <div className='cardRoundInactive cardRound'></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='card'>
          <div className='cardRound'> ... </div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='card'>
          <div className='cardRound'></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='cardInactive card'>
          <div className='cardRoundInactive cardRound'></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='card cardActive'>
        <div className='cardRound active'><Active/></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='card cardActive'>
          <div className='cardRound active'><Active/></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='cardInactive card'>
          <div className='cardRoundInactive cardRound' ></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
    </Row>
      </Container>
  )
}
