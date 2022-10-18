import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  
  .ant-layout {
    background: var(--white);
    
    .menu-header, .menu-footer {
      margin: 0 auto;
      padding: 0;
    }

    .menu-header {
      font-style: normal;
      font-weight: var(--font-bold);
      font-size: var(--hedline-font-size);
      color: var(--dark-border-ultramarine);
    }
    
    .menu-footer {
      display: flex;
      flex-direction: column;
      gap: 15px;
      height: 90px;
      
      > div {
        cursor: pointer;
        
        > svg {
          margin-right: 10px;
        }
      }
    }
    
    .menu-content {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      gap: 0.2%;
      padding-top: 40px;
      
      > div {
        height: 70px;
        display: flex;
        align-items: center;
        padding-left: 50px;
        cursor: pointer;
        gap: 10px;
        
        &:hover {
          background: var(--primary-light-1);
          border-right: 2px solid var(--dark-border-ultramarine);
        }
      }
    }

    .menu-header, .menu-content, .menu-footer {
      background: var(--white);
    }
  }
`
