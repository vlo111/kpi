import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/plots';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

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
    renderer: 'svg',
    radius: 1,
    innerRadius: 0.8,
    padding: 46,
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
          color: '#263238',
          fontSize: '20px',
          lineHeight: '14px'
        },
        content: 'Dropout rate'
      }
    }
  };

  return (
  <CardContainer width={'clamp(200px, 45vw, 100%)'}>
    <ChartTitleContainer>Learners dropped out before completion</ChartTitleContainer>
      <Pie {...config}/>
  </CardContainer>
  );
};

export default DroppedNotEnrolled;
