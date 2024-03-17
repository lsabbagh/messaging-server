import Ajv from "ajv";
import { TValidatorProps, TValidatorTypes } from "./validator.type";
import { HttpStatusCode } from 'axios'


const protectedSchema = {
  type: "object",
  properties: {
    headers: {
      type: "object",
      properties: {
        token: { type: "string" },
        authtype: { type: "string", enum: ["cms", "mbl"] },
      },
      required: ["token", "authtype"],
      additionalProperties: true,
    },
  },
  additionalProperties: true,
};

const protectedAJV = new Ajv();
const protect = protectedAJV.compile(protectedSchema);

const validator = (schema, isProtected = true) => {
  const ajv = new Ajv({
    strictTypes: false,
  });
  const validate = ajv.compile(schema);

  return (req, res, next) => {
    if (isProtected) {
      const authenticated = protect(req);
      if (!authenticated) {
        return res.status(HttpStatusCode.Unauthorized)
          .json({
            success: false,
            message: "Not authorized",
            errors: protect.errors,
          });
      }
    }

    const valid = validate(req);
    // console.log(".... validator schema", isProtected, schema);

    if (!valid) {
      console.log("....validator..not valid..controller", validate.errors);
      return res.status(HttpStatusCode.BadRequest).send({
        success: false,
        message: "Invalid request",
        errors: validate.errors,
      });
    }

    next();
  };
};

export default validator