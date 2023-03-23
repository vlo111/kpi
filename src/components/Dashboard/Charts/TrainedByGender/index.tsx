import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  ITrainedByGender,
  ITrainedByGenderProps
} from '../../../../types/api/dashboard';

const TrainedByGender: React.FC<ITrainedByGenderProps> = ({
  genderStatistics
}) => {
  const [data, setData] = useState<ITrainedByGender[]>([]);

  useEffect(() => {
    if (genderStatistics !== undefined) {
      setData(genderStatistics);
    }
  }, [genderStatistics]);

  const config: ColumnConfig = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    isRange: true,
    renderer: 'svg',
    padding: [45, 30, 95],
    color: ({ type }): any => {
      if (type === 'Submitted male') {
        return 'rgba(246, 151, 109, 0.7)';
      } else if (type === 'Trained male') {
        return '#F6976D';
      } else if (type === 'Submitted female') {
        return 'rgba(104, 142, 163, 0.7)';
      } else if (type === 'Trained female') {
        return '#688EA3';
      }
    },
    minColumnWidth: 20,
    maxColumnWidth: 40,
    columnStyle: {
      radius: [4, 4, 0, 0]
    },
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position'
        },
        {
          type: 'interval-hide-overlap'
        },
        {
          type: 'adjust-color'
        }
      ]
    }
  };

  return (
    <CardContainer width={'clamp(250px, 31vw, 100%)'}>
      <ChartTitleContainer>Trained applicants by gender </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default TrainedByGender;
