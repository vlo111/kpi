import React, { useState } from 'react'
import { IExpectedResult, IMilestones } from '../../../../../types/project'
import BoxContainer from './BoxContainer'
import ConfirmModal from '../../../../Forms/Modal/ConfirmModal'
import { useProjectInput } from '../../../../../hooks/project/useProjectInput'
import { ActionHandle } from '../../../../../types/context'

const InputAreaBox: React.FC<{ list: IExpectedResult[] | IMilestones[], resultAreaId: string, activityId?: string }> = ({
  list,
  resultAreaId,
  activityId
}) => {
  const [openDeleteResultModal, setOpenDeleteResultModal] = useState(false)
  const [selectDeleteId, setSelectDeleteId] = useState({ item: '', id: '' })
  const { deleteMilestone, deleteExpectedResult } = useProjectInput()

  const deleteResultHandle: ActionHandle = (id) => {
    if (selectDeleteId.item === 'expected') {
      deleteExpectedResult(resultAreaId, id)
    } else {
      deleteMilestone(resultAreaId, activityId, id)
    }
  }

  return (
    <>
      {list.map((l, i) => (
        <BoxContainer
          key={l.id}
          item={l}
          index={i}
          accessDelete={!(list.length === 1)}
          onDelete={(item, id) => {
            setOpenDeleteResultModal(!openDeleteResultModal)
            setSelectDeleteId({ item, id })
          }}
        />
      ))}
      <ConfirmModal
        styles={{ gap: '6rem' }}
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={() => {
          deleteResultHandle(selectDeleteId.id)
          setOpenDeleteResultModal(!openDeleteResultModal)
        }}
        onCancel={() => setOpenDeleteResultModal(!openDeleteResultModal)}
      />
    </>
  )
}

export default InputAreaBox
