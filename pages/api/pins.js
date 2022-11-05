import db from '../../lib/db';

const getPins = async () => {
  const pins = await (db("pins")
    .join("visibility", "pins.visibility", "visibility.id")
    .join("pin_colors", "pins.pin_color_id", "pin_colors.id")
    .select("pins.id", "pins.name", "pins.description", "pins.date_start", "pins.date_end", "visibility.type", "pins.latitude", "pins.longitude", "pin_colors.r", "pin_colors.g", "pin_colors.b"));
  for (const pin of pins) {
    pin.tags = await (db("tags_list")
      .join("tags", "tags_list.id", "tags.tag_id")
      .where({ "tags.pin_id": pin.id })
      .select("tags_list.id", "tags_list.tag"));
  }
  return pins;
}

export default async function handler(req, res) {
  res.status(200).json(await getPins());
}
