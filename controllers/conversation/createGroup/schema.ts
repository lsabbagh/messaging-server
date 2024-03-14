

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        title: {type: 'string'},
        participants: {type: "string"}
      },
      required: ["title", "participants"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};



