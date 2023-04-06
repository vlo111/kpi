import React, { useState, useEffect } from 'react';
import { Column, ColumnConfig } from '@ant-design/charts';
import { CardContainer, ChartTitleContainer } from '../../dashboardStyle';
import {
  ConfigColorType,
  ITrainedByGender,
  ITrainedByGenderProps
} from '../../../../types/api/dashboard';

const TrainedByGender: React.FC<ITrainedByGenderProps> = ({
  genderStatistics
}) => {
  const [data, setData] = useState<ITrainedByGender[]>([]);

  useEffect(() => {
    if (genderStatistics !== undefined) {
      setData(genderStatistics);
    }
  }, [genderStatistics]);

  const color: ConfigColorType = ({ type }) => {
    if (type === 'Submitted Male') {
      return 'rgba(246, 151, 109, 0.7)';
    } else if (type === 'Trained Male') {
      return '#F6976D';
    } else if (type === 'Submitted Female') {
      return 'rgba(104, 142, 163, 0.7)';
    } else {
      return '#688EA3';
    }
  };

  const config: ColumnConfig = {
    data,
    xField: 'name',
    yField: 'count',
    seriesField: 'type',
    isRange: true,
    renderer: 'svg',
    padding: [45, 30, 95],
    color,
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
    <CardContainer width={'clamp(250px, 31vw, 100%)'}>
      <ChartTitleContainer>Applicants by gender</ChartTitleContainer>
      <Column {...config} />
    </CardContainer>
  );
};

export default TrainedByGender;
