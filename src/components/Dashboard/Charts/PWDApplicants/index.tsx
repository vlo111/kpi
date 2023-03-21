import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const PWDApplicants: React.FC<any> = ({ pwdStatistics }) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (pwdStatistics !== undefined) {
      setData(pwdStatistics);
    }
  }, [pwdStatistics]);

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
    <CardContainer width={'clamp(250px, 31vw, 100%)'}>
      <ChartTitleContainer>
        PWD submitted applicants and trained PWD learners{' '}
      </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default PWDApplicants;
