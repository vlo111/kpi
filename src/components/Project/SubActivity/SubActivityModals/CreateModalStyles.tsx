import styled from 'styled-components';
import { AsnModal } from '../../../Forms/Modal';

export const CreateSubActivity = styled(AsnModal)`
  top: 22px !important;
  #SubActivityForm {
    .duration_section
      > .ant-form-item-row
      > .ant-form-item-control
      > .ant-form-item-control-input
      > .ant-form-item-control-input-content:first-child {
      border: 1px solid var(--dark-border-ultramarine) !important;
      padding: 12px 130px !important;
      border-radius: 5px !important;
    }
  }
  .ant-modal-content {
    padding: 32px;
    padding-right: 0;
  }
  .ant-form-item {
    margin: 0 0 1.6vh;
  }
  .ant-form {
    overflow-y: scroll;
    padding-right: 2.5vw;
    max-height: 65vh;
    padding-bottom: 10vh;
  }
  #SubActivityForm_sub_activity_manager,
  .ant-select-selector {
    height: 44px !important;
    font-size: 16px;
    background: var(--white);
    border: 1px solid var(--dark-border-ultramarine) !important;
    border-radius: 5px !important;
  }
  .ant-input-number-group-addon {
    background: transparent;
  }
  .duration_section {
    .ant-form-item-control-input-content {
      display: flex;
      flex-direction: column;
    }
    .duration_header {
      color: var(--dark-2);

      .ant-input-number-wrapper {
        margin-bottom: 8px;
      }
      .ant-input-number-wrapper > div:first-child {
        width: 68%;
        border-radius: 10px 0 0 10px;
      }
      .ant-input-number-wrapper > div:last-child {
        border-radius: 0 10px 10px 0;
      }
    }
    .ant-input-number,
    .ant-input-number-group-addon {
      border: 1px solid var(--dark-border-ultramarine);
      height: 44px;
      border-radius: 0 10px 10px 0;
    }
    .ant-input-number-focused {
      box-shadow: none;
    }
    .ant-input-number {
      border-right: none;
      border-left: none;
    }
    .ant-input-number-input-wrap,
    .ant-input-number-input {
      height: 100%;
    }
    .ant-input-number-handler-wrap {
      width: 18px;
      svg > path {
        fill: var(--dark-border-ultramarine);
      }
    }
    .skills_item {
      border-radius: 6px 0 0 6px;
      .ant-input-number-wrapper > div:last-child {
        border-radius: 0 6px 6px 0;
        border-left: none;
      }
      .ant-input-number,
      .ant-input-number-group-addon {
        border: 1px solid var(--light-border-gray);
        height: 32px;
        border-radius: 6px 0 0 6px;
      }
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: var(--dark-border-ultramarine);
      border-color: var(--dark-border-ultramarine);
    }
    .ant-checkbox-inner {
      border: 1px solid var(--dark-border-ultramarine);
    }
    .skills {
      color: var(--dark-2);
    }
    .skills > div:last-child {
      width: 49%;
    }
    .skills > div:first-child {
      width: 100%;
    }
  }
  .upload_section {
    height: inherit !important;
    .ant-form-item-control {
      padding: 16px 24px;
      font-size: 16px;
      border: 1px solid var(--dark-border-ultramarine);
      border-radius: 5px;
      display: flex;
      justify-content: center;
    }
    .ant-upload-drag {
      &:hover {
        border: 1px dashed var(--dark-border-ultramarine) !important;
      }
      background: transparent;
      border: 1px dashed var(--dark-border-ultramarine);
      border-radius: 4px;
    }
  }
  .ant-upload-list {
    max-height: 7vh;
    overflow-y: scroll;
  }
  .ant-select-selector {
    align-items: center;
  }
  .ant-input-number-disabled {
    background-color: transparent;
  }
`;
