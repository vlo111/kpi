
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
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
  folderFiles: IFiles[]
  folderId: string
  isFetchingFolderFiles: boolean
  folderName: string
  setFolderId: React.Dispatch<React.SetStateAction<string>>
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  refetchFolderFiles: any
  refetchAllFiles: any
  setPaginate: React.Dispatch<React.SetStateAction<IPaginate>>
  filesCount: string
  currentPage: number
  isFetchingAllFiles: boolean
}
export interface IDataResult {
  fileList: IFiles[] | ICourseFiles | any
  setOpen: React.Dispatch<React.SetStateAction<string>>
  open: string
  onRemoveFile: (id?: string) => void
  courseId: string | null
  refetch: any
  isFetchingFolderFiles: boolean
  folderId: string
  folderName: string
  setFolderId: React.Dispatch<React.SetStateAction<string>>
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  refetchFolderFiles: any
  isFetchingAllFilesSearch: boolean
  isFetchingSearchCourseFiles: boolean
  setPaginate: React.Dispatch<React.SetStateAction<IPaginate>>
  filesCount: string
  refetchAllFiles: any
  setSearchPaginate: React.Dispatch<React.SetStateAction<IPaginate>>
  search: string
  allFilesSearchCount: string
  currentPage: number
  searchCurrentPage: number
  isFetchingAllFiles: boolean
}

export interface IFilesProps {
  filesCount: string
  setCourseId: React.Dispatch<React.SetStateAction<string | null>>
  courseFiles: ICourseFiles
  refetchAllFiles: any
  isFetching: boolean
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
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
