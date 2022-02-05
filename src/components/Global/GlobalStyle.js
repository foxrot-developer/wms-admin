import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;
export const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  .add-btn {
    display: flex;
    justify-content: end;
  }
  .add-btn a {
    padding: 8px;
    margin-bottom: 10px;
  }
  .action-btns {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .edit-btn {
      fill: green;
    }
    .del-btn {
      fill: red;
    }
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 500px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Header = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ModalBtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;
