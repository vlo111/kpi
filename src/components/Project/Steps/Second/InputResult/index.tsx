import React, { useState } from 'react'
import { IResultArea } from '../../../../../types/project'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { InputResultArea } from '../../../../Forms/InputResultArea'
import InputExpectedResult from '../InputExpectedResult'
import InputActivity from '../InputActivity'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { ReactComponent as InfoSvg } from '../../../../../assets/icons/info.svg'
import { ConfirmModal } from '../../../../Forms/Modal/ConfirmModal'
import { useProjectInput } from '../../../../../hooks/project/useProjectInput'
import { ActionHandle } from '../../../../../types/context'
import { FormInstance } from 'antd/lib/form/hooks/useForm'

const InputResult: React.FC<{ resultArea: IResultArea[], form: FormInstance }> = ({
  resultArea
}) => {
  const [openDeleteResultModal, setOpenDeleteResultModal] = useState(false)
  const [selectDeleteId, setSelectDeleteId] = useState('')
  const { deleteResultArea } = useProjectInput()

  const deleteResultHandle: ActionHandle = (id) => {
    deleteResultArea(id)
  }

  return (
    <>
      {resultArea.map((r, i) => (
        <InputResultArea key={r.id}>
          <span className="ans-title">
            <span>Input Result Area {i + 1} *</span>
            <InfoSvg />
          </span>
          <div className="result-container">
            <div className="result-area">
              <AsnCollapse key={r.id} id={r.id}>
                <Panel key={r.id} header={r.name}>
                  <InputExpectedResult id={r.id} results={r.expectedResult} />
                  <InputActivity
                    id={r.id}
                    index={i + 1}
                    activities={r.activity}
                  />
                </Panel>
              </AsnCollapse>
            </div>
            {resultArea.length > 1 && (
              <div
                className="delete-result"
                onClick={() => {
                  setOpenDeleteResultModal(!openDeleteResultModal)
                  setSelectDeleteId(r.id)
                }}
              >
                <DeleteSvg />
              </div>
            )}
          </div>
        </InputResultArea>
      ))}
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Delete"
        no="Cancel"
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={() => {
          deleteResultHandle(selectDeleteId)
          setOpenDeleteResultModal(!openDeleteResultModal)
        }}
        onCancel={() => setOpenDeleteResultModal(!openDeleteResultModal)}
      />
    </>
  )
}

export default InputResult
