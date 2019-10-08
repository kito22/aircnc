import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  span {
    font-size: 18px;
    line-height: 1.5;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      font-size: 14px;
      color: #444;

      input {
        margin-top: 5px;
        height: 44px;
        padding: 0 15px;
        border-radius: 4px;
        font-size: 16px;
        border: 1px solid #ddd;
      }
    }

    button {
      margin-top: 20px;
      height: 40px;
      border-radius: 4px;
      border: 0;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      width: 100%;
      padding: 0 20px;
      background: #f05a5b;
      cursor: pointer;

      :hover {
        background: #e14f50;
      }
    }
  }
`;
