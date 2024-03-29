import { UseQueryResult } from '@tanstack/react-query';

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
  refetch: () => Promise<UseQueryResult>
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>
  folderFiles: IFiles[]
  folderId: string
  isFetchingFolderFiles: boolean
  folderName: string
  setFolderId: React.Dispatch<React.SetStateAction<string>>
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  refetchFolderFiles: () => Promise<UseQueryResult>
  refetchAllFiles: () => Promise<UseQueryResult>
  setOffset: React.Dispatch<React.SetStateAction<number>>
  filesCount: string
  isFetchingAllFiles: boolean
  isFetchingCourseFiles: boolean
  offset: number
}
export interface IDataResult {
  fileList: IFiles[] | ICourseFiles | any
  onRemoveFile: (id?: string) => void
  courseId: string | null
  refetch: () => Promise<UseQueryResult>
  isFetchingFolderFiles: boolean
  folderId: string
  folderName: string
  setFolderId: React.Dispatch<React.SetStateAction<string>>
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  refetchFolderFiles: () => Promise<UseQueryResult>
  filesCount: string
  refetchAllFiles: () => Promise<UseQueryResult>
  isFetchingAllFiles: boolean
  isFetchingCourseFiles: boolean
  setOffset: React.Dispatch<React.SetStateAction<number>>
  offset: number
}

export interface IFilesProps {
  filesCount: string
  setCourseId: React.Dispatch<React.SetStateAction<string | null>>
  courseFiles: ICourseFiles
  refetchAllFiles: () => Promise<UseQueryResult>
  isFetching: boolean
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>
  search: string | undefined
  setFolderId: React.Dispatch<React.SetStateAction<string>>
  isFetchingFolderFiles: boolean
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  folderId: string
  courseId: string | null
}

export interface ICourseFiles {
  folders: IFolders[]
  files: {
    GENERAL_DOCUMENT: IFiles[]
    REQUIRED_DOCUMENT: IFiles[]
  }
}

export interface IPaginate {
  limit: number
  offset: number
  currentPage: number
}

export type IExpandResultArea = (id: string, key: string) => void

export type IExpandInputActivity = (id: string, key: string, prevKey: string) => void

export type IExpandCourse = (id: string, key: string, prevKey: string, index: string) => void
export interface INameAndId {
  title: string
  id: string
}
export interface ICourseNames {
  title: string
  id: string
  count: number
  status: string
  start_date: string
  end_date: string
}

export interface ICourseFilesProps {
  fileList: ICourseFiles
  onRemoveFile: (name: string | undefined) => void
  setOpens: React.Dispatch<React.SetStateAction<boolean>>
  setViewPdf: React.Dispatch<React.SetStateAction<string | null>>
  fileName: string
  handleFileClick: (path: string) => void
  handleFolderFileClick: (title: string, id: string) => void
  courseId: string | null
  refetch: () => Promise<UseQueryResult>
  refetchAllFiles: () => Promise<UseQueryResult>
}

export interface IResultWrapper {
  files: IFiles[]
  onRemoveFile: (name: string | undefined) => void
  setOpens: React.Dispatch<React.SetStateAction<boolean>>
  setViewPdf: React.Dispatch<React.SetStateAction<string | null>>
  fileName: string
  handleFileClick: (path: string) => void
  all: boolean
}

export interface IFileUpload {
  courseId: string | null
  folderId?: string
  refetch: () => Promise<UseQueryResult>
  refetchAllFiles: () => Promise<UseQueryResult>
  refetchFolderFiles?: () => Promise<UseQueryResult>
  type: string
  folder?: boolean
}

export interface IUploadFileError {
  response: { data: { status: number, message: string } }
}
export interface IUploadFileResponse {
  data: { result: string[] }
}

export interface DownloadDocument {
  name: string
  hide: () => void
  path: string
}
