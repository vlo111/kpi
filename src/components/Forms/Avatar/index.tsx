import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const AntAvatar = styled(Avatar)`
  background-color: var( --secondary-light-amber);
  .ant-avatar-string{
   font-size: ${props => props.size === 128 ? 'var(--large-hedline-font-size)' : ''};
  }
`;
const AsnAvatar: React.FC<{ letter: string, size?: any }> = ({ letter, size }) => {
  return (
       <AntAvatar size={size}>
        {letter}
       </AntAvatar>
  );
};

export default AsnAvatar;
