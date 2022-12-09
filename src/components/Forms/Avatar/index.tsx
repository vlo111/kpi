import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const AntAvatar = styled(Avatar)`
  background-color:${props => props.src === '' || props.src === null || props.src === undefined ? 'var( --secondary-light-amber)' : 'none'};
  .ant-avatar-string{
   font-size: ${props => props.size === 128 ? 'var(--large-hedline-font-size)' : ''};
  }
`;
const AsnAvatar: React.FC<{ letter: string, size?: any, src?: string | undefined | null }> = ({ letter, size, src }) => {
  return (
       <AntAvatar size={size} src={src}>
        {letter}
       </AntAvatar>
  );
};

export default AsnAvatar;
