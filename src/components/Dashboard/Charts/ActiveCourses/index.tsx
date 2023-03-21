import React, { useState, useEffect } from 'react';
import { Rose, RoseConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const ActiveCourses: React.FC<any> = ({ activeCoursesStatistics }) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData(activeCoursesStatistics);
  }, [activeCoursesStatistics]);

  const config: RoseConfig = {
    data,
    xField: 'name',
    yField: 'status_all_applicants',
    seriesField: 'name',
    renderer: 'svg',
    radius: 1,
    color: [
      '#F6976D',
      '#688EA3',
      '#68A395',
      '#F3C262',
      '#A583BF',
      '#8B8B8B',
      '#48575F',
      '#A3687D'
    ],
    legend: {
      position: 'right-top'
    }
  };

  return (
    <CardContainer width={'clamp(400px, 52vw, 100%)'}>
      <ChartTitleContainer>Enrollment chart for active courses</ChartTitleContainer>
      <Rose {...config} />
    </CardContainer>
  );
};

export default ActiveCourses;
