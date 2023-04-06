import React, { useState, useEffect } from 'react';
import { Rose, RoseConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  IActiveCourses,
  IActiveCoursesProps
} from '../../../../types/api/dashboard';

const ActiveCourses: React.FC<IActiveCoursesProps> = ({
  activeCoursesStatistics
}) => {
  const [data, setData] = useState<IActiveCourses[]>([]);

  useEffect(() => {
    if (activeCoursesStatistics !== undefined) {
      setData(activeCoursesStatistics);
    }
  }, [activeCoursesStatistics]);

  const config: RoseConfig = {
    data,
    xField: 'name',
    yField: 'status_all_applicants',
    seriesField: 'name',
    renderer: 'svg',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '',
      style: {
        textAlign: 'center',
        fontSize: 14
      }
    },
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
      <ChartTitleContainer>
        Enrollment chart for active courses
      </ChartTitleContainer>
      <Rose {...config} />
    </CardContainer>
  );
};

export default ActiveCourses;
