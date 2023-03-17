import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const RegionBreakdown: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        name: 'Արագածոտն',
        type: 'Submitted applicants',
        percent: 11.76,
        count: 2
      },
      {
        name: 'Արագածոտն',
        type: 'Trained applicants',
        percent: 1,
        count: 2
      },
      {
        name: 'Արարատ',
        type: 'Submitted applicants',
        percent: 11.76,
        count: 2
      },
      {
        name: 'Արարատ',
        type: 'Trained applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Արմավիր',
        type: 'Submitted applicants',
        percent: 17.65,
        count: 3
      },
      {
        name: 'Արմավիր',
        type: 'Trained applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Գեղարքունիք',
        type: 'Submitted applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Գեղարքունիք',
        type: 'Trained applicants',
        percent: 5,
        count: 0
      },
      {
        name: 'Երևան',
        type: 'Submitted applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Երևան',
        type: 'Trained applicants',
        percent: 6,
        count: 0
      },
      {
        name: 'Լոռի',
        type: 'Submitted applicants',
        percent: 11.76,
        count: 2
      },
      {
        name: 'Լոռի',
        type: 'Trained applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Կոտայք',
        type: 'Submitted applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Կոտայք',
        type: 'Trained applicants',
        percent: 7,
        count: 0
      },
      {
        name: 'Շիրակ',
        type: 'Submitted applicants',
        percent: 11.76,
        count: 2
      },
      {
        name: 'Շիրակ',
        type: 'Trained applicants',
        percent: 8,
        count: 0
      },
      {
        name: 'Վայոց Ձոր',
        type: 'Submitted applicants',
        percent: 5.88,
        count: 1
      },
      {
        name: 'Վայոց Ձոր',
        type: 'Trained applicants',
        percent: 9,
        count: 0
      },
      {
        name: 'Տավուշ',
        type: 'Submitted applicants',
        percent: 11.76,
        count: 2
      },
      {
        name: 'Տավուշ',
        type: 'Trained applicants',
        percent: 9,
        count: 0
      }
    ]);
  }, []);

  const config: ColumnConfig = {
    data,
    autoFit: true,
    isRange: true,
    isGroup: true,
    xField: 'name',
    yField: 'percent',
    seriesField: 'type',
    renderer: 'svg',
    padding: [30, 20, 80],
    color: ['#F6976D', '#68A395'],
    dodgePadding: 0,
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
  <CardContainer width={'clamp(400px, 82vw, 100%)'}>
      <ChartTitleContainer>Region breakdown chart</ChartTitleContainer>
      <Column {...config} />
  </CardContainer>
  );
};

export default RegionBreakdown;
