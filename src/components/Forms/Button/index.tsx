import styled from 'styled-components';
import { Button } from 'antd';

export const AsnButton = styled(Button)`
  &.default {
    color: var(--dark-border-ultramarine);
    border: 1px solid var(--dark-border-ultramarine);
    background: transparent;
    font-weight: var(--font-normal);
    padding: 5px 30px;
    font-size: var(--base-font-size);
    height: 44px;
    border-radius: 5px;

    &:hover {
      background: var(--primary-light-1);
    }
  }

  &.primary {
    color: var(--white);
    border: none;
    background: var(--dark-border-ultramarine);
    font-weight: var(--font-bold);
    padding: 10px 32px;
    font-size: var(--base-font-size);
    border-radius: 5px;
    height: 44px;

    &:hover {
      background: var(--primary-light-1);
      color: var(--dark-border-ultramarine);
    }
  }

  &.ant-btn-primary[disabled]{
    background: var(--primary-light-3);
    border: 1px solid var(--dark-5);
    color: var(--dark-5);
  }

  &.transparent {
    border: 1px solid var(--dark-5) !important;
    color: var(--dark-2) !important;
    height: 44px;

    span {
      font-size: var(--base-font-size) !important;
      font-weight: var(--font-normal) !important;
      margin-left: 2px;
    }
  }
  &.draft{
      color: var(--dark-border-ultramarine);
      border: none;
      background: var(--primary-light-1);
      font-weight: var(--font-bold);
      padding: 8px 32px;
      font-size: var(--base-font-size);
      border-radius: 5px;
      height: 38px;
    }
`;
