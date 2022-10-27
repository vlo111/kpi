import React from 'react'
import { ExpectedResult } from '../../../../../../types/project'
import Button from '../../../../../Forms/Button'
import styled from 'styled-components'
import { Form } from '../../../../../Forms/Form'
import AsnInput, { TextArea } from '../../../../../Forms/Input'
import { Col, Row } from 'antd'

const ResultAreaContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-top: 3px solid #f3c262;
  box-shadow: -4px -4px 4px rgb(42 85 120 / 5%), 4px 4px 4px rgb(42 85 120 / 5%);
  border-radius: 20px;
  padding: 32px;

  input,
  textarea {
    height: 58px !important;
  }

  .ant-collapse-content-box {
    padding: 1rem 1rem 2rem 1rem !important;
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
`

const ProjectInfo: React.FC<{ results: ExpectedResult[] }> = ({ results }) => {
  return (
    <>
      {results.map((r) => (
        <ResultAreaContainer key={r.id}>
          <Row
            gutter={16}
            justify="start"
            align="top"
            style={{ minWidth: '20vw' }}
          >
            <Col>
              <Form.Item name={`c${r.id}`} label="Code">
                <AsnInput placeholder="OP1.1" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name={`r${r.id}`}
                label="Input expected result statement"
              >
                <TextArea placeholder="individuals with improved technical and soft skills following participation in USG-assisted workforce development programs" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name={`m${r.id}`} label="Measure">
                <AsnInput placeholder="Number" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name={`t${r.id}`} label="Target">
                <AsnInput placeholder="100" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Button
              style={{ background: 'white', width: '100%', height: '44px' }}
              htmlType="submit"
              value="Create"
            >
              +Add Result Area
            </Button>
          </Row>
        </ResultAreaContainer>
      ))}
    </>
  )
}

export default ProjectInfo
