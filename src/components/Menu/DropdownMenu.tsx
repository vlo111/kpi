import { Menu } from 'antd';
import styled from 'styled-components';

const DropdownMenu = styled(Menu)`
  .ant-dropdown-menu-item:hover {
    color: #0b847f;
  }
  .ant-dropdown-menu-item{
    padding: 5px 0 !important;
  }
`;

export default DropdownMenu;
