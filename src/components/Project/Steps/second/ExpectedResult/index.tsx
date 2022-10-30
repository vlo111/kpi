import React from 'react'
import { Activity, ExpectedResultType } from '../../../../../types/project'
import { AsnButton } from '../../../../Forms/Button'
import { Form } from '../../../../Forms/Form'
import AsnInput, { TextArea } from '../../../../Forms/Input'
import { Col, Row } from 'antd'
import { rules } from '../../../../../utils/ProjectUtils'
import { useProject } from '../../../../../hooks/useProject'

const firstLabel: (text: string, i: number) => string = (text, i) => i === 0 ? text : ''

const ExpectedResult: React.FC<{ id: string, results: ExpectedResultType[] | Activity[] }> = ({ id, results }) => {
  const { addNewResult } = useProject()

  return (
        <>
            <div>
                {results.map((r, i) => (
                    <div key={r.id}>
                        <Row
                            gutter={16}
                            justify="start"
                            align="top"
                            style={{ minWidth: '20vw' }}
                        >
                            <Col>
                                <Form.Item name={`c${r.id}`} label={firstLabel('Code', i)} {...rules(2, 256)}>
                                    <AsnInput placeholder="OP1.1" />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name={`r${r.id}`}
                                    label={firstLabel('Input expected result statement', i)}
                                    {...rules(2, 256)}
                                >
                                    <TextArea placeholder="individuals with improved technical and soft skills following participation in USG-assisted workforce development programs" />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name={`m${r.id}`} label={firstLabel('Measure', i)} {...rules(2, 256)}>
                                    <AsnInput placeholder="Number" />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item name={`t${r.id}`} label={firstLabel('Target', i)} {...rules(2, 5)}>
                                    <AsnInput placeholder="100" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                ))}
                <Row>
                    <AsnButton
                        style={{ background: 'white', width: '100%', height: '44px' }}
                        value="Create"
                        onClick={() => addNewResult(id)}
                    >
                        +Add expected result
                    </AsnButton>
                </Row>
            </div>
        </>
  )
}

export default ExpectedResult
