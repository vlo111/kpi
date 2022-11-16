import styled from 'styled-components'

const areaPanelBox: (color: string) => any = (color: string) => ({
  background: 'var(--white)',
  borderTop: `3px solid ${color}`,
  boxShadow: 'var(--input-result-are-box-shadow)',
  borderRadius: '20px',
  padding: '2rem'
})

export const InputResultArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .result-container {
    display: flex;

    .result-area {
      background-color: var(--dark-7);
      border-radius: 20px;
      width: 100%;

      .main,
      .panel .ant-collapse-content {
        padding: 0 21px 0 11px;
      }

      input,
      textarea {
        height: 58px !important;
      }

      .ant-row {
        > div:nth-child(1) input {
          width: 78px;
        }

        > div:nth-child(2) {
          width: calc(100% - 78px - 158px - 58px - 48px);

          .ant-col {
            width: 100%;
          }
        }

        > div:nth-child(3) > .ant-form-item {
          width: 148px;

          .ant-select {
            &-selector {
              height: 100%;
              border: 1px solid var(--dark-border-ultramarine);
              box-shadow: var(--input-box-shadow);
              border-radius: 5px;
            }
            &-selection-item {
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 16px;
            }
          }
        }

        > div:nth-child(4) input {
          width: 58px;
        }

        > .delete-result-box {
          margin-top: 1.4rem;
          cursor: pointer;
        }
      }
    }

    .delete-result {
      margin-top: 1.2rem;
      margin-left: 0.5rem;
      width: 2rem;
      text-align: center;
      cursor: pointer;
    }
  }

  .ant-collapse {
    box-shadow: none;
    background: none;

    &-header {
      font-size: 16px;
      padding: 0 40px 0 0 !important;
      width: 73vw;
      border: none;
      
      .anticon-caret-right {
        z-index: 2;
      }

      .ant-form-item {
        margin: 0;
        
        .ant-input-affix-wrapper {
          height: 60px;
        }

        &:not(&-has-error) {
          .ant-input-affix-wrapper {
            border: 1px solid var(--dark-5);

            &:hover,
            &:focus {
              border: 1px solid var(--dark-5) !important;
              box-shadow: none !important;
            }
          }
        }

        .ant-input-affix-wrapper {
          width: 73vw;
        }

        input {
          width: 100% !important;
          height: auto !important;
        }
      }
    }

    &-item {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &-content-box {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .panel {
        ${areaPanelBox('var(--secondary-light-amber)')}
        .activity-heder {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .ans-title {
            font-size: 1rem;
          }
        }

        div:first-child .delete-result-box {
          margin-top: 2.8rem;
        }
        
        //&:not(.ant-form-item-has-error) {
        //  input, textarea, .ant-select-selector {
        //    border: 1px solid var(--dark-5) !important;
        //
        //    &:hover,
        //    &:focus {
        //      border: 1px solid var(--dark-5) !important;
        //      box-shadow: none !important;
        //    }
        //  }
        //}
      }
    }
  }

  .activity-panel {
    border-top: 3px solid var(--light-border-gray);
    box-shadow: var(--input-result-are-box-shadow);
    border-radius: 20px;
    ${areaPanelBox('var(--secondary-green)')}
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .activity-block {
        display: flex;
        gap: 0.5rem;

        .ant-collapse {
          width: 100%;
          
          &-header {
            width: auto;
            
            .ant-input-affix-wrapper {
              width: calc(100% + 40px);
            }
          }
        }
      }

      .delete-activity {
        margin-top: 1rem;
        cursor: pointer;
      }
    }

    .ant-collapse-content {
      padding: 0 21px 2rem 11px !important;

      &-box {
        gap: 0 !important;
        padding: 2rem !important;
        padding-bottom: 1rem !important;
        ${areaPanelBox('var(--dark-border-ultramarine)')}

        div:first-child .delete-result-box {
          margin-top: 3rem !important;
        }

        .delete-result-box {
          margin-top: 1.2rem !important;
        }
      }

      .ant-select-selector {
        box-shadow: none !important;
      }

      input:not(.ant-input-status-error), textarea:not(.ant-input-status-error), .ant-select-selector {
        border: 1px solid var(--dark-5) !important;

        &:hover,
        &:focus {
          border: 1px solid var(--dark-5) !important;
          box-shadow: none !important;
        }
      }
    }

    .ant-collapse-item {
      box-shadow: var(--input-result-are-box-shadow);
      border-radius: 20px;
    }
  }
`
