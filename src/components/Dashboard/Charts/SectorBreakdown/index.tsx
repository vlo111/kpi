import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  ISectorBreakdown,
  ISectorBreakdownProps
} from '../../../../types/api/dashboard';

const SectorBreakdown: React.FC<ISectorBreakdownProps> = ({
  sectorStatistics
}) => {
  const [data, setData] = useState<ISectorBreakdown[]>([]);

  useEffect(() => {
    setData(sectorStatistics);
  }, [sectorStatistics]);

  const config: ColumnConfig = {
    data,
    autoFit: true,
    isRange: true,
    isGroup: true,
    xField: 'name',
    yField: 'percent',
    seriesField: 'type',
    color: ['#F3C262', '#68A395'],
    dodgePadding: 0,
    renderer: 'svg',
    padding: [45, 30, 95],
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
    <CardContainer width={'clamp(400px, 48vw, 100%)'}>
      <ChartTitleContainer>
        Applicants by course sector breakdown chart
      </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default SectorBreakdown;
