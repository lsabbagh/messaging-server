import { string } from "yaml/dist/schema/common/string"

console.log("....globalSetup")


declare global {
    type token = string
}
export const setup = (...params) => {
    // console.log('.....globalSetup.setup', params)
}

export const teardown = (...params) => {
    // console.log('.....globalSetup.teardown', params)
}

// export default (...params) => {
//     console.log('.....globalSetup.default', params)
// }