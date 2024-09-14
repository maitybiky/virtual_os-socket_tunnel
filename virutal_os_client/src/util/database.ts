import { RssFeed } from "@mui/icons-material";
import axios from "axios";
import fs from "fs";
import path from "path";

export const getUsers = async (): Promise<any[]> => {
  const filePath = path.join(process.cwd(),"src",'util', "users.json");

  return new Promise((res, rej) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) rej(err);
      res(JSON.parse(data));
    });
  });
};
