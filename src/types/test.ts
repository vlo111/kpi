export type Login = (email: string, password: string) => Promise<void>

export type ExpectElementExist = (item: string) => Promise<void>

export type ExpectToBeInDocument = (...items: string[]) => void

export type GetByRole = (name: string) => Promise<HTMLElement>

export type ExpectEmptyValidation = () => Promise<void>

export type GetTextBoxes = () => Promise<HTMLElement[]>
