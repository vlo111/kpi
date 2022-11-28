import React from 'react'
import styled from 'styled-components'
import { IManagerIcon } from '../../types/project'

const IconContainer = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  overflow: hidden;
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--success);
  font-size: var(--base-font-size);
  user-select: none;
  cursor: pointer;
`

const ManagerIcon: React.FC<IManagerIcon> = ({ letter, color, width, height, marginBottom, fontSize }) => {
  return (
        <IconContainer className="manager-icon" style={{ background: color, width, height, marginBottom, fontSize }}>
            <span>{letter}</span>
        </IconContainer>
  )
}

export default ManagerIcon

// import React, { useState } from 'react'
// import { PlusOutlined } from '@ant-design/icons'
// import { Modal, Upload } from 'antd'
// import type { RcFile, UploadProps } from 'antd/es/upload'
// import type { UploadFile } from 'antd/es/upload/interface'

// const getBase64 = async (file: RcFile): Promise<string> =>
//   await new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result as string)
//     reader.onerror = (error) => reject(error)
//   })

// const ManagerIcon: React.FC = () => {
//   const [previewOpen, setPreviewOpen] = useState(false)
//   const [previewImage, setPreviewImage] = useState('')
//   const [previewTitle, setPreviewTitle] = useState('')
//   const [fileList, setFileList] = useState<UploadFile[]>([])

//   const handleCancel = (): void => setPreviewOpen(false)
//   /* eslint-disable @typescript-eslint/explicit-function-return-type */
//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as RcFile)
//     }

//     setPreviewImage(file.url ?? (file.preview as string))
//     setPreviewOpen(true)
//     /* eslint-disable @typescript-eslint/no-non-null-assertion */
//     setPreviewTitle(file.name || file?.url!.substring(file?.url!.lastIndexOf('/') + 1))
//   }

//   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
//     setFileList(newFileList)

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   )
//   return (
//     <>
//       <Upload
//         listType="picture-card"
//         fileList={fileList}
//         /* eslint-disable @typescript-eslint/no-misused-promises */
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 1 ? null : uploadButton}
//       </Upload>
//       <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//         <img alt="example" style={{ width: '100%' }} src={previewImage} />
//       </Modal>
//     </>
//   )
// }

// export default ManagerIcon
