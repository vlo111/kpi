import React, { useState } from 'react'
import AnsModal from '../../../../../../Forms/Modal'
import styled from 'styled-components'
import {
  IManager,
  IManagerState,
  IManagerOverview
} from '../../../../../../../types/project'
import { useGeneralInfo } from '../../../../../../../hooks/project/useGeneralInfo'
import ManagerIcon from '../../../../../../ManagerIcon'
import { ReactComponent as EditSvg } from '../../../../../../../assets/icons/edit.svg'
import { ReactComponent as DeleteSvg } from '../../../../../../../assets/icons/delete.svg'
import ConfirmModal from '../../../../../../Forms/Modal/ConfirmModal'

const ManagerModal = styled(AnsModal)`
  border-top: 3px solid var(--secondary-green);
  border-radius: 20px;

  .ant-modal-content {
    padding: 1rem 1rem 2rem 1rem;
    box-shadow: var(--base-box-shadow);

    .overview {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &-header {
        display: flex;
        gap: 0.5rem;

        &-manager_name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;

          p {
            margin: 0;
            font-size: var(--headline-font-size);
            color: var(--dark-border-ultramarine);
          }
        }

        .manager-icon {
          width: 60px;
          min-width: 60px;
          height: 60px;
        }

        &-tools {
          &-icons {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
            cursor: pointer;
          }
        }
      }

      &-footer {
        &-mail_box {
          display: flex;
          justify-content: space-between;

          p {
            font-size: var(--base-font-size);
            color: var(--dark-2);
            margin-bottom: 4px;
          }

          &-status {
            color: var(--dark-4) !important;
          }

          &-content {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
        }
      }
    }
  }
`

const ManagerOverviewModal: React.FC<IManagerOverview> = ({
  id,
  setOverview
}) => {
  const { getManagerById, deleteManagerById }: IManagerState = useGeneralInfo()

  const manager: IManager | undefined = getManagerById(id)

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const letterIcon = `${manager?.firstName[0] ?? ''}${
        manager?.lastName[0] ?? ''
    }`

  const deleteManager: () => void = () => {
    deleteManagerById(id)
    setOpenDeleteModal(false)
    setOverview(null)
  }

  const modalStyle = {
    top: window.innerHeight / 3 + window.innerHeight / 4,
    left: '-26vw'
  }

  return (
        <>
            <ManagerModal
                open={id !== null}
                width={'360px'}
                style={modalStyle}
                onCancel={() => setOverview(null)}
                closable={false}
                mask={false}
                footer={false}
            >
                <div className="overview">
                    <div className="overview-header">
                        <ManagerIcon letter={letterIcon} color={manager?.color ?? ''}/>
                        <div className="overview-header-manager_name">
                            <p>{manager?.firstName}</p>
                            <p>{manager?.lastName}</p>
                        </div>
                        <div className="overview-header-tools">
                            <div className="overview-header-tools-icons">
                                <EditSvg onClick={() => setOverview(id)}/>
                                <DeleteSvg onClick={() => setOpenDeleteModal(!openDeleteModal)}/>
                            </div>
                        </div>
                    </div>
                    <div className="overview-footer">
                        <div className="overview-footer-mail_box">
                            <p>E-mail:</p>
                            <div className="overview-footer-mail_box-content">
                                <p>{manager?.email}</p>
                                <p className="overview-footer-mail_box-status">Unverified</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ManagerModal>
            <ConfirmModal
                open={openDeleteModal}
                title="Are you sure you want to delete  the selected people from the account?"
                onSubmit={deleteManager}
                onCancel={() => setOpenDeleteModal(!openDeleteModal)}
            />
        </>
  )
}

export default ManagerOverviewModal
