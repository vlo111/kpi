import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/plots';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const CompletedApplicants: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        name: 'Dropped',
        status_all_applicants: 1,
        status_all_applicants_percent: 0.36
      },
      {
        name: 'Not Enrolled',
        status_all_applicants: 10,
        status_all_applicants_percent: 3.64
      },
      {
        name: 'Trained',
        status_all_applicants: 2,
        status_all_applicants_percent: 0.73
      }
    ]);
  }, []);

  const config: PieConfig = {
    data,
    angleField: 'status_all_applicants',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.7,
    appendPadding: 10,
    padding: [0, 30, 50],
    renderer: 'svg',
    color: ['#FBBC04', '#68A395', '#F6976D'],
    legend: {
      position: 'left-bottom',
      layout: 'vertical',
      offsetY: -50,
      itemWidth: 600
    },
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
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
          lineHeight: '14px'
        },
        formatter: () => 'Completed courses'
      }
    }
  };

  return (
    <CardContainer width={'clamp(250px, 28vw, 100%)'}>
      <ChartTitleContainer>Enrollment chart for active courses</ChartTitleContainer>
      <Pie {...config}/>
  </CardContainer>
  );
};

export default CompletedApplicants;
