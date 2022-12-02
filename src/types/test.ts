export type Login = (email: string, password: string) => Promise<void>

export type ExpectElementExist = (item: string) => Promise<void>

export type ExpectToBeInDocument = (...items: string[]) => void
