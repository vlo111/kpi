import React, { useState, useEffect } from 'react';
import { Datum, Pie, PieConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  ICompletedApplicants,
  ICompletedApplicantsProps
} from '../../../../types/api/dashboard';

const CompletedApplicants: React.FC<ICompletedApplicantsProps> = ({
  completedStatistics
}) => {
  const [data, setData] = useState<ICompletedApplicants[]>([]);

  useEffect(() => {
    if (completedStatistics !== undefined) {
      setData(completedStatistics);
    }
  }, [completedStatistics]);

  const color: string | string[] | ((datum: Datum, defaultColor?: string) => string) = ({ name }) => {
    if (name === 'Trained') {
      return '#68A395';
    } else if (name === 'Dropped') {
      return '#FBBC04';
    } else {
      return '#F6976D';
    }
  };

  const config: PieConfig = {
    data,
    angleField: 'status_all_applicants',
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
        content: 'Submitted\nlearners'
      }
    }
  };

  return (
    <CardContainer width={'clamp(250px, 31vw, 100%)'}>
      <ChartTitleContainer>
        Enrollment chart for completed courses
      </ChartTitleContainer>
      <Pie {...config} />
    </CardContainer>
  );
};

export default CompletedApplicants;
