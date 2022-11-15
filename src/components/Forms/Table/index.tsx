import styled from 'styled-components'
import { Table } from 'antd'
import { TableProps } from 'antd/es/table'

export const AsnTable: React.FC<TableProps<any>> = styled(Table)`
    height: 100%;
   .ant-table-tbody>tr>td{
       padding: 9px 8px !important;
       border-bottom: 0.5px solid var(--light-border);
       
        &:last-child{
            border-right: 0.5px solid var(--light-border);
        }
        &:first-child {
            border-left: 0.5px solid var(--light-border);
        }
        h3 {
          font-weight: var(--font-bold);
          font-size: var(--font-size-semismall);
          color: var(--dark-border-ultramarine);
          margin: 0;
        }
        h2 {
          color: var(--dark-2);
          font-size: var(--base-font-size);
          margin: 0;
        }
        .user_status_pending,
        .user_status_resolved {
          padding: 4px 4px;
          font-weight: var(--font-bold);
          font-size: var(--font-size-semismall);
          background: rgba(104, 163, 149, 0.2);
          border-radius: 6px;
          max-width: 107px;
        }
        .user_status_pending {
          background: rgba(246, 151, 109, 0.2) !important;
          color: var(--secondary-light-orage);
        }
        .user_status_resolved{
          color: var(--secondary-green);
        }
    }
    .ant-table-thead>tr>th{
      font-weight: var(--font-normal) !important;
      font-size: var(--font-size-small) !important;
      background: var(--background) !important;
      color: var(--dark-4);
      border-top: 0.5px solid var(--light-border);
      padding: 14px 8px !important;

      &::before{
        content: none !important;
      }
      &:last-child{
        border-right: 0.5px solid var(--light-border);
      }
      &:first-child{
        border-left: 0.5px solid var(--light-border);
      }
    }
    .ant-table-pagination-right {
      justify-content: center;
    }
    .ant-spin-container {
      position: relative;
      transition: opacity .3s;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .ant-table-wrapper,
    .ant-spin-nested-loading{
      height: 100%;
    }
    .ant-pagination.ant-pagination-mini .ant-pagination-item {
     min-width: 32px;
     height: 32px;
     margin: 0;
     line-height: 22px;
     align-items: center;
     display: flex;
     justify-content: center;
      a{
        color: rgba(0, 0, 0, 0.87);
      }
    }
    .ant-pagination-item-active {
     font-weight: var(--font-semibold);
     background: var(--white);
     border-radius: 50%;
     border: none;
     background: rgba(0, 0, 0, 0.09);
    }
    .ant-pagination-next,
    .ant-pagination-prev{
      &:hover{
        svg> path{
          fill: var(--dark-1) !important;
        }
      }
    }
    .ant-space-item> svg{
        &:hover{
            cursor: pointer;
        }
    }
    .ant-table-pagination.ant-pagination {
     margin: 3px 0;
    }
    .ant-table-tbody > .ant-table-measure-row > td {
      padding: 0 !important;
    }
`
