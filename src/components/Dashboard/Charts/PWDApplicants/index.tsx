import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  ConfigColorType,
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

  const color: ConfigColorType = ({ name }) => {
    if (name === 'Trained PWD') {
      return '#68A395';
    } else if (name === 'Dropped PWD') {
      return '#FBBC04';
    } else {
      return '#F6976D';
    }
  };

  const config: PieConfig = {
    data,
    angleField: 'count',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.7,
    appendPadding: 10,
    padding: [0, 0, 75, 20],
    renderer: 'svg',
    color,
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
          lineHeight: '20px',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        content: 'Submitted\napplicants\nPWD'
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
