import styled from 'styled-components';

export const ReportCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 0 12px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
  width: 680px;
  padding: 40px 28px;
  background-color: #f9f5f1;
`;

export const ReportInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const ButtonBlock = styled.button`
  color: #ffffff;
  background: #e16259;
  border: 1px solid #be5643;
  box-shadow: 0 1px 2px rgb(15 15 15 / 10%);
  cursor: pointer;
  border-radius: 3px;
  padding: 4px 12px;
  font-weight: 500;
  &:hover {
    background: #cf534a;
  }
`;

export const ButtonCardStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
