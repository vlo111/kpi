import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RingProgress, RingProgressConfig } from '@ant-design/plots';

const CardContainer = styled.div`
  width: calc(100vw - 300px);
  height: 400px;

  @media (max-width: 991px) {
    width: calc(100vw - 200px);
  }
`;

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
    innerRadius: 0.85,
    radius: 0.9,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px'
        },
        formatter: () => '进度'
      }
    }
  };

  return (
  <CardContainer>
      <RingProgress {...config} />
  </CardContainer>
  );
};

export default TrainedApplicants;
