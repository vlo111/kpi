import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    /*Color Roles*/
    --primary-dark-gray: #2A5578;
    --primary-light-1: #D4DDE4;
    --primary-light-2: #E1E8ED;
    --primary-light-3: #F4F6F8;
    --secondary-green: #68A395;
    --secondary-light-green: #EBF1F0;
    --secondary-light-orage: #F6976D;
    --secondary-light-amber: #F3C262;
    
    --success: #03BC66;
    --error: #EA1F4D;
    --error-background: #EA1F4D19;
    
    --white: #FFFFFF;
    --background: #F9FCFF;

    /*Borders*/
    --light-border: #EDF0F4;
    --light-border-gray: #D9D9D9;
    --dark-border-ultramarine: #2A5578;
    --light-border-ultramarine: #0D99FF;
     
    /*Typography*/
    --font: Lexend;
    
    --large-hedline-font-size: 48px;
    --hedline-font-size: 20px;
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
    --project-shadow: 0px 8px 8px rgba(17, 27, 35, 0.05);
  }

  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: var(--font);
  }
`

export default GlobalStyle
