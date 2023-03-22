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
    seriesField: 'name',
    isRange: true,
    renderer: 'svg',
    padding: [45, 30, 95],
    color: ['#F6976D', '#688EA3'],
    minColumnWidth: 20,
    maxColumnWidth: 40,
    columnBackground: {
      style: {
        fillOpacity: 0.3
      }
    },
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
