import React, { useState } from 'react';
import { Tooltip, Typography, Row, Badge } from 'antd';
import styled from 'styled-components';

import { IResultAreasTitles } from '../../types/project';

const { Text } = Typography;

const AntRow = styled(Row)`
  padding: 8px 16px;
  width: 16vw;
`;

const ResultAreasTitles: React.FC<IResultAreasTitles> = ({ title, projectItems, index }) => {
  const [active, setActive] = useState<number>(1);
  const AntBadge = styled(Badge)`
    margin-right: 4px;
    .ant-badge-count {
      background: ${({ count }) =>
            count === active ? 'var(--white)' : 'var(--dark-6)'};
      color: var(--dark-border-ultramarine);
      box-shadow: 0 0 0 1px var(--dark-border-ultramarine);
      font-size: var(--font-size-semismall);
      border-radius: 100%;
    }
  `;
  return (
        <Tooltip
            title={title}
            color="var(--dark-6)"
            overlayInnerStyle={{
              color: 'var(--dark-border-ultramarine)',
              fontSize: 'var(  --base-font-size)'
            }}
        >
            <AntRow
                wrap={false}
                align="middle"
                onClick={() => setActive(+index + 1)}
                style={projectItems > 3 ? { width: '70px' } : {}}
            >
                <AntBadge count={+index + 1} />
                {projectItems <= 3 && (
                    <Text
                        ellipsis={true}
                        style={
                            active === +index + 1
                              ? { width: '85%', color: 'var(--dark-border-ultramarine)' }
                              : { width: '85%' }
                        }
                    >
                        {title}
                    </Text>
                )}
            </AntRow>
        </Tooltip>
  );
};

export default ResultAreasTitles;
