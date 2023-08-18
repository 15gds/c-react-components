import React, { FC, memo } from 'react';
import DynamicForms from '../dynamic-forms';
import { DynamicFormsProps } from '../dynamic-forms/types';

const DynamicFilter: FC<DynamicFormsProps> = memo((props) => {
  const { formItemOptions, onFilterSearch, onFilterReset, ...other } = props;
  return (
    <DynamicForms
      formItemOptions={formItemOptions}
      layout="inline"
      onFinish={onFilterSearch}
      onReset={onFilterReset}
      {...other}
    />
  );
});

export default DynamicFilter;
