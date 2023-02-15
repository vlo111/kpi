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
    console.log(filters);
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
      limit: 10,
      offset: 0
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
            <Tag closable onClose={() => closeFilter('student')}>
              {`Student:${filters?.student}`}
            </Tag>
          )}
          {filters?.statuses !== undefined && (
            <Tag closable onClose={() => closeFilter('status')}>
              {`Status:${filters?.statuses}`}
            </Tag>
          )}
          {filters?.income !== undefined && (
            <Tag closable onClose={() => closeFilter('income')}>
              {`Paid job:${filters?.income}`}
            </Tag>
          )}
          {filters?.disability !== undefined && (
            <Tag closable onClose={() => closeFilter('disability')}>
              {`Vulnerability:${filters?.disability}`}
            </Tag>
          )}
          {filters?.regions !== undefined && (
            <Tag closable onClose={() => closeFilter('regions')}>
              {`Region:${filters?.regions}`}
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
