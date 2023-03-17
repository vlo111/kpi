import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const TrainedByGender: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        type: 'Submitted',
        name: 'Male',
        percent: 88.73,
        count: 244
      },
      {
        type: 'Submitted',
        name: 'Female',
        percent: 11.27,
        count: 175
      },
      {
        type: 'Trained',
        name: 'Male',
        percent: 12.36,
        count: 98
      },
      {
        type: 'Trained',
        name: 'Female',
        percent: 0.36,
        count: 85
      }
    ]);
  }, []);

  const config: ColumnConfig = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'name',
    isRange: true,
    renderer: 'svg',
    padding: [30, 30, 80],
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
  <CardContainer width={'clamp(250px, 28vw, 100%)'}>
    <ChartTitleContainer>Trained applicants by gender </ChartTitleContainer>
      <Column {...config} />
  </CardContainer>
  );
};

export default TrainedByGender;
