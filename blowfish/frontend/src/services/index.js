import axios from "axios";

let Service = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 1000,
});

let createdata = {
    async data(data){
        return await Service.post("/createdata", data);
    },
    async check(data) {
        await Service.post("/checkdata", data);
      },
}

export {createdata};