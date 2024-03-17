

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        // isDeleted: { type: "string", enum: ["true", "false"] },
        isDeleted: { type: "boolean" },
      },
      required: ["username", "email", "isDeleted"],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: true,
};


