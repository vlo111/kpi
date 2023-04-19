import { Tag } from 'antd';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { IfilterResult } from './applicantsTypes';

export const UseFilterTags: React.FC<IfilterResult> = ({
  filters,
  onFinish,
  form,
  setFilters
}) => {
  const closeFilter = (filter: string): void => {
    const newAs: any = _.omit(filters, [filter]);
    onFinish(newAs);
    form.setFieldsValue({
      [filter]: undefined
    });

    const isNotEmpty = Object.keys(newAs).some((name) => {
      if (
        newAs[name] !== undefined &&
        name !== 'limit' &&
        name !== 'offset' &&
        name !== 'search'
      ) {
        return true;
      }
      return false;
    });

    form.setFieldValue('clearAll', isNotEmpty);
  };

  const resetFilters = useCallback(() => {
    form.resetFields();
    setFilters({
      search: '',
      limit: 100,
      offset: 0,
      student: undefined,
      income: undefined,
      disability: undefined,
      gender: undefined,
      statuses: undefined
    });
    form.setFieldValue('clearAll', false);
  }, [form, filters]);

  return (
    <div>
      {Boolean(filters) && (
        <>
          {filters?.age !== undefined && (
            <Tag onClose={() => closeFilter('age')} closable>
              {`Age: ${filters?.age?.from} - ${filters?.age?.to}`}
            </Tag>
          )}
          {filters?.gender !== undefined && (
            <Tag onClose={() => closeFilter('gender')} closable>
              {`Gender:   ${filters?.gender}`}
            </Tag>
          )}
          {filters?.student !== undefined && (
            <Tag onClose={() => closeFilter('student')} closable>
              {`Student: ${filters?.student ? 'yes' : 'no'}`}
            </Tag>
          )}
          {filters?.statuses !== undefined && (
            <Tag onClose={() => closeFilter('statuses')} closable>
              {`Statuses: ${filters?.statuses}`}
            </Tag>
          )}
          {filters?.income !== undefined && (
            <Tag onClose={() => closeFilter('income')} closable>
              {`Income: ${filters?.income ? 'yes' : 'no'}`}
            </Tag>
          )}
          {filters?.disability !== undefined && (
            <Tag onClose={() => closeFilter('disability')} closable>
              {`Vulnerability: ${filters?.disability ? 'yes' : 'no'}`}
            </Tag>
          )}
          {filters?.regions !== undefined && (
            <Tag onClose={() => closeFilter('regions')} closable>
              {`Region: ${filters?.regions}`}
            </Tag>
          )}
          {Boolean(form.getFieldValue('clearAll')) && (
            <Tag
              onClick={() => {
                resetFilters();
              }}
              className="clearfilter"
            >
              {'Clean All'}
            </Tag>
          )}
        </>
      )}
    </div>
  );
};
