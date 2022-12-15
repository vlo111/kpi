import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { IAvatarTypes } from '../../../types/global';

const AntAvatar = styled(Avatar)<{ src: string | undefined | null }>`
  background-color: ${(props) =>
    !((props.src ?? '').length !== 0) ? 'var( --secondary-light-amber)' : 'none'};
  .ant-avatar-string {
    font-size: ${(props) =>
      props.size === 128 ? 'var(--large-hedline-font-size)' : ''};
  }
`;
const AsnAvatar: React.FC<IAvatarTypes> = ({ letter, size, src }) => {
  return (
    <AntAvatar size={size} src={src}>
      {letter}
    </AntAvatar>
  );
};

export default AsnAvatar;
