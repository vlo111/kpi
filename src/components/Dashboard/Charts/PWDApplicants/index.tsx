import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Column, ColumnConfig } from '@ant-design/plots';

const CardContainer = styled.div`
  width: calc(100vw - 300px);
  height: 400px;

  @media (max-width: 991px) {
    width: calc(100vw - 200px);
  }
`;

const PWDApplicants: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setData([
      {
        type: 'PWDs',
        percent: 16.67
      },
      {
        type: 'Trained PWDs',
        percent: 11.11
      }
    ]);
  }, []);
  /// ///////////////////////////////////////////////////////////////

  const config: ColumnConfig = {
    data,
    autoFit: true,
    isRange: true,
    isGroup: true,
    xField: 'name',
    yField: 'percent',
    seriesField: 'type',
    color: ['#F6976D', '#68A395'],
    dodgePadding: 0,
    minColumnWidth: 20,
    maxColumnWidth: 40,
    columnStyle: {
      radius: [4, 4, 0, 0]
    },
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position'
        },
        {
          type: 'interval-hide-overlap'
        },
        {
          type: 'adjust-color'
        }
      ]
    }
  };

  return (
  <CardContainer>
      <Column {...config} />
  </CardContainer>
  );
};

export default PWDApplicants;
