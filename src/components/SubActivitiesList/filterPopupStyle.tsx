import { Typography } from 'antd';
import styled from 'styled-components';
import { AsnCheckbox } from '../Forms/Checkbox';

const { Title, Paragraph } = Typography;

export const PopupContainer = styled.div<{ width?: string }>`
  padding: 1rem 1rem 2rem;
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CustomCheckbox = styled(AsnCheckbox)`
  margin-left: 0px !important;
`;

export const PopupTitle = styled(Title)`
  font-size: var(--headline-font-size) !important;
  font-weight: var(--font-semibold) !important;
`;

export const PopupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 3rem;
`;

export const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 20px;
`;

export const ButtonActionTable = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 20px;
  position: relative;

  :hover {
    svg {
      position: absolute;
      z-index: 20;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
    }
  }
`;

export const CustomParagraph = styled(Paragraph)<{ width: string }>`
  width: ${(props) => props.width} !important;
  margin-bottom: "0rem";
`;

export const CustomTitle = styled.div<{ width: string }>`
  width: ${(props) => props.width} !important;
`;
