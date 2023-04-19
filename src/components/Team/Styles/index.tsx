import styled from 'styled-components';
import { AsnModal } from '../../Forms/Modal';

export const AddTeamMemberModalWrapper = styled(AsnModal)`
  width: 600px !important;
  padding: 4.3vh 1.3vw 4.5vh 4.3vh !important;
  background: var(--white);
  border-radius: 20px;
  top: 40px !important;

  .ant-modal-body {
    max-height: 62.5vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 1.8vw;
  }
  .ant-modal-close {
    top: -25px;
    right: -14px;
  }
  .ant-modal-content {
    box-shadow: none !important;
    position: inherit !important;
    padding: 0;
  }
  .ant-modal-title {
    font-size: var(--headline-font-size);
  }
  .ant-select,
  .ant-cascader {
    width: 100%;
    font-size: var(--base-font-size);
    background: var(--white);
    border: 1px solid var(--dark-border-ultramarine);
    border-radius: 5px;

    .ant-select-selector {
      position: inherit !important;
      background: none !important;
      height: 100% !important;
      border: none !important;
      padding: 6px 11px !important;
    }

    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }

    .ant-select-arrow {
      display: none !important;
    }
  }
  .anticon[tabindex] {
    position: absolute;
    top: 42px;
    right: -17px;
  }

  .ant-row {
    width: 100%;
  }
  .ant-form-item {
    margin-bottom: 1.6vh !important;
  }
  .ant-select-multiple .ant-select-selection-item {
    background: var(--primary-light-1);
    border: 1px solid var(--primary-light-1);
    padding: 15px 6px;
    border-radius: 6px;
  }
  .ant-modal-header {
    padding-bottom: 3vh;
  }
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }
  .ant-radio-inner {
    width: 20px;
    height: 20px;

    ::after {
      transform: scale(0.7);
      background-color: var(--dark-border-ultramarine);
    }
  }
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const TeamsWrapper = styled.div`
  padding: 16px;
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  height: 100%;
  background-color: var(--white);
  padding: 30px 16px 50px 16px;

  .search_users {
    &:hover {
      border: none !important;
    }
  }
`;

export const TeamContent = styled.div`
  padding: 32px 64px 50px 64px;
  height: 100%;
`;

export const PermissionInfoModal = styled(AsnModal)`
  width: 628px !important;
  top: 190px !important;

  .ant-modal-content {
    padding: 32px !important;
  }
  .ant-modal-close-x {
    font-size: 12px;
    svg {
      path {
        fill: var(--dark-1);
      }
    }
  }
`;

export const ApplicantListSmall = styled(AsnModal)`
  .ant-modal-content {
    padding: 0;
    background: var(--background);
    border: 1px solid var(--dark-2);
    border-radius: 10px;
    padding: 42px 14px 16px 16px;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 0.5px solid var(--dark-border-ultramarine);
  }
  .ant-table-thead > tr > th {
    display: none;
  }
  .ant-table-tbody > tr > td {
    padding: 7px 8px !important;
  }
  .ant-modal-close-x {
    position: relative;
    bottom: 8px;
    left: 2px;

    svg > path {
      fill: var(--dark-1) !important;
    }
  }
  .ant-table-wrapper {
    max-height: 216px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 3px;
  }
`;
