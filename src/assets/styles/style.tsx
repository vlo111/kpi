import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    /*Color Roles*/
    --primary-light-1: #D4DDE4;
    --primary-light-2: #E1E8ED;
    --primary-light-3: #F4F6F8;
    --secondary-green: #68A395;
    --secondary-light-green: #EBF1F0;
    --secondary-light-orage: #F6976D;
    --secondary-light-amber: #F3C262;

    --dark-1: #111B23;
    --dark-2: #263238;
    --dark-3: #5E647B;
    --dark-4: #8B8B8B;
    --dark-5: #D9D9D9;
    --dark-6: #EDF0F4;
    --dark-7: #F0F4FA;
    
    --success: #03BC66;
    --error: #EA1F4D;
    --error-background: #EA1F4D19;
    
    --white: #FFFFFF;
    --background: #F9FCFF;
    
    --scroll-bar-background: #F9F9F9;
    
    --forget-password-gray: #A2A2A2;

    /*Borders*/
    --light-border: #EDF0F4;
    --light-border-gray: #D9D9D9;
    --dark-border-ultramarine: #2A5578;
    --light-border-ultramarine: #0D99FF;
     
    /*Typography*/
    --font: 'Lexend', sans-serif;

    --large-hedline-font-size: 48px;
    --large-font-size: 38px;
    --headline-font-size: 20px;
    --base-font-size: 16px;
    --font-size-semismall: 14px;
    --font-size-small: 12px;
    
    --font-normal: 400;
    --font-semibold: 500;
    --font-bold: 700;
    --font-regular: 300;
    
    --base-line-height: 1.5;
    
    /*Shadows*/
    --base-box-shadow: -4px -4px 4px rgba(42, 85, 120, 0.05), 4px 4px 4px rgba(42, 85, 120, 0.05);
    --input-result-are-box-shadow: -4px -4px 4px rgb(42 85 120 / 5%), 4px 4px 4px rgb(42 85 120 / 5%);
    --input-box-shadow: 3px -3px 4px rgba(42, 85, 120, 0.25), -3px 3px 4px rgba(42, 85, 120, 0.25);
    --error-box-shadow: 0 0 0 2px #ff787533;
    --project-shadow: 0px 8px 8px rgba(17, 27, 35, 0.05);
    --header-box-shadow: 0px 4px 4px rgba(42, 85, 120, 0.1);
    --manu-box-shadow: 4px 0px 4px rgba(42, 85, 120, 0.1);
    /* Constants */
    --interval: clamp(15px, 5%, 50px)
  }

  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: var(--font);
  }
  
  html, body, #root {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: var(--scroll-bar-background);
    padding: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #646464;
    border-radius: 3.5px;    
    padding: 5px;
    width: 12px;
  }
  
  .ant-modal-wrap {
    overflow: hidden;
  }

  .ant-select-dropdown {
    padding: 0;
    border: 1px solid var(--dark-5);
    border-radius: 6px;
    
    .ant-select-item-option {
      height: 58px;
      padding: 19px 8px;
      border-top: 1px solid var(--dark-border-ultramarine);
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--dark-2);
      font-size: var(--base-font-size);

      &-active:not(.ant-select-item-option-disabled) {
        background-color: var(--primary-light-2);
      }

      &-selected:not(.ant-select-item-option-disabled) {
        font-weight: var(--font-semibold);
        background-color: var(--primary-light-3);
      }
      
      &:hover {
        background: var(--primary-light-1);
      }
    }

    .ant-select-item-option:last-child {
      border-bottom: 1px solid var(--dark-border-ultramarine);
    }
  }
`

export default GlobalStyle
