import db from '../../lib/db';

const getPin = async (id) => 
  await (db("pins")
    .where({ "pins.id": id })
    .first()
    .join("visibility", "pins.visibility", "visibility.id")
    .join("pin_colors", "pins.pin_color_id", "pin_colors.id")
    .select("pins.id", "pins.name", "pins.description", "pins.date_start", "pins.date_end", "visibility.type", "pins.latitude", "pins.longitude", "pin_colors.r", "pin_colors.g", "pin_colors.b"));

export default async function handler(req, res) {
  res.status(200).json(await getPin(req.query.id));
}
