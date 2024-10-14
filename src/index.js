import { readCLI } from "./utils/cli.js";
import { getCurrentDirectory } from "./utils/pathService.js";

readCLI();

console.log(`You are currently in ${getCurrentDirectory()}`);
