import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const RequestList = styled.ul`
  list-style: none;
  margin-bottom: 15px;

  li {
    font-size: 16px;
    line-height: 24px;
  }

  button {
    margin-right: 10px;
    font-weight: bold;
    border: 0;
    margin-top: 10px;
    cursor: pointer;
    background: none;
  }

  button.buttonAccept {
    color: #84c870;
  }

  button.buttonReject {
    color: #e55e5e;
  }
`;

export const ContainerContent = styled.div`
  ul {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 30px;

    li {
      display: flex;
      flex-direction: column;

      header {
        width: 100%;
        height: 120px;
        background-size: cover;
        border-radius: 4px;
      }

      strong {
        margin-top: 10px;
        font-size: 24px;
        color: #444;
      }

      span {
        font-size: 15px;
        color: #999;
        margin-top: 2px;
      }
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
`;
