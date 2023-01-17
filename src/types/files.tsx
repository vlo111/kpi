
export interface IFiles {
  name: string
  originalName: string
  path: string
  type: string
}
export interface IFolders {
  id: string
  title: string
  sectionDataId: string
}

export interface ISearchImport {
  files: IFiles[]
  courseFiles: {
    folders: IFolders[]
    files: {
      GENERAL_DOCUMENT: IFiles[]
      REQUIRED_DOCUMENT: IFiles[]
    }
  }
  courseId: string | null
  refetch: any
}
export interface IDataResult {
  fileList: IFiles[] | ICourseFiles | any
  setOpen: React.Dispatch<React.SetStateAction<string>>
  open: string
  onRemoveFile: (id?: string) => void
  courseId: string | null
  refetch: any
}

export interface IFilesProps {
  allFilesCount: number
  setCourseId: React.Dispatch<React.SetStateAction<string | null>>
  courseFiles: ICourseFiles
}

export interface ICourseFiles {
  folders: IFolders[]
  files: {
    GENERAL_DOCUMENT: IFiles[]
    REQUIRED_DOCUMENT: IFiles[]
  }
}
