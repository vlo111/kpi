import React, { useState, useEffect } from 'react';
import { RingProgress, RingProgressConfig } from '@ant-design/plots';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';

const TrainedApplicants: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData({
      all_applicants_count_in_done_courses: 5,
      all_trained_applicants_count_percent: 20,
      all_enrolled_applicants_count_percent: 80
    });
  }, []);

  const config: RingProgressConfig = {
    height: 400,
    width: 400,
    autoFit: false,
    percent: data.all_enrolled_applicants_count_percent / 100,
    color: '#68A395',
    renderer: 'canvas',
    padding: 46,
    innerRadius: 0.85,
    radius: 0.9,
    statistic: {
      title: {
        style: {
          color: '#263238',
          fontSize: '20px',
          lineHeight: '14px'
        },
        formatter: () => 'Completion rate'
      }
    }
  };

  return (
  <CardContainer width={'clamp(200px, 45vw, 100%)'}>
    <ChartTitleContainer>Learners completed a course</ChartTitleContainer>
      <RingProgress {...config} />
  </CardContainer>
  );
};

export default TrainedApplicants;
