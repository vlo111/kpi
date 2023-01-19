import React from 'react';
import { AsnForm } from '../components/Forms/Form';
import { clearLocalStorage } from '../hooks/useLocalStorage';
import { TVoid } from '../types/global';
import { CollapseHeader, SetResultArea, SetTitleColor } from '../types/project';
import { AsnInput } from '../components/Forms/Input';
import _ from 'lodash';

/** Logout the user */
export const logOut: TVoid = () => {
  clearLocalStorage();
  window.location.reload();
};

export const noop: TVoid = () => { };

export const handleErrorMessage = (response: any): string => {
  return response?.data?.message;
};

export const HeaderElement: CollapseHeader = (key, name, index, placeholder, className) => (
  <div key={`${className}${key}`} onClick={(e) => e.stopPropagation()}>
    <AsnForm.Item name={name} rules={[{ required: true, min: 5, max: 256 }]}>
      <AsnInput prefix={index} placeholder={placeholder} />
    </AsnForm.Item>
  </div>
);

export const TollTipText: (
  ...items: string[]
) => React.ReactNode = (...items) => (
  <div>
    <p style={{ marginBottom: '1rem' }}>
      Must include at least one result area and at least one expected result
      measurement.
    </p>
    <ul
      style={{
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        marginLeft: '1rem'
      }}
    >
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  </div>
);

const setTitleColor: SetTitleColor = (element, color) => {
  const titleElement = element.firstChild as HTMLElement;

  const pathElement = element.lastChild?.firstChild as HTMLElement;

  titleElement.style.color = color;

  pathElement.style.fill = color;
};

export const validateResultArea: SetResultArea = (values) => {
  // @ts-expect-error
  const errorsIndex = [...new Set(values.errorFields.map((r) => r.name[1]))];

  const resultAreaElement: (id: string) => void = (id) => {
    const resultAreaElement = document.getElementById(
      `ans-title-${id}`
    ) as HTMLElement;

    setTitleColor(resultAreaElement, 'var(--error)');
  };

  const resultAreaElements: HTMLCollectionOf<HTMLElement> =
    document.getElementsByClassName(
      'result_area_title'
    ) as HTMLCollectionOf<HTMLElement>;

  if (!_.isEmpty(resultAreaElements)) {
    Array.from(resultAreaElements).forEach((element) => {
      setTitleColor(element, 'var(--dark-2)');
    });
  }

  errorsIndex.map((i: any) => resultAreaElement(i));
};
