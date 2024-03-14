

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        type: { type: "string", enum: ["admin", "user"] },
      },
      required: ["username", "email", "password", "type"],
      additionalProperties: false,
    },
  },
  additionalProperties: true,
};

