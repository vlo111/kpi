import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const AgeDistribution: React.FC<any> = ({ ageStatistics }) => {
  const [data, setData] = useState<any>([]);

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
    padding: [30, 30, 80],
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
