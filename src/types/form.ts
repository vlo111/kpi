import React from 'react'

export enum InputType {
  Default = 1,
  Password,
  Email,
}

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

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
  type?: InputType
  onRef?: (ref: any) => void
  label?: string
  error?: string
  placeHolder?: string
  style?: style
  validatePassword?: boolean
}

export type InputRef = React.MutableRefObject<HTMLInputElement | undefined>

export type UInputRef = InputRef | undefined

export type RefInput = React.MutableRefObject<UInputRef | null>

export interface IButton {
  value: string
  type?: ButtonType
}
