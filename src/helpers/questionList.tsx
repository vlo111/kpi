export const addQuestion = (value: any, section: number, applicationData: any, answerTypeValue: string): void => {
  applicationData?.applicationFormSections[section].questions?.push({
    relatedQuestions: [],
    answerType: answerTypeValue,
    title: value.question,
    answers:
      value.names !== undefined && value.answerTypeName !== 'YES_NO'
        ? value.names.map((item: string) => {
          return {
            title: item,
            type: answerTypeValue
          };
        })
        : value.answerTypeName === 'YES_NO'
          ? [
              { type: 'OPTION', title: 'Yes/Այո' },
              { type: 'OPTION', title: 'No/Ոչ' }
            ]
          : [],
    editable: true,
    otherOption: value.otherOption !== undefined ? value.otherOption : false,
    required: value.requiredFiled !== undefined ? value.requiredFiled : true,
    active: true
  });
};

export const updateQuestion = (value: any, sectionNumber: number, applicationData: any, questionRowIndex: number | undefined, answerTypeValue: string): void => {
  applicationData?.applicationFormSections[sectionNumber].questions?.splice(
    questionRowIndex,
    1,
    {
      relatedQuestions: [],
      answerType: answerTypeValue,
      title: value.question,
      answers:
        value.names !== undefined && value.answerTypeName !== 'YES_NO'
          ? value.names.map((item: string) => {
            return {
              title: item,
              type: answerTypeValue
            };
          })
          : value.answerTypeName === 'YES_NO'
            ? [
                { type: 'OPTION', title: 'Yes/Այո' },
                { type: 'OPTION', title: 'No/Ոչ' }
              ]
            : [],
      editable: true,
      otherOption: value.otherOption !== undefined ? value.otherOption : false,
      required: value.requiredFiled !== undefined ? value.requiredFiled : true,
      active: true
    }
  );
};
