/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Card, Row, Button, Typography } from 'antd'
import styled from 'styled-components'
import { ReactComponent as Active } from '../../../assets/icons/active.svg'
import { ReactComponent as Location } from '../../../assets/icons/location.svg'
import { ReactComponent as Calendar } from '../../../assets/icons/calendar.svg'
// import { StatusFilter } from '../Filter/Status'
import React, { useState } from 'react'
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
          <div className='cardRoundInactive cardRound' style={{ border: '2px solid var(--dark-5)' }}></div>
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
          <div className='cardRoundInactive cardRound' style={{ border: '2px solid var(--dark-5)' }}></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='card cardActive'>
        <div className='cardRound active' style={{ border: '2px solid var(--secondary-green)', alignItems: 'center' }}><Active/></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='card cardActive'>
          <div className='cardRound active' style={{ border: '2px solid var(--secondary-green)', alignItems: 'center' }}><Active/></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
        <Card title="Card title" className='cardInactive card'>
          <div className='cardRoundInactive cardRound' style={{ border: '2px solid var(--secondary-green)' }}></div>
          <p>Node Cours</p>
          <p><Location/>Gyumri</p>
          <p><Calendar/>jul 12  julk 25</p>
          <p>IT </p>
        </Card>
    </Row>
      </Container>
  )
}
// import React, { useState } from 'react'
// import { Checkbox, Select } from 'antd'
// import type { CheckboxChangeEvent } from 'antd/es/checkbox'
// import type { CheckboxValueType } from 'antd/es/checkbox/Group'

// const handleChange = (value: string) => {
//   // eslint-disable-next-line no-template-curly-in-string
//   console.log('selected ,${value}')
// }

// const CheckboxGroup = Checkbox.Group

// const plainOptions = ['Apple', 'Pear', 'Orange']
// const defaultCheckedList = ['Apple', 'Orange']

// export const SubActivity: React.FC = () => {
//   const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(
//     defaultCheckedList
//   )
//   const [indeterminate, setIndeterminate] = useState(true)
//   const [checkAll, setCheckAll] = useState(false)

//   const onChange = (list: CheckboxValueType[]) => {
//     setCheckedList(list)
//     setIndeterminate(!(list.length === 0) && list.length < plainOptions.length)
//     setCheckAll(list.length === plainOptions.length)
//   }

//   const onCheckAllChange = (e: CheckboxChangeEvent) => {
//     setCheckedList(e.target.checked ? plainOptions : [])
//     setIndeterminate(false)
//     setCheckAll(e.target.checked)
//   }

//   return (
//     <>
//       <Select
//         optionLabelProp="title"
//         defaultValue="Select"
//         style={{ width: 120 }}
//         onChange={handleChange}
//         options={[
//           {
//             value: 'All',
//             label: (
//               <Checkbox
//                 indeterminate={indeterminate}
//                 onChange={onCheckAllChange}
//                 checked={checkAll}
//               >
//                 Check all
//               </Checkbox>
//             )
//           },
//           {
//             value: 'lucy',
//             label: (
//               <div style={{ display: 'block' }}>
//                 <CheckboxGroup
//                   options={plainOptions}
//                   value={checkedList}
//                   onChange={onChange}
//                 />
//               </div>
//             )
//           }
//         ]}
//       />
//     </>
//   )
// }

// export default SubActivity
