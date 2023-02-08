import { createGlobalStyle } from 'styled-components';

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
    --primary-light-orange: #F07760;

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
    --background-auth: rgb(249, 252, 255);
    --background-active-pagination: rgba(0, 0, 0, 0.09);
    --active-pagination: rgba(0, 0, 0, 0.87);
    
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
    --font-size-base-medium: 17px;
    
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
    --overview-box-shadow: rgb(42 85 120 / 10%) -2px 6px 8px;
    /* Constants */
    --interval: clamp(15px, 5%, 50px)
  }
  /* -4px -4px 8px rgba(17, 27, 35, 0.05), 4px 4px 8px rgba(17, 27, 35, 0.25) */

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
    width: 4px;
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

  
  .ant-picker-dropdown {
    .ant-picker-cell-inner {
      border-radius: 50% !important;

      :before {
        border-radius: 50% !important;
        border: 1px solid var(--dark-border-ultramarine) !important;
      }
    }
    
    .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
      background: var(--dark-border-ultramarine);
    }
    
    .ant-picker-today-btn {
      color: var(--dark-border-ultramarine);
    }
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
  .documentPopover{
  position: absolute;
  .ant-popover-inner{
   width: 190px;
   button{
    font-size: var(--base-font-size);
    color: var(--dark-2);
   }
  }
  .ant-popover-inner-content{
    padding: 12px 10px;
  }
}
  
  .applicant-popover {
    .ant-popover-inner {
      background: var(--white);
      box-shadow: 4px 4px 4px rgba(42, 85, 120, 0.2), -4px -4px 4px rgba(42, 85, 120, 0.1);
      border-radius: 20px;
    }
  }

  .ant-upload-list {
    max-height: 12vh !important;
    overflow-y: auto !important;
  }
  .filePreviewModal{
    width: auto!important;
    height: 500px !important;
  }

  .customCascaderPopup{
    background-color: transparent !important;
    box-shadow: none !important;

    .ant-cascader-menu-item-active{
      background-color: var(--primary-light-1);
      &:hover{
        background-color: var(--primary-light-1);
      }
    }
    .ant-cascader-menu{
      height: auto;
      border: 1px solid var(--dark-border-ultramarine);
      border-radius: 6px;
      background: var(--white);
      padding: 6px 0;
      margin-right: 1px;
    }
    .ant-cascader-checkbox-checked .ant-cascader-checkbox-inner{
      background-color: var(--dark-border-ultramarine);
      border: var(--dark-border-ultramarine);
    }
    .ant-cascader-checkbox-indeterminate 
    .ant-cascader-checkbox-inner:after {
      display: none !important;
    }
    .ant-cascader-checkbox:hover .ant-cascader-checkbox-inner {
      border-color: var(--dark-border-ultramarine);
    }
    .ant-cascader-checkbox-inner{
      border-color: var(--dark-border-ultramarine);
    }
    .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled){
      font-weight: var(--font-normal);
    }
  }
`;

export default GlobalStyle;
