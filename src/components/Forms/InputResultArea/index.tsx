import styled from 'styled-components'

const areaPanelBox: (color: string) => any = (color: string) => ({
  background: 'var(--white)',
  borderTop: `3px solid ${color}`,
  boxShadow: 'var(--input-result-are-box-shadow)',
  borderRadius: '20px',
  padding: '2rem'
})

export const InputResultArea = styled.div`
  .result-area {
    background-color: #f0f4fa;

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
        width: calc(100% - 78px - 148px - 58px - 48px);

        .ant-col {
          width: 100%;
        }
      }

      > div:nth-child(3) input {
        width: 148px;
      }

      > div:nth-child(4) input {
        width: 58px;
      }
    }
  }

  .ant-collapse {
    box-shadow: none;
    background: none;

    &-header {
      font-size: 16px;
      padding: 1rem 40px 1rem 1rem !important;
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
      }
    }
  }

  .activity-panel {
    border-top: 3px solid var(--light-border-gray);
    box-shadow: var(--input-result-are-box-shadow);
    border-radius: 20px;
    ${areaPanelBox('var(--secondary-green)')}
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .ant-collapse-content {
      padding: 0 21px 2rem 11px !important;

      &-box {
        gap: 0 !important;
        padding: 2rem !important;
        padding-bottom: 1rem !important;
        ${areaPanelBox('var(--dark-border-ultramarine)')}
      }
    }

    .ant-collapse-item {
      box-shadow: var(--input-result-are-box-shadow);
      border-radius: 20px;
    }
  }
`
