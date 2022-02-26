export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        $red: '#/schemas/surveyAnswer'
      }
    },
    date: {
      type: 'string'
    }
  }
}
