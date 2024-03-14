

export default {
  type: "object",
  properties: {
    headers: {
      type: "object",
      properties: {
        isdeleted: { type: "string", enum: ["true", "false"] },
      },
      required: ["isdeleted"],
      additionalProperties: true
    }
  },
  additionalProperties: true,
};


