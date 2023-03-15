import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Rose, RoseConfig } from '@ant-design/plots';

const CardContainer = styled.div`
  width: calc(100vw - 689px);
  height: 400px;
`;

const ActiveCourses: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        name: 'APPLICANT',
        status_all_applicants: 2,
        status_all_applicants_percent: 11.11
      },
      {
        name: 'DROPPED',
        status_all_applicants: 5,
        status_all_applicants_percent: 27.78
      },
      {
        name: 'NOT_ENROLLED',
        status_all_applicants: 2,
        status_all_applicants_percent: 11.11
      },
      {
        name: 'PARTICIPANT',
        status_all_applicants: 1,
        status_all_applicants_percent: 5.56
      },
      {
        name: 'POST_ASSESSMENT',
        status_all_applicants: 1,
        status_all_applicants_percent: 5.56
      },
      {
        name: 'PRE_ASSESSMENT',
        status_all_applicants: 2,
        status_all_applicants_percent: 11.11
      },
      {
        name: 'SELECTION',
        status_all_applicants: 1,
        status_all_applicants_percent: 5.56
      },
      {
        name: 'TRAINED',
        status_all_applicants: 4,
        status_all_applicants_percent: 22.22
      }
    ]);
  }, []);

  const config: RoseConfig = {
    data,
    xField: 'name',
    yField: 'status_all_applicants',
    seriesField: 'name',
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
    <CardContainer>
      <Rose {...config} />
    </CardContainer>
  );
};

export default ActiveCourses;
