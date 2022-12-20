import { UploadFile } from 'antd';

export interface IDataResult {
  fileList: UploadFile[] | []
  setOpen: React.Dispatch<React.SetStateAction<string>>
  open: string
  onRemoveFile: (id?: string) => void
}
