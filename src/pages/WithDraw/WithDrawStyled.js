import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
const ContentWrap = styled.div`
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
export { Container, ContentWrap };
