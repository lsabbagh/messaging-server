

export default {
  type: "object",
  properties: {
    // params: {},
    body: {
      type: "object",
      properties: {
        type: {type: "string", enum: ["group", "conversation"]},
        id: {type: "string"}
      },
      required: ["type", "id"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};



