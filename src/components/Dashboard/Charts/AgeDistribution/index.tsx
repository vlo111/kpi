import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  IAgeDistribution,
  IAgeDistributionProps
} from '../../../../types/api/dashboard';

const AgeDistribution: React.FC<IAgeDistributionProps> = ({
  ageStatistics
}) => {
  const [data, setData] = useState<IAgeDistribution[]>([]);

  useEffect(() => {
    if (ageStatistics !== undefined) {
      setData(ageStatistics);
    }
  }, [ageStatistics]);

  const config: ColumnConfig = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    isRange: true,
    renderer: 'svg',
    padding: [45, 30, 95],
    color: ['#F6976D', '#68A395'],
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
    <CardContainer width={'clamp(400px, 52vw, 100%)'}>
      <ChartTitleContainer>
        Age distribution among trained applicants
      </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default AgeDistribution;
