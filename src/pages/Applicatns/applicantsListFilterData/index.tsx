/* eslint-disable react/react-in-jsx-scope */
import { SliderMarks } from 'antd/lib/slider';

// Region data
export const optionsRegion = [
  { label: 'Yerevan', value: 'Yerevan/Երևան,' },
  { label: 'Aragatsotn', value: 'Aragatsotn/Արագածոտն,' },
  { label: 'Ararat', value: 'Ararat/Արարատ,' },
  { label: 'Armavir', value: 'Armavir/Արմավիր,' },
  { label: 'Gegharkunik', value: 'Gegharkunik/Գեղարքունիք,' },
  { label: 'Kotayk', value: 'Kotayk/Կոտայք' },
  { label: 'Lori', value: 'Lori/Լոռի,' },
  { label: 'Shirak', value: 'Shirak/Շիրակ,' },
  { label: 'Syunik', value: 'Syunik/Սյունիք,' },
  { label: 'Tavush', value: 'Tavush/Տավուշ,' },
  { label: 'Vayots Dzor', value: 'Vayots Dzor/Վայոց Ձոր,' }
];

// Status data
export const optionsStatus = [
  { label: 'Applicant', value: 'APPLICANT' },
  { label: 'Selection', value: 'SELECTION' },
  { label: 'Pre-Assessment', value: 'PRE_ASSESSMENT' },
  { label: 'Participant', value: 'PARTICIPANT' },
  { label: 'Post-Assessment ', value: 'POST_ASSESSMENT' },
  { label: 'Trained', value: 'TRAINED' }
];
  // Age function
export const marks: SliderMarks = {
  0: '0',
  100: '100'
};
