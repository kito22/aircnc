import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  padding: 30px;
  display: flex;
  width: 100%;
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
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 20px;
      color: #444;

      span {
        font-size: 10px;
        color: #999;
      }

      input {
        width: 100%;
        display: block;
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

export const InputThumbnail = styled.label`
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  background-size: cover;
  cursor: pointer;
  height: 160px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.thumbnail &&
    css`
      border: 0;

      img {
        display: none;
      }
    `}

  #thumbnail {
    display: none;
  }
`;
