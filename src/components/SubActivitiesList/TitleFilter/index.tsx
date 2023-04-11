import React, { useEffect, useState } from 'react';
// import { Space } from 'antd';
import styled from 'styled-components';
import { AutoComplete } from 'antd';
// import { AsnButton } from '../../Forms/Button';

const AsnAutoComplete = styled(AutoComplete)`
  width: 100% !important;
  .ant-select-selector {
    border-radius: 10px !important;
    box-shadow: inset 3px 0px 6px rgba(42, 85, 120, 0.16);
    border: none !important;
    :hover {
      border: none !important;
    }
    :focus {
      border: none !important;
    }
  }
`;

export const getColumnSearchProps = (
  dataIndex: string,
  columnsData: any
): any => {
  const [value, setValue] = useState<any>('');
  const [option, setOption] = useState<any>([]);
  //   const [options, setOptions] = useState<Array<{ value: string }>>([]);
  //   const [anotherOptions, setAnotherOptions] = useState<
  //   Array<{ value: string }>
  //   >([]);

  useEffect(() => {
    const autocompleteOptions = columnsData?.map((item: any) => {
      return { value: item.title };
    });
    console.log(autocompleteOptions, 'autocompleteOptions');

    setOption(autocompleteOptions);
  }, [columnsData]);

  const onSearch = (text: string): any => {
    console.log(text, 'onSearch');
    setValue(text);
    const optionData = option?.filter((item: any) =>
      item.value.toLowerCase().includes(value.toLowerCase())
    );
    setOption([...optionData]);
  };

  const onSelect = (data: any): any => {
    console.log('onSelect', data);
    // setValue('onChangedata');
  };

  const onChange = (data: any): any => {
    console.log(data, 'onChange>>>>>>>>>>>>>');
    setValue(data);
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }: any) => (
      <div
        style={{ padding: 8, width: '350px', height: '200px' }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <AsnAutoComplete
          value={value}
          options={option}
          placeholder={`Search ${dataIndex}`}
          onSelect={onSelect}
          onSearch={onSearch}
          onChange={onChange}
          getPopupContainer={(trigger) => trigger.parentNode}
        />
      </div>
    )
  };
};
