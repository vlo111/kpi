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
    
    --tooltip-color: #2C5477;
    
    --scroll-bar-background: #F9F9F9;
    
    --forget-password-gray: #A2A2A2;

    /*Borders*/
    --light-border: #EDF0F4;
    --light-border-gray: #D9D9D9;
    --dark-border-ultramarine: #2A5578;
    --light-border-ultramarine: #0D99FF;
     
    /*Typography*/
    --font: 'Lexend';

    --large-hedline-font-size: 48px;
    --large-font-size: 38px;
    --font-size-semilarge: 24px;
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
    --search-box-shadow: inset 3px 0px 6px rgba(42, 85, 120, 0.16);
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
  
  .asn-select-primary {
    padding: 0;
    border: 1px solid var(--dark-5);
    border-radius: 0 0 5px 5px;
    box-shadow: none;
    
    .ant-select-item-option {
      height: 58px;
      padding: 19px 8px;
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
      
      &:not(:first-child) {
        border-top: 1px solid var(--dark-border-ultramarine);
      }
    }
  }

  .asn-select-default{
    .ant-select-item-option {
      border-top: 0;
      height: 38px;
      border-radius: 6px;
    }
  }

  .result-area-tooltip {
    
    .ant-tooltip-inner {
      background-color: var(--tooltip-color);
      border-radius: 40px;
      padding: 2rem;
      width: 39rem;
    }
    
    .ant-tooltip-arrow-content:before {
      background: var(--tooltip-color);
    }
  }
  
  .tooltipHelper{
    .ant-tooltip-inner{
      border-radius: 10px;
      background-color: white;
      border: 1px solid var(--dark-2);
      color: var(--dark-2);
      font-size: var( --font-size-small);
      padding: 8px 16px 
    }
    .ant-tooltip-arrow{
      display: none;
    }
  }

  .menuPopover {
    .ant-popover-inner {
      width: 9rem;
      border-radius: 10px;
      border: 1px solid var(--dark-2);
    }

    .ant-popover-arrow{
      display: none;
    }

}
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  
  .ant-dropdown-menu{
    border-radius: 10px;
    padding: 15px 0;
  }

  .customCascaderPopup{
    .ant-cascader-menu-item-expand >
    .ant-cascader-checkbox {
          display: none !important;
    }

    .ant-cascader-menus ul:first-child {
     .ant-cascader-checkbox {
         display: none !important;
      }
    }
    .ant-cascader-menu-item-active{

      background-color: var(--primary-light-1);
      &:hover{
        background-color: var(--primary-light-1);
      }
    }
    .ant-cascader-checkbox-checked .ant-cascader-checkbox-inner{
      background-color: var(--dark-border-ultramarine);
      border: var(--dark-border-ultramarine);
    }
  }

  .popconFirm{
    .ant-popover-buttons{
    position: absolute;
    top: 0;
    width: 100%;
    margin-left: 16px;

    button {
      border: none;
      &:hover{
        border: none;
        color: inherit;
      }
    }
  }
  .ant-popover-inner-content {
    padding: 2px 28px 1px 0px;
    svg path{
      fill: var(--dark-1);
    }
  }
  .ant-popover-message{
    padding: 25px 6px 8px 20px
  }
  }
  
  .errorPages{
    padding: 0;
    display: grid;
    height: 100vh;
    align-content: center;
   
   a.ant-btn{
     padding-top: 0 !important;
     line-height: 41px;
   }
 }
`

export default GlobalStyle
