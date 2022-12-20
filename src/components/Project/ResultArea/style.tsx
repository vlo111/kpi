import styled from 'styled-components';

const areaPanelBox: (color: string) => any = (color: string) => ({
  background: 'var(--white)',
  borderTop: `3px solid ${color}`,
  boxShadow: 'var(--input-result-are-box-shadow)',
  borderRadius: '20px',
  padding: '2rem'
});

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
        padding: 0 2rem 2rem 2rem;
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
          width: calc(100% - 337px);
          
          &.statement-box {
            min-width: 12rem;
          }

          .ant-col {
            width: 100%;
          }
        }

        > div:nth-child(3) > .ant-form-item {
          width: 148px;

          .ant-select {
            &-selector {
              padding: 0 8px;
              height: 100%;
              border: 1px solid var(--dark-border-ultramarine);
              box-shadow: var(--input-box-shadow);
              border-radius: 5px;
            }
            &-selection-item {
              display: flex;
              justify-content: start;
              align-items: center;
              font-size: 16px;
            }
          }
        }

        > div:nth-child(4) input {
          width: 58px;
        }

        .delete-result-box {
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
              width: 73vw;
            }

            .ant-input-affix-wrapper-focused {
              box-shadow: none;
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

          .panel:first-child {
            .ant-input:not(.ant-input-status-error),
            textarea:not(.ant-input-status-error),
            .ant-select-selector {
              border: 1px solid var(--dark-5) !important;
              box-shadow: none !important;

              &:hover,
              &:focus {
                border: 1px solid var(--dark-5) !important;
                box-shadow: none !important;
              }
            }
          }

          .ant-select-selector {
            box-shadow: none !important;
          }

          .ant-select-open {
            .ant-select-selector {
              border-radius: 5px 5px 0 0 !important;
            }
          }

          .panel {
            ${areaPanelBox('var(--secondary-light-amber)')};
            .activity-heder {
              display: flex;
              flex-direction: column;
              gap: 1rem;

              .ans-title {
                font-size: 1rem;
              }
            }

            .delete-result-box{
              right: 50px;
            }
            
            > .ant-row {
              flex-wrap: inherit;
            }

            > .ant-row:first-child {
              align-items: center;
            }

            .ant-row:not(:first-child) {
              .delete-result-box{
                margin-top: 15px;
              }
            }
          }
        }

        .activity-panel {
          border-top: 3px solid var(--light-border-gray);
          box-shadow: var(--input-result-are-box-shadow);
          border-radius: 20px;
          ${areaPanelBox('var(--secondary-green)')};
          padding-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .activity-list {
            display: flex;
            flex-direction: column;
            gap: 2rem;

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
              right: 5rem;
            }
          }

          .ant-collapse-content {
            padding: 0 2rem 1rem 2rem !important;

            &-box {
              gap: 0 !important;
              padding: 2rem !important;
              padding-bottom: 1rem !important;
              ${areaPanelBox('var(--dark-border-ultramarine)')}

              > .ant-row:first-child {
                display: flex;
                align-items: center;
              }

              > .ant-row {
                flex-wrap: inherit;
                
                &:first-child {
                  .delete-result-box {
                    margin-top: 5px;
                  }
                }
                
                .delete-result-box {
                  right: 148px;
                  margin-top: 17px;
                }
              }
            }

            .ant-select-selector {
              box-shadow: none !important;
            }

            .ant-select-open {
              .ant-select-selector {
                border-radius: 5px 5px 0 0 !important;
              }
            }

            .ant-input:not(.ant-input-status-error),
            textarea:not(.ant-input-status-error),
            .ant-select-selector {
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

        .ant-input-number {
          width: 58px;
          height: 58px;
        }

        textarea {
          resize: none;
          font-size: 15px;
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

    ::-webkit-scrollbar {
      width: 2px !important;
      height: 2px !important;
      padding: 2px !important;
    }

    ::-webkit-scrollbar-thumb {
      padding: 2px !important;
      width: 4px !important;
    }
`;
