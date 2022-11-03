import React, { useState } from 'react'
import { Form } from '../../../../Forms/Form'
import {
  HandleSubmit,
  IManager
} from '../../../../../types/project'
import AddManagerModal from './AddManagerModal'
import ManagerIcon from '../../../../ManagerIcon'
import { InitManager } from '../../../../../helpers/fakeData'
import styled from 'styled-components'
import { Name } from '../../../../../helpers/constants'
import { ReactComponent as AddManagerSvg } from '../../../../../assets/icons/add-manager.svg'
import { useProject } from '../../../../../hooks/useProject'

const ManagerContainer = styled.div`
  
  .add-manager {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
  }
  
  .ant-form-item-control-input-content {
    display: flex;

    .justify-left {
      margin-left: -22px;
    }
  }
`

const Managers: React.FC = () => {
  const [managerModalOpen, setManagerModalOpen] = useState<IManager | null>(null)
  const { managers, addNewManager }: { managers: IManager[], addNewManager: (manager: IManager) => void } = useProject()

  const editManager: (id: string) => void = (id) => {
    setManagerModalOpen(managers.find((m) => m.id === id) ?? null)
  }

  const addManager: HandleSubmit = () => {
    setManagerModalOpen(InitManager)
  }

  return (
      <>
        <ManagerContainer>
          <Form.Item {...Name('Project Manager')} >
            {managers.map((m, i) => (
                <div key={m.id} className={i > 0 ? 'justify-left' : ''} onClick={() => editManager(m.id)}>
                  <ManagerIcon letter={`${m.firstName[0]}${m.lastName[0]}`}/>
                </div>
            ))}
              <div className="add-manager">
                  <AddManagerSvg onClick={addManager} />
              </div>
          </Form.Item>
        </ManagerContainer>
        <AddManagerModal
            manager={managerModalOpen}
            setManagerModalOpen={setManagerModalOpen}
            setAddManager={(values) => {
              if (managers !== null) {
                values.id = managers.length + 1
                addNewManager(values)
              }
            }}
        />
      </>

  )
}

export default Managers
