import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pie, PieConfig } from '@ant-design/plots';

const CardContainer = styled.div`
  width: calc(100vw - 300px);
  height: 400px;

`;

const DroppedNotEnrolled: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        type: 'Not-enrolled',
        percent: 28.57,
        count: 3
      },
      {
        type: 'Dropped',
        percent: 71.43,
        count: 7
      }
    ]);
  }, []);

  const config: PieConfig = {
    data,
    angleField: 'count',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.8,
    color: ['#688EA3', '#F3C262'],
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14
      }
    },
    interactions: [
      {
        type: 'element-selected'
      },
      {
        type: 'element-active'
      }
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        content: 'DroppedNotEnrolled'
      }
    }
  };

  return (
  <CardContainer>
      <Pie {...config}/>
  </CardContainer>
  );
};

export default DroppedNotEnrolled;
