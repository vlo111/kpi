import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  ITrainedApplicants,
  ITrainedApplicantsProps
} from '../../../../types/api/dashboard';

const TrainedApplicants: React.FC<ITrainedApplicantsProps> = ({
  trainedStatistics
}) => {
  const [data, setData] = useState<ITrainedApplicants[]>([]);

  useEffect(() => {
    if (trainedStatistics !== undefined) {
      setData(trainedStatistics);
    }
  }, [trainedStatistics]);

  const config: PieConfig = {
    data,
    angleField: 'percent',
    colorField: 'type',
    renderer: 'svg',
    radius: 1,
    innerRadius: 0.8,
    padding: [20, 0, 75],
    color: ['#EDF0F4', '#68A395'],
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
        customHtml: (container, view, datum, data: any) => {
          const value: number = data[0]?.percent;
          const text = 'Completion rate';
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

export default TrainedApplicants;
