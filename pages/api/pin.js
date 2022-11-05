import db from '../../lib/db';

const getPin = async (id) => 
{
  const pin = await (db("pins")
    .where({ "pins.id": id })
    .first()
    .join("visibility", "pins.visibility", "visibility.id")
    .join("pin_colors", "pins.pin_color_id", "pin_colors.id")
    .select("pins.id", "pins.name", "pins.description", "pins.date_start", "pins.date_end", "visibility.type", "pins.latitude", "pins.longitude", "pin_colors.r", "pin_colors.g", "pin_colors.b"));
  if (!pin)
    return null;
  pin.tags = await (db("tags_list")
    .join("tags", "tags_list.id", "tags.tag_id")
    .where({ "tags.pin_id": id })
    .select("tags_list.id", "tags_list.tag"));
  return pin;
}
  
export default async function handler(req, res) {
  if (!req.query.id)
    return res.status(403).json({ message: 'Forbidden' });
  res.status(200).json(await getPin(req.query.id));
}
