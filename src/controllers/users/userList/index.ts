import controller from "./controller";
import { importSchemaFromYaml } from "src/utils/imports";

export default { controller, schema: importSchemaFromYaml(__dirname) };
