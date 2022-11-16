import React from 'react'
// import styled from 'styled-components'
import { AsnButton } from '../../../Forms/Button'
// import { Details, IDetail } from '../../../../types/project'
// import { useProject } from '../../../../hooks/project/useProject'
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg'
// import {
//   OrganizationList,
//   RegionList,
//   SectorList
// } from '../../../../helpers/fakeData'
// import { ConfirmModal } from '../../../Forms/Modal/ConfirmModal'
// import { VALIDATE_MESSAGES } from '../../../../helpers/constants'
import { Form } from '../../../Forms/Form'
// import { v4 as uuidv4 } from 'uuid'
// import { Items } from './Items'
import AsnInput from '../../../Forms/Input'
import { Items } from './Items'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 0 }
  }
}

// const Collapses = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: clamp(5px, 2vw, 20px);
//
//   .input-rows {
//     .ant-collapse-content-box {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       padding: 2rem 3.25rem;
//
//       .delete-result {
//         display: flex;
//         justify-content: flex-end;
//         width: 1%;
//         margin-top: 1rem;
//
//         svg {
//           cursor: pointer;
//         }
//       }
//     }
//   }
//
//   .footer {
//     display: flex;
//     justify-content: end;
//     gap: 5rem;
//
//     button {
//       height: 44px !important;
//       box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
//       border-radius: 6px;
//     }
//   }
// `

export const Last: React.FC = () => {
  // const [organizations, setOrganizations] = useState<Details>(OrganizationList)
  // const [regions, setRegions] = useState(RegionList)
  // const [sectors, setSectors] = useState(SectorList)
  //
  // const [openDeleteResultModal, setOpenDeleteResultModal] = useState(false)
  // const [selectDeleteId, setSelectDeleteId] = useState<string[]>([])
  //
  // const { prevCurrent } = useProject()

  const [form] = Form.useForm()

  // const initFields: (
  //   data: IDetail[]
  // ) => Array<{ name: string[], value: string[] }> = (data: IDetail[]) => {
  //   const field = form.getFieldsValue()
  //
  //   return data.map((o: IDetail) => ({
  //     name: [o.id],
  //     value: field[o.id] ? field[o.id] : [o.name]
  //   }))
  // }

  console.log(form.getFieldsValue())

  // const fields = [
  //   ...initFields(organizations),
  //   ...initFields(regions),
  //   ...initFields(sectors)
  // ]

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    // publish
  }

  // const onFinishFailed: any = (values: any) => {
  //   console.log(values, 'failed')
  // }

  // const addOrganisation: () => void = () => {
  //   const org = {
  //     id: uuidv4(),
  //     name: ''
  //   }
  //
  //   const orgs: IDetail[] = organizations.slice(0)
  //
  //   orgs.push(org)
  //
  //   setOrganizations(orgs)
  // }

  // const addRegions: () => void = () => {
  //   const reg = {
  //     id: uuidv4(),
  //     name: ''
  //   }
  //
  //   const regs: IDetail[] = regions.slice(0)
  //
  //   regs.push(reg)
  //
  //   setRegions(regs)
  // }

  // const addSectors: () => void = () => {
  //   const sec = {
  //     id: uuidv4(),
  //     name: ''
  //   }
  //
  //   const sects: IDetail[] = sectors.slice(0)
  //
  //   sects.push(sec)
  //
  //   setSectors(sects)
  // }

  // const deleteResultHandle: (item: string[]) => void = (item) => {
  //   if (item[0] === 'Organisations') {
  //     const orgs = organizations.slice(0)
  //     setOrganizations(orgs.filter((o) => o.id !== item[1]))
  //   } else if (item[0] === 'Regions') {
  //     const regs = regions.slice(0)
  //     setRegions(regs.filter((r) => r.id !== item[1]))
  //   } else {
  //     const sects = sectors.slice(0)
  //     setSectors(sects.filter((s) => s.id !== item[1]))
  //   }
  // }
  //
  // const deleteItem: (data: string[]) => void = (data) => {
  //   setOpenDeleteResultModal(!openDeleteResultModal)
  //   setSelectDeleteId([data[0], data[1]])
  // }

  return (
    <>
      <Form form={form} name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
        <Items name={'Organisations'}/>
        <Items name={'Regions'}/>
        <Items name={'Sectors'}/>
      </Form>
    </>
  )
}

/*
    <>
      <Form
        form={form}
        layout="vertical"
        fields={fields}
        validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Collapses>
          <Items items={organizations} header={'Organisations'} addItemHandle={addOrganisation} deleteItemHandle={deleteItem} />
          <Items items={regions} header={'Regions'} addItemHandle={addRegions} deleteItemHandle={deleteItem} />
          <Items items={sectors} header={'Sectors'} addItemHandle={addSectors} deleteItemHandle={deleteItem} />
          <div className="footer">
            <AsnButton
              onClick={() => {
                prevCurrent()
              }}
            >
              Previous
            </AsnButton>
            <AsnButton>Save as Draft</AsnButton>
            <AsnButton type="primary" htmlType="submit">
              Publish
            </AsnButton>
          </div>
        </Collapses>
      </Form>
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Delete"
        no="Cancel"
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={() => {
          deleteResultHandle(selectDeleteId)
          setOpenDeleteResultModal(!openDeleteResultModal)
        }}
        onCancel={() => setOpenDeleteResultModal(!openDeleteResultModal)}
      />
    </>
 */
