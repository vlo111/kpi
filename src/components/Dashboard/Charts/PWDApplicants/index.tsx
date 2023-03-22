import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  IPWDApplicants,
  IPWDApplicantsProps
} from '../../../../types/api/dashboard';

const PWDApplicants: React.FC<IPWDApplicantsProps> = ({ pwdStatistics }) => {
  const [data, setData] = useState<IPWDApplicants[]>([]);

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
    padding: [45, 30, 95],
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
      position: 'top',
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
    <CardContainer width={'clamp(250px, 35vw, 100%)'}>
      <ChartTitleContainer>
        PWD submitted applicants and trained PWD learners{' '}
      </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default PWDApplicants;
