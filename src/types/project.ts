import { Moment } from 'moment'

export type DisabledDate = (current: Moment, item: string) => boolean
export type OnChange = (date: Moment | null, item: string) => void
export type Date = Moment | null
