

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        id: { type: "string" },
        password: { type: "string" },
      },
      required: ["id", "password"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};



