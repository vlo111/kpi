import React, { useState } from 'react'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { InputResultArea } from '../../../../Forms/InputResultArea'
import { ReactComponent as InfoSvg } from '../../../../../assets/icons/info.svg'
import { Form, Row, Tooltip } from 'antd'
import { TollTipText } from '../../../../../utils/ProjectUtils'
import { AsnButton } from '../../../../Forms/Button'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { ConfirmModal } from '../../../../Forms/Modal/ConfirmModal'
import InputExpectedResult from './Expected'
import InputActivity from './Activity'
import { HeaderElement } from '../../../../../helpers/constants'

const InputResult: React.FC = () => {
  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<any>()
  const [selectDeleteId, setSelectDeleteId] = useState<{ remove: (name: number | number[]) => void, field: number }>()

  return (
    <>
      <Form.List name="result_area_form">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index: number) => (
              <InputResultArea key={field.key}>
                <span id={`ans-title-${field.key}`} className="ans-title result_area_title">
                  <span>Input Result Area {index + 1} *</span>
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
                    <AsnCollapse key={`${field.key}`} id={`${field.key}`}>
                      <Panel
                        key={`${field.key}`}
                        header={HeaderElement(
                          field.key,
                          [field.name, 'resultAreaInput'],
                          `${index + 1}.`,
                          'Example: Skill gap reduced',
                          'result_area_header_'
                        )}
                      >
                        <InputExpectedResult resultId={field.key}/>
                        <InputActivity resultId={field.key}/>
                      </Panel>
                    </AsnCollapse>
                  </div>
                  {fields.length > 1 && (
                    <div
                      className="delete-result"
                      onClick={() => {
                        setOpenDeleteResultModal(!openDeleteResultModal)
                        setSelectDeleteId({ remove, field: field.name })
                      }}
                    >
                      <DeleteSvg />
                    </div>
                  )}
                </div>
              </InputResultArea>
            ))}
            <Row>
              <AsnButton
                style={{ background: 'white', width: '100%', height: '3rem' }}
                value="Create"
                onClick={() => add({
                  resultAreaInput: '',
                  expectedList: [{}],
                  activities: [{ activityInput: '', milestones: [{}] }]
                })}
              >
                +Add Result Area
              </AsnButton>
            </Row>
          </>
        )}
      </Form.List>
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Delete"
        no="Cancel"
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={() => {
          selectDeleteId?.remove(selectDeleteId.field)
          setOpenDeleteResultModal(null)
        }}
        onCancel={() => setOpenDeleteResultModal(!openDeleteResultModal)}
      />
    </>
  )
}

export default InputResult
