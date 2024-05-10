

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        type: {type: "string", enum: ["group"]}
      },
      required: ["type"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};


