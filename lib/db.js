import { knex } from "knex";
import path from "path"

import User from "../models/user.js";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve("./database/meow"),
  },
  useNullAsDefault: true,
});

export default db;

export const getUsers = () => db("users");
export const getPins = async () => db("pins");
export const getFullPins = async () => db("pins")
                                        .join("visibility", "pins.visibility", "visibility.id")
                                        .join("pin_colors", "pins.pin_color_id", "pin_colors.id")
                                        .select("pins.id", "pins.name", "pins.description", "pins.date_start", "pins.date_end", "visibility.type", "pins.latitude", "pins.longitude", "pin_colors.r", "pin_colors.g", "pin_colors.b");
                              
