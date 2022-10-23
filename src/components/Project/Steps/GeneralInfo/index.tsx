import React, { useState } from 'react'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Form } from '../../../Forms/Form'
import { PlaceHolderDescription } from '../../../../helpers/constants'
import AnsDatePicker from '../../../Forms/DatePicker'
import styled from 'styled-components'
import { Moment } from 'moment'
import { Date, DisabledDate, Manager, OnChange } from '../../../../types/project'
import AddManagerModal from './AddManagerModal'
import ManagerIcon from '../../../ManagerIcon'
import AddManagerIcon from './AddManagerIcon'

const Picker = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 48%;
    font-size: 20px;
  }

  .ant-picker {
    width: 100%;
  }

  .ant-picker-input > input {
    height: 30px;
    font-size: var(--base-font-size);
  }
`

const Managers = styled.div`

  .ant-form-item-control-input-content {
    display: flex;

    > div {
      margin-right: 1rem;
    }
  }
`

const managerList = [
  {
    id: '1',
    firstName: 'Volodya',
    lastName: 'Vardanyan',
    email: 'vv@vv.vv',
    position: 'manager',
    assigned: 'Project'
  },
  {
    id: '2',
    firstName: 'Diana',
    lastName: 'Karapetyan',
    email: 'vv@vv.vv',
    position: 'manager',
    assigned: 'Project'
  }
]

const GeneralInfo: React.FC = () => {
  const [startData, setStartData] = useState<Date>(null)
  const [endData, setEndDate] = useState<Date>(null)
  const [managerModalOpen, setManagerModalOpen] = useState<Manager | null>(null)
  const [managers, setAddManager] = useState<Manager[]>(managerList)

  const onChange: OnChange = (date: Date, item: string) => {
    if (item === 'start') {
      setStartData(date)
    } else {
      setEndDate(date)
    }
  }

  // const addManager: (manager: Manager) => void = (manager) => {
  //
  // }

  const editManager: (id: string) => void = (id) => {
    setManagerModalOpen(managerList.find((m) => m.id === id) ?? null)
  }

  const addManager: () => void = () => {
    setManagerModalOpen({ assigned: '', email: '', firstName: '', id: '', lastName: '', position: '' })
  }

  const disabledDate: DisabledDate = (current: Moment, item) => {
    if (item === 'start') {
      return current && current > (endData ?? current)
    } else {
      return current && current < (startData ?? current)
    }
  }

  // console.log(managers)
  return (
        <>
            <Form.Item name="Title" label="Title" rules={[{
              required: true,
              min: 2,
              max: 256
            }]}>
                <AsnInput placeholder="Example: AWDA"/>
            </Form.Item>
            <Form.Item name="Description" label="Description" rules={[{
              required: true,
              min: 1,
              max: 2048
            }]}>
                <TextArea placeholder={PlaceHolderDescription}/>
            </Form.Item>
            <Picker>
                <Form.Item name="Start Date" label="Start Date" rules={[{
                  required: true
                }]}>
                    <AnsDatePicker
                        disabledDate={(current: Moment) => disabledDate(current, 'start')}
                        onChange={(date: Date) => onChange(date, 'start')}
                    />
                </Form.Item>
                <Form.Item name="End Date" label="End Date" rules={[{
                  required: true
                }]}>
                    <AnsDatePicker
                        disabledDate={(current: Moment) => disabledDate(current, 'end')}
                        onChange={(date: Date) => onChange(date, 'end')}
                    />
                </Form.Item>
            </Picker>
            <Managers>
                <Form.Item name="managers" label="Project Manager">
                    {managers.map((m) => (
                        <div key={m.id} onClick={() => editManager(m.id)}>
                            <ManagerIcon letter={`${m.firstName[0]}${m.lastName[0]}`}/>
                        </div>
                    ))}
                    <AddManagerIcon onClick={addManager}/>
                </Form.Item>
            </Managers>
            <AddManagerModal manager={managerModalOpen} setManagerModalOpen={setManagerModalOpen}
                             setAddManager={(values) => {
                               if (managers !== null) {
                                 const m: any = managers.slice(0)
                                 values.id = managers.length + 1
                                 m.push(values)
                                 setAddManager(m)
                               }
                             }}/>
        </>
  )
}

export default GeneralInfo
