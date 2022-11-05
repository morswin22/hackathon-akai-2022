import db from "../../lib/db";

const insertPin = async ({name, description, latitude, longitude, date_start, date_end}) => 
{
  const [{ id: insertedID }] = await (db("pins")
    .insert({ name, description, latitude, longitude, date_start, date_end, visibility: 1, pin_color_id: 1 })
    .returning("id"));
  
  const tags = await db("tags");
  console.log(tags);

  return await (db("pins")
    .where({ "pins.id": insertedID })
    .first()
    .join("visibility", "pins.visibility", "visibility.id")
    .join("pin_colors", "pins.pin_color_id", "pin_colors.id")
    .select("pins.id", "pins.name", "pins.description", "pins.date_start", "pins.date_end", "visibility.type", "pins.latitude", "pins.longitude", "pin_colors.r", "pin_colors.g", "pin_colors.b"));
}

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });
  res.status(200).json(await insertPin(req.body));
}