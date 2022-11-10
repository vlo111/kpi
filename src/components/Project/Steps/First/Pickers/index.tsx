// import React from 'react'
// import styled from 'styled-components'
// import { Form } from '../../../../Forms/Form'
// import { AsnDatePicker } from '../../../../Forms/DatePicker'
// import { Moment } from 'moment'
// import { DisabledDate } from '../../../../../types/project'
// import { Name } from '../../../../../helpers/constants'
//
// const Picker = styled.div`
//   display: flex;
//   justify-content: space-between;
//
//   > div {
//     width: 48%;
//     font-size: 20px;
//   }
//
//   .ant-picker {
//     width: 100%;
//   }
//
//   .ant-picker-input > input {
//     height: 30px;
//     font-size: var(--base-font-size);
//   }
// `
//
// const rules = {
//   rules: [
//     {
//       required: true
//     }
//   ]
// }
//
// export const Pickers: React.FC<{ form: any }> = ({ form }) => {
//   const disabledDate: DisabledDate = (current: Moment, item) => {
//     const startDate = form.getFieldsValue().startDate
//     const endDate = form.getFieldsValue().endDate
//
//     if (item === 'start') {
//       return current && current > (endDate ?? current)
//     } else {
//       return current && current < (startDate ?? current)
//     }
//   }
//
//   return (
//         <Picker>
//             <Form.Item
//                 {...Name('startDate', 'Start Date')}
//                 {...rules}
//             >
//                 <AsnDatePicker
//                     format="DD/MM/YYYY"
//                     placeholder="10/22/21"
//                     disabledDate={(current: Moment) => disabledDate(current, 'start')}
//                 />
//             </Form.Item>
//             <Form.Item
//                 {...Name('endDate', 'End Date')}
//                 {...rules}
//             >
//                 <AsnDatePicker
//                     format="DD/MM/YYYY"
//                     placeholder="10/22/26"
//                     disabledDate={(current: Moment) => disabledDate(current, 'end')}
//                 />
//             </Form.Item>
//         </Picker>
//   )
// }
