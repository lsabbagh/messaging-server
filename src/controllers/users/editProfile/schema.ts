

export default {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        profilePic: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
      },
      required: ["profilePic", "firstName", "lastName"],
      additionalProperties: true,
    },
    // params : {}
  },
  required: [],
  additionalProperties: true,
};

