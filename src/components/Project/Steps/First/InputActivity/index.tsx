import React, { useState } from 'react'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { IActivity } from '../../../../../types/project'
import InputAreaBox from '../InputAreaBox'
import { Row, Tooltip } from 'antd'
import { AsnButton } from '../../../../Forms/Button'
import { useProjectInput } from '../../../../../hooks/project/useProjectInput'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { ConfirmModal } from '../../../../Forms/Modal/ConfirmModal'
import { TollTipText } from '../../../../../utils/ProjectUtils'
import { ReactComponent as InfoSvg } from '../../../../../assets/icons/info.svg'

const InputActivity: React.FC<{
  id: string
  index: number
  activities: IActivity[]
}> = ({ id, index, activities }) => {
  const { addNewMilestone, addNewActivity, deleteActivity } = useProjectInput()
  const [openDeleteResultModal, setOpenDeleteResultModal] = useState(false)
  const [selectDeleteId, setSelectDeleteId] = useState('')

  const FooterRow: (width: string) => any = (width) => (
    <Row style={{ width }}>
      <AsnButton
        style={{ background: 'white', width: '100%', height: '44px' }}
        value="Create"
        onClick={() => addNewActivity(id)}
      >
        +Add Activity
      </AsnButton>
    </Row>
  )
  return (
    <>
      <div className="panel">
        <div className="activity-heder">
            <span className="ans-title">
            <span> Please input at least one activity for the Resultasd  area {index} *</span>
              <Tooltip overlayClassName="result-area-tooltip" placement="right" style={{ width: '600px' }} title={
                  TollTipText('Must include at least one activity and at least one milestone statement.',
                    'Code is optional; can contain: A-Z letters, 0-9 digits, symbol (.).',
                    'Milestone statement is required; can contain: A-Z letters, 0-9 digits; maximum of 256 characters.',
                    'Target for Percentage: Range 1-100.',
                    'Target for Number: Range 1-999999.',
                    'Target for Attachment: Range 1-100.'
                  )
              }>
                  <InfoSvg />
              </Tooltip>
          </span>
          <div className="activity-panel">
            <span className="activity-title">Input Activity* </span>
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-block">
                  <AsnCollapse id={activity.id}>
                    <Panel key={activity.id} header={activity.name}>
                      <InputAreaBox
                        resultAreaId={id}
                        activityId={activity.id}
                        list={activity.milestones}
                      />
                      <Row style={{ width: 'calc(100% - 10px)' }}>
                        <AsnButton
                          style={{
                            background: 'white',
                            width: '100%',
                            height: '44px'
                          }}
                          value="Create"
                          onClick={() => addNewMilestone(id, activity.id)}
                        >
                          +Add Milestone
                        </AsnButton>
                      </Row>
                    </Panel>
                  </AsnCollapse>
                  {activities.length > 1 && (
                    <div
                      className="delete-activity"
                      onClick={() => {
                        setOpenDeleteResultModal(!openDeleteResultModal)
                        setSelectDeleteId(activity.id)
                      }}
                    >
                      <DeleteSvg />
                    </div>
                  )}
                </div>
              ))}
              {activities.length > 1
                ? FooterRow('calc(100% - 18px)')
                : FooterRow('100%')}
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
          deleteActivity(id, selectDeleteId)
          setOpenDeleteResultModal(!openDeleteResultModal)
        }}
        onCancel={() => setOpenDeleteResultModal(!openDeleteResultModal)}
      />
    </>
  )
}

export default InputActivity
