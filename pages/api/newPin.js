import db from "../../lib/db";

const insertPin = async ({name, description, latitude, longitude, date_start, date_end, colorId, choosenTagsId}) => 
{
  const [{ id: insertedID }] = await (db("pins")
    .insert({ id: null, name, description, latitude, longitude, date_start, date_end, visibility: 1, pin_color_id: colorId })
    .returning("id"));
  
  await (db("tags")
    .insert(...choosenTagsId.map(choosenTag => { return { pin_id: insertedID, tag_id: choosenTag }; })));

  const pin = await (db("pins")
    .where({ "pins.id": insertedID })
    .first()
    .join("visibility", "pins.visibility", "visibility.id")
    .join("pin_colors", "pins.pin_color_id", "pin_colors.id")
    .select("pins.id", "pins.name", "pins.description", "pins.date_start", "pins.date_end", "visibility.type", "pins.latitude", "pins.longitude", "pin_colors.r", "pin_colors.g", "pin_colors.b"));
  pin.tags = await (db("tags_list")
    .join("tags", "tags_list.id", "tags.tag_id")
    .where({ "tags.pin_id": pin.id })
    .select("tags_list.id", "tags_list.tag"));
  return pin;
}

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });
  res.status(200).json(await insertPin(req.body));
}