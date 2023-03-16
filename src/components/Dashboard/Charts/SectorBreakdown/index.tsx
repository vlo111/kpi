import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { CardContainer } from '../../dashboardStyle';

const SectorBreakdown: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([{
      name: 'Node js',
      type: 'Submitted applicants',
      percent: 90,
      count: 0
    },
    {
      name: 'Node js',
      type: 'Trained applicants',
      percent: 60,
      count: 0
    },
    {
      name: 'ReaCT',
      type: 'Submitted applicants',
      percent: 10.91,
      count: 30
    },
    {
      name: 'ReaCT',
      type: 'Trained applicants',
      percent: 70,
      count: 0
    },
    {
      name: 'Html Scss',
      type: 'Submitted applicants',
      percent: 50,
      count: 0
    },
    {
      name: 'Html Scss',
      type: 'Trained applicants',
      percent: 40,
      count: 0
    },
    {
      name: ';oi;o',
      type: 'Submitted applicants',
      percent: 46.55,
      count: 128
    },
    {
      name: ';oi;o',
      type: 'Trained applicants',
      percent: 30,
      count: 0
    },
    {
      name: 'hhh',
      type: 'Submitted applicants',
      percent: 20,
      count: 0
    },
    {
      name: 'hhh',
      type: 'Trained applicants',
      percent: 10,
      count: 0
    },
    {
      name: 'Js',
      type: 'Submitted applicants',
      percent: 65.45,
      count: 180
    },
    {
      name: 'Js',
      type: 'Trained applicants',
      percent: 12.73,
      count: 35
    }]);
  }, []);

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
    padding: 46,
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
  <CardContainer width={'calc(100vw - 15.3vw)'}>
      <Column {...config} />
  </CardContainer>
  );
};

export default SectorBreakdown;
