import React, { useState } from 'react'
import { IInputResultProps, IResultArea } from '../../../../../types/project'
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
import { Tooltip } from 'antd'
import { title, TollTipText } from '../../../../../utils/ProjectUtils'

const InputResult: React.FC<IInputResultProps> = ({ resultArea, form }) => {
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
            <Tooltip
              overlayClassName="result-area-tooltip"
              placement="right"
              style={{ width: '600px' }}
              title={TollTipText(
                'Must include at least one result area and at least one expected result measurement.',
                'Code is optional; can contain: A-Z letters, 0-9 digits, symbol (.).',
                'Expected result statement is required; can contain: A-Z letters, 0-9 digits; maximum of 256 characters.',
                'Target for Percentage: Range 1-100.',
                'Target for Number: Range 1-999999.'
              )}
            >
              <InfoSvg />
            </Tooltip>
          </span>
          <div className="result-container">
            <div className="result-area">
              <AsnCollapse key={r.id} id={r.id}>
                <Panel key={r.id} header={title(r.id, `${i + 1}.`, 'Example: Skill gap reduced')}>
                  <InputExpectedResult
                    form={form}
                    id={r.id}
                    results={r.expectedResult}
                  />
                  <InputActivity
                    form={form}
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
