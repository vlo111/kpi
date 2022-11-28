import {
  InputResultTitle,
  Rules,
  RulesPassword
} from '../types/project'
import React from 'react'
import { Form } from '../components/Forms/Form'
import AsnInput from '../components/Forms/Input'

export const rules: Rules = (min, max) => ({
  rules: [{ required: true, min, max }]
})

export const rulesPassword: RulesPassword = (min, max, pattern) => ({
  rules: [{ required: true }, min, max, pattern]
})

export const TollTipText: (
  title: string,
  ...items: string[]
) => React.ReactNode = (title, ...items) => (
  <div>
    <p style={{ marginBottom: '1rem' }}>
      Must include at least one result area and at least one expected result
      measurement.
    </p>
    <ul
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        marginLeft: '1rem'
      }}
    >
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  </div>
)

export const title: InputResultTitle = (id, prefix, placeholder) => (
  <div onClick={(e) => e.stopPropagation()}>
    <Form.Item name={id} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={prefix} placeholder={placeholder} />
    </Form.Item>
  </div>
)

export const placeHolderInputDetails: (name: string) => string = (name) =>
  name === 'Organisations'
    ? 'Your Organisation'
    : name === 'Regions'
      ? 'Region/Marz* '
      : 'Example: IT*'
