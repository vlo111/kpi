import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  IRegionBreakdown,
  IRegionBreakdownProps
} from '../../../../types/api/dashboard';

const RegionBreakdown: React.FC<IRegionBreakdownProps> = ({
  regionStatistics
}) => {
  const [data, setData] = useState<IRegionBreakdown[]>([]);

  useEffect(() => {
    setData(regionStatistics);
  }, [regionStatistics]);

  const config: ColumnConfig = {
    data,
    autoFit: true,
    isRange: true,
    isGroup: true,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    renderer: 'svg',
    padding: [45, 20, 95, 30],
    color: ['#F6976D', '#68A395'],
    dodgePadding: 0.1,
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
    <CardContainer width={'clamp(400px, 84vw, 100%)'}>
      <ChartTitleContainer>Region breakdown chart</ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default RegionBreakdown;
