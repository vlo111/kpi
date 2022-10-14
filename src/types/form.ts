import React from 'react'

interface style {
  border?: string
  height?: string
  width?: string
  color?: string
  backgroundColor?: string
  margin?: string
  padding?: string
  placeHolder?: string
}

export interface IInput {
  id?: string
  type?: string
  onRef?: (ref: any) => void
  label?: string
  error?: string
  placeHolder?: string
  style?: style
}

export type InputRef = React.MutableRefObject<HTMLInputElement | undefined>

export type UInputRef = InputRef | undefined

export type RefInput = React.MutableRefObject<UInputRef | null>
