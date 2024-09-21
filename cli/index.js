import dotenv from "dotenv";
import { logIn } from "./util/login.js";
import { socketInit } from "./util/socketInit.js";

dotenv.config();



const _args = process.argv;
const [email, password] = _args.slice(2);
console.log("user name", email, password);

logIn({email,password}).then((token) => {
  console.log(token)
  socketInit(token)
});


