import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pie, PieConfig } from '@ant-design/plots';

const CardContainer = styled.div`
  width: calc(100vw - 300px);
  height: 400px;
`;

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
    appendPadding: 10,
    data,
    angleField: 'status_all_applicants',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.6,
    color: ['#FBBC04', '#68A395', '#F6976D'],
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
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        content: 'CompletedApplicants'
      }
    }
  };

  return (
  <CardContainer>
      <Pie {...config}/>
  </CardContainer>
  );
};

export default CompletedApplicants;
