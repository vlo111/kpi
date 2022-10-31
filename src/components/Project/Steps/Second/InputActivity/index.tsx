import React from 'react'
import { AnsCollapse } from '../../../../AnsCollapse'
import { Panel } from '../../../../Forms/AnsCollapse'
import { Activity } from '../../../../../types/project'
import InputAreaBox from '../InputAreaBox'

const InputActivity: React.FC<{
  id: string
  index: number
  activities: Activity[]
}> = ({ id, index, activities }) => {
  return (
    <>
      <div className="panel">
        <div className="activity-heder">
          <span className="ans-title">
            Please input at least one activity for the Result area {index} *
          </span>
          <div className="activity-panel">
            <span className="activity-title">Input Activity* </span>
            <div className="activity-list">
              {activities.map((activity) => (
                <AnsCollapse key={activity.id} id={activity.id}>
                  <Panel key={activity.id} header={activity.name}>
                    <InputAreaBox list={activity.milestones} />
                  </Panel>
                </AnsCollapse>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InputActivity
