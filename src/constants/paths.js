import os from "node:os"
import path from "node:path";

const HOME_DIR = os.homedir();
const ROOT_DIR = path.parse(HOME_DIR).root;

export {HOME_DIR, ROOT_DIR}