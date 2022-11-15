import {
  IGeneralInfo,
  IMilestones,
  InitGeneralInfoFields,
  InitResultAreaFields, InputResultTitle,
  IResultArea,
  Rules,
  RulesPassword
} from '../types/project'
import _ from 'lodash'
import React from 'react'
import { Form } from '../components/Forms/Form'
import AsnInput from '../components/Forms/Input'

export const rules: Rules = (min, max) => ({
  rules: [{ required: true, min, max }]
})

export const rulesPassword: RulesPassword = (min, max, pattern) => ({
  rules: [{ required: true }, min, max, pattern]
})

export const initFields: InitResultAreaFields = (data, resultArea) => [
  ...resultArea.map((o: IResultArea) => ({
    name: [o.expectedResult[0].id],
    value: (!_.isEmpty(data) && !data[o.expectedResult[0].id]) ? [Object.keys(data[o.expectedResult[0].id] ?? [o.expectedResult[0].id])[0]] : [o.expectedResult[0].id]
  })),
  ...resultArea
    .map((o: IResultArea) =>
      o.expectedResult.map((l) => [
        { name: [`c${l.id}`], value: !_.isEmpty(data) ? data[`c${l.id}`] : l.code },
        { name: [`r${l.id}`], value: !_.isEmpty(data) ? data[`r${l.id}`] : l.result },
        { name: [`m${l.id}`], value: !_.isEmpty(data) ? data[`m${l.id}`] ?? l.measure : l.measure },
        { name: [`t${l.id}`], value: !_.isEmpty(data) ? data[`t${l.id}`] : l.target }
      ])
    )
    .flat()
    .flat(),
  ...resultArea
    .map((o: IResultArea) =>
      o.activity.map((l) =>
        l.milestones.map((m: IMilestones) => [
          { name: [`c${m.id}`], value: !_.isEmpty(data) ? data[`c${m.id}`] : m.code },
          { name: [`r${m.id}`], value: !_.isEmpty(data) ? data[`r${m.id}`] : m.milestone },
          { name: [`m${m.id}`], value: !_.isEmpty(data) ? data[`m${m.id}`] ?? m.measure : m.measure },
          { name: [`t${m.id}`], value: !_.isEmpty(data) ? data[`t${m.id}`] : m.target }
        ])
      )
    )
    .flat()
    .flat()
    .flat()
]

export const initGeneralInfoFields: InitGeneralInfoFields = (generalInfo) => [
  ...generalInfo.map((o: IGeneralInfo) => ({
    name: [o.title],
    value: o.title
  }))
]

export const TollTipText: (title: string, ...items: string[]) => React.ReactNode = (title, ...items) => (<div>
    <p style={{ marginBottom: '1rem' }}>Must include at least one result area and at least one expected result measurement.</p>
    <ul style={{
      display: 'flex',
      gap: '1rem',
      flexDirection: 'column',
      marginLeft: '1rem'
    }}>
        {items.map((s, i) => <li key={i}>{s}</li>)}
    </ul>
</div>)

export const title: InputResultTitle = (id, prefix, placeholder) => (<Form.Item
    name={id}
    rules={[{ required: true, min: 5, max: 256 }]}
>
    <AsnInput prefix={prefix} placeholder={placeholder}/>
</Form.Item>)
