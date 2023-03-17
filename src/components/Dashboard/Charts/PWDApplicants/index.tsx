import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/plots';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const PWDApplicants: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        name: 'All',
        type: 'Submitted Applicants',
        percent: 100,
        count: 19
      },
      {
        name: 'All',
        type: 'PWDs',
        percent: 3,
        count: 12
      },
      {
        name: 'PWDs',
        type: 'Submitted',
        percent: 15.79,
        count: 12
      },
      {
        name: 'PWDs',
        type: 'Trained PWDs',
        percent: 10.53,
        count: 9
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
    padding: [30, 30, 80],
    color: ({ type }) => {
      if (type === 'Submitted Applicants') {
        return '#EDF0F4';
      } else if (type === 'PWDs' || type === 'Submitted') {
        return '#688EA3';
      }
      return '#F3C262';
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
    <CardContainer width={'clamp(250px, 28vw, 100%)'}>
      <ChartTitleContainer>PWD submitted applicants and trained PWD learners </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default PWDApplicants;
