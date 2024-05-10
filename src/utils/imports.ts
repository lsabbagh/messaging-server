
import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

export const importSchemaFromYaml = (direname) => {
    const schemaString = fs.readFileSync(path.resolve(direname, 'schema.yaml'), 'utf8')
    const schamaJSON = YAML.parse(schemaString)
    return schamaJSON
}