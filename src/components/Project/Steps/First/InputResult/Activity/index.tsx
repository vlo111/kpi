import React, { useState } from 'react'
import { AsnCollapse } from '../../../../../AsnCollapse'
import { Panel } from '../../../../../Forms/AsnCollapse'
import { Form, Row, Tooltip } from 'antd'
import { AsnButton } from '../../../../../Forms/Button'
import { ReactComponent as DeleteSvg } from '../../../../../../assets/icons/delete.svg'
import { ConfirmModal } from '../../../../../Forms/Modal/ConfirmModal'
import { TollTipText } from '../../../../../../utils/ProjectUtils'
import { ReactComponent as InfoSvg } from '../../../../../../assets/icons/info.svg'
import AsnInput from '../../../../../Forms/Input'
import Boxes from '../Boxes'
import { v4 as uuid } from 'uuid'

const header: (
  key: string,
  name: Array<number | string>,
  index: string,
  placeholder: string
) => JSX.Element = (key, name, index, placeholder) => (
  <div key={`activity_header_${key}`} onClick={(e) => e.stopPropagation()}>
    <Form.Item name={name} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={index} placeholder={placeholder} />
    </Form.Item>
  </div>
)

const InputActivity: React.FC<{ resultId: number }> = ({ resultId }) => {
  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<any>()
  const [selectDeleteId, setSelectDeleteId] = useState<{
    remove: (name: number | number[]) => void
    field: number
  }>()

  const onDelete: (
    remove: (index: number | number[]) => void,
    field: number
  ) => void = (remove, field) => {
    setOpenDeleteResultModal(!openDeleteResultModal)
    setSelectDeleteId({ remove, field })
  }

  return (
    <>
      <div className="panel">
        <div className="activity-heder">
          <span className="ans-title">
            <span>
              Please input at least one activity for the Resultasd area{' '}
              {resultId + 1} *
            </span>
          </span>
          <div className="activity-panel">
            <div>
              <span className="activity-title">Input Activity* </span>
              <Tooltip
                overlayClassName="result-area-tooltip"
                placement="right"
                style={{ width: '600px' }}
                title={TollTipText(
                  'Must include at least one activity and at least one milestone statement.',
                  'Code is optional; can contain: A-Z letters, 0-9 digits, symbol (.).',
                  'Milestone statement is required; can contain: A-Z letters, 0-9 digits; maximum of 256 characters.',
                  'Target for Percentage: Range 1-100.',
                  'Target for Number: Range 1-999999.',
                  'Target for Attachment: Range 1-100.'
                )}
              >
                <InfoSvg />
              </Tooltip>
            </div>
            <div className="activity-list">
              {/* {activities.length > 1 */}
              {/*   ? FooterRow('calc(100% - 18px)') */}
              {/*   : FooterRow('100%')} */}
              <Form.List name={[resultId, 'activities']}>
                {(activities, { add: addActivity, remove }) => (
                  <>
                    {activities.map((activity, index: number) => (
                      <div
                        key={`activity_${resultId}_${activity.key}`}
                        className="activity-block"
                      >
                        <AsnCollapse
                          key={`activity_${resultId}_${activity.key}`}
                          id={`activity_${resultId}_${activity.key}`}
                        >
                          <Panel
                            key={`activity_${resultId}_${activity.key}`}
                            header={header(
                              `activity_${resultId}_${activity.key}`,
                              [activity.name, 'activityInput'],
                              `${index + 1}.`,
                              'Individuals with improved soft skills'
                            )}
                          >
                            <Form.List name={[activity.key, 'milestones']}>
                              {(milestones, { add, remove }) => (
                                <Boxes
                                  type={'milestones'}
                                  key={uuid()}
                                  add={add}
                                  onDelete={onDelete}
                                  remove={remove}
                                  list={milestones}
                                  resultId={resultId}
                                  activityId={activity.key + 1}
                                />
                              )}
                            </Form.List>
                          </Panel>
                        </AsnCollapse>
                        {activities.length > 1 && (
                          <div
                            className="delete-activity"
                            onClick={() => {
                              setOpenDeleteResultModal(!openDeleteResultModal)
                              setSelectDeleteId({
                                remove,
                                field: activity.name
                              })
                            }}
                          >
                            <DeleteSvg />
                          </div>
                        )}
                      </div>
                    ))}
                    <Row>
                      <AsnButton
                        style={{
                          background: 'white',
                          width: '100%',
                          height: '3rem'
                        }}
                        value="Create"
                        onClick={() => {
                          addActivity({ activityInput: '', milestones: [{}] })
                        }}
                      >
                        +Add Activity
                      </AsnButton>
                    </Row>
                  </>
                )}
              </Form.List>
            </div>
          </div>
        </div>
      </div>
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

export default InputActivity
