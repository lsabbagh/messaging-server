

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        messages: {type: "array"}
      },
      required: ['messages'],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};
