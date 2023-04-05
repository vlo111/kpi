import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
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

  const config: PieConfig = {
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.7,
    appendPadding: 10,
    padding: [0, 0, 75, 20],
    renderer: 'svg',
    color: ['#FBBC04', '#68A395', '#F6976D'],
    legend: {
      position: 'left-bottom',
      layout: 'vertical',
      offsetY: -70,
      itemWidth: 600
    },
    label: {
      type: 'inner',
      offset: '-50%',
      content: '',
      style: {
        textAlign: 'center',
        fontSize: 14
      }
    },
    interactions: [
      {
        type: 'element-selected'
      },
      {
        type: 'element-active'
      }
    ],
    statistic: {
      title: {
        style: {
          color: '#263238',
          fontSize: '20px',
          lineHeight: '20px'
        },
        content: 'Completed courses'
      }
    }
  };

  return (
    <CardContainer width={'clamp(250px, 35vw, 100%)'}>
      <ChartTitleContainer>
      Completed the course learners PWD
      </ChartTitleContainer>
      <Pie {...config} />
    </CardContainer>
  );
};

export default PWDApplicants;
