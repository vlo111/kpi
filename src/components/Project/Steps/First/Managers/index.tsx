import React, { useState } from 'react'
import { Form } from '../../../../Forms/Form'
import {
  HandleSubmit,
  IManager,
  IManagerState
} from '../../../../../types/project'
import AddManagerModal from './Modals/AddManager'
import ManagerIcon from '../../../../ManagerIcon'
import { InitManager } from '../../../../../helpers/fakeData'
import styled from 'styled-components'
import { ReactComponent as AddManagerSvg } from '../../../../../assets/icons/add-manager.svg'
import { useGeneralInfo } from '../../../../../hooks/project/useGeneralInfo'
import ManagerOverviewModal from './Modals/Overview'

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

    .manager {
      &:hover {
        z-index: 2;
      }
    }

    .justify-left {
      margin-left: -22px;
    }
  }
`

const Managers: React.FC = () => {
  const [managerModalOpen, setManagerModalOpen] = useState<IManager | null>(null)

  const [overview, setOverview] = useState<string | null>(null)

  const { managers, addNewManager }: IManagerState = useGeneralInfo()

  const editManager: (id: ((prevState: (string | null)) => (string | null)) | string) => void = (id) => {
    setManagerModalOpen(managers.find((m) => m.id === id) ?? null)
  }

  const addManager: HandleSubmit = () => {
    setManagerModalOpen(InitManager)
  }

  const openOverview: any = (id: string) => {
    setOverview(id)
  }

  const setOverviewData: (item: React.SetStateAction<string | null>) => void = (item) => {
    if (item !== null) {
      editManager(item)
    } else {
      setOverview(null)
    }
  }

  return (
      <>
        <ManagerContainer>
          <Form.Item label="Project Manager" required={true}>
            {managers.map((m: IManager, i) => (
                <div
                    key={m.id}
                    className={i > 0 ? 'justify-left manager' : 'manager'}
                    // onClick={() => editManager(m.id)}
                    onClick={() => openOverview(m.id)}
                >
                  <ManagerIcon
                      letter={`${m.firstName[0]}${m.lastName[0]}`}
                      color={m.color}
                  />
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
                values.color = `#${((Math.random() * 0xffffff) << 0)
                    .toString(16)
                    .padStart(6, '0')}`
                addNewManager(values)
              }
            }}
        />
        <ManagerOverviewModal id={overview} setOverview={setOverviewData} />
      </>
  )
}

export default Managers
