import React from 'react';
import { AutoComplete } from 'antd';
import styled from 'styled-components';
import { Onchange } from '../../../../../../types/global';

const Container = styled.div`
.ant-select:not(.ant-select-customize-input) .ant-select-selector{
  border: none !important;
}
.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector{
  box-shadow: none;
}
`;
// const mockVal = (str: string, repeat = 1): object => ({
//   value: str.repeat(repeat)
// })

export const AssingnesSearch: React.FC = () => {
  // const [options, setOptions] = useState<Array<{ value: string }>>([])
  // const onSearch = (searchText: string)=> {
  //   // setOptions(
  //   //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
  //   // )
  // }

  const onSelect: Onchange = (data) => {
    console.log('onSelect', data);
  };

  return (
    <Container>
      <AutoComplete
        // options={options}
        style={{ width: '100% ', borderBottom: '1px solid var(--dark-4)' }}
        onSelect={onSelect}
        // onSearch={onSearch}
        placeholder="Search"
      />
    </Container>
  );
};
