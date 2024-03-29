import React from 'react';
import { Space, Typography } from 'antd';
import {
  IAssessmentCheckbox,
  ICheckboxGroup,
  OnDeleteCheckboxGroupItemType
} from '../../../../types/api/assessment';
import { FormFinish } from '../../../../types/global';
import { AsnCheckbox } from '../../../Forms/Checkbox';
import { AsnForm } from '../../../Forms/Form';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import {
  AnswersInput,
  IconButton,
  ScoreContainer,
  ScoreInputNumber
} from '../../assessmentStyle';
import _ from 'lodash';

const { Title } = Typography;

const CheckboxGroup: React.FC<ICheckboxGroup> = ({
  setCheckbox,
  checkboxScoreCalc,
  calcScores,
  checkbox,
  answerList,
  contentName,
  remove,
  preview
}) => {
  const form = AsnForm.useFormInstance();

  const onCheckboxNumberInputChange = (): void => {
    calcScores();
    checkboxScoreCalc();
  };

  const checkboxGroupChange: FormFinish = (val) => {
    let checkBoxGroup = _.cloneDeep(checkbox);

    if (checkBoxGroup === undefined) {
      checkBoxGroup = [
        {
          name: contentName[0] as number,
          value: val
        }
      ];
    } else {
      checkBoxGroup.map((c: IAssessmentCheckbox) => {
        if (c.name === contentName[0]) {
          c.value = val;
        }

        return c;
      });
    }

    setCheckbox(checkBoxGroup);
  };

  const onDeleteCheckboxGroupItem: OnDeleteCheckboxGroupItemType = (
    remove,
    name
  ) => {
    if (checkbox !== undefined) {
      const checkBoxGroup = _.cloneDeep(checkbox);

      checkBoxGroup.map((c: IAssessmentCheckbox) => {
        if (c.name === contentName[0]) {
          c.value = c.value.filter((c) => c !== name);
          c.value = c.value.map((c) => {
            if (c > name) {
              c--;
            }
            return c;
          });
        }

        return c;
      });

      setCheckbox(checkBoxGroup);
    }

    remove(name);
    calcScores();
    checkboxScoreCalc();
  };

  return (
    <>
      <AsnCheckbox.Group
        value={checkbox?.find((c) => c.name === contentName[0])?.value ?? []}
        onChange={checkboxGroupChange}
        style={{
          width: '100%'
        }}
      >
        {answerList.map(({ key, name, ...restField }) => (
          <Space
            key={key}
            style={{
              display: 'flex',
              marginBottom: 8,
              justifyContent: 'space-between'
            }}
            align="baseline"
          >
            <AsnCheckbox
              value={name}
              onChange={() => {
                form.setFieldValue(
                  ['questions', contentName[0], 'answers', name, 'score'],
                  0
                );

                calcScores();
                checkboxScoreCalc();
              }}
            >
              <AsnForm.Item
                {...restField}
                name={[name, 'title']}
                rules={[
                  {
                    required: true,
                    message: 'Enter required fields',
                    min: 1
                  }
                ]}
              >
                <AnswersInput placeholder={`Option ${Number(name) + 1}`} />
              </AsnForm.Item>
            </AsnCheckbox>
            <Space>
              {checkbox
                ?.find((c) => c.name === contentName[0])
                ?.value.includes(name) === true && (
                <ScoreContainer key={key}>
                  <Title
                    level={5}
                    style={{
                      fontWeight: '400',
                      margin: '0 0.5rem 0 ',
                      fontSize: 'var(--base-font-size)'
                    }}
                  >
                    Score
                  </Title>
                  <AsnForm.Item
                    {...restField}
                    name={[name, 'score']}
                    initialValue={0}
                  >
                    <ScoreInputNumber
                      className="primary"
                      min={0}
                      onChange={() => onCheckboxNumberInputChange()}
                    />
                  </AsnForm.Item>
                </ScoreContainer>
              )}
              {answerList.length <= 2
                ? null
                : (
                <IconButton disabled={preview}>
                  <DeleteIcon
                    onClick={() => onDeleteCheckboxGroupItem(remove, name)}
                  />
                </IconButton>
                  )}
            </Space>
          </Space>
        ))}
      </AsnCheckbox.Group>
    </>
  );
};

export default CheckboxGroup;
