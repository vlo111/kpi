import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  INotEnrolledPWD,
  INotEnrolledPWDProps
} from '../../../../types/api/dashboard';

const NotEnrolledPWD: React.FC<INotEnrolledPWDProps> = ({
  pwdNotEnrolled
}) => {
  const [data, setData] = useState<INotEnrolledPWD[]>([]);

  useEffect(() => {
    if (pwdNotEnrolled !== undefined) {
      setData(pwdNotEnrolled);
    }
  }, [pwdNotEnrolled]);

  const config: ColumnConfig = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    isRange: true,
    renderer: 'svg',
    padding: [45, 30, 95],
    color: ({ type }): any => {
      if (type === 'Submitted Applicants') {
        return '#EDF0F4';
      } else if (type === 'PWDs') {
        return '#688EA3';
      } else if (type === 'Submitted') {
        return '#688EA3';
      } else if (type === 'Not Enrolled PWDs') {
        return '#F6976D';
      }
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
    <CardContainer width={'clamp(200px, 41.5vw, 100%)'}>
      <ChartTitleContainer>
        PWD submitted applicants and Not Enrolled PWD learners
      </ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default NotEnrolledPWD;
