import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  IDroppedNotEnrolled,
  IDroppedNotEnrolledProps
} from '../../../../types/api/dashboard';

const DroppedNotEnrolled: React.FC<IDroppedNotEnrolledProps> = ({
  notEnrolledStatistics
}) => {
  const [data, setData] = useState<IDroppedNotEnrolled[]>([]);

  useEffect(() => {
    if (notEnrolledStatistics !== undefined) {
      setData(notEnrolledStatistics);
    }
  }, [notEnrolledStatistics]);

  const config: PieConfig = {
    data,
    angleField: 'percent',
    colorField: 'type',
    renderer: 'svg',
    radius: 1,
    innerRadius: 0.8,
    padding: [20, 0, 75],
    color: ['#688EA3', '#F3C262'],
    legend: {
      position: 'left-bottom',
      layout: 'vertical',
      offsetY: -80,
      offsetX: 0
    },
    label: {
      type: 'inner',
      offset: '-50%',
      content: '',
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
        // content: 'Dropout rate'
        customHtml: (container, view, datum, data: any) => {
          // const { width } = container.getBoundingClientRect();
          const value: number = data[0]?.percent;
          const text = 'Dropout rate';
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          return `<div><div style="font-size:20px;font-weight: 400;line-height:20px;">${text}</div> <div style="font-weight: 400;font-size:30px;line-height:30px;">${value}</div> </div>`;
        }
      }
    }
  };

  return (
    <CardContainer width={'clamp(200px, 41.5vw, 100%)'}>
      <ChartTitleContainer>
        Learners dropped out before completion
      </ChartTitleContainer>
      <Pie {...config} />
    </CardContainer>
  );
};

export default DroppedNotEnrolled;
