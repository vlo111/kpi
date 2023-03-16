import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { CardContainer } from '../../dashboardStyle';

const AgeDistribution: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        name: '0-15',
        type: 'Submitted applicants',
        percent: 8.73,
        count: 24
      },
      {
        name: '0-15',
        type: 'Trained applicants',
        percent: 0.36,
        count: 6
      },
      {
        name: '16-21',
        type: 'Submitted applicants',
        percent: 18.55,
        count: 51
      },
      {
        name: '16-21',
        type: 'Trained applicants',
        percent: 0,
        count: 15
      },
      {
        name: '22-29',
        type: 'Submitted applicants',
        percent: 72.36,
        count: 199
      },
      {
        name: '22-29',
        type: 'Trained applicants',
        percent: 12.36,
        count: 34
      },
      {
        name: '30-36',
        type: 'Submitted applicants',
        percent: 0.36,
        count: 110
      },
      {
        name: '30-36',
        type: 'Trained applicants',
        percent: 0,
        count: 45
      }
    ]);
  }, []);

  const config: ColumnConfig = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    isRange: true,
    renderer: 'svg',
    padding: 46,
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
    <CardContainer width={'calc(100vw - 47vw)'}>
      <Column {...config} />
    </CardContainer>
  );
};

export default AgeDistribution;
