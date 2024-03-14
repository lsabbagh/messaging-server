

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        password: { type: "string" },
      },
      required: ["password"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};


