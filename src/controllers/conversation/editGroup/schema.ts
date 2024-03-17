

export default {
  type: "object",
  properties: {
    // params: {},
    body: {
      type: "object",
      properties: {
        title: {type: "string"},
        participants: {type: "string"},
        profile: {type: "string"}
      },
      required: ["title", "participants", "profile"],
      additionalProperties: false
    }
  },
  required: [],
  additionalProperties: true
}


