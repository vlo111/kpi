
export interface IFiles {
  name: string
  originalName: string
  path: string
  type: string
}

export interface ISearchImport {
  files: IFiles[]
}
export interface IDataResult {
  fileList: IFiles[]
  setOpen: React.Dispatch<React.SetStateAction<string>>
  open: string
  onRemoveFile: (id?: string) => void
}

export interface IFilesProps {
  allFilesCount: number
  setFiles: React.Dispatch<React.SetStateAction<IFiles[]>>
}
