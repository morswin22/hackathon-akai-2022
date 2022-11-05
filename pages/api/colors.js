import db from '../../lib/db';

const getColors = async () => await db("pin_colors");

export default async function handler(req, res) {
  res.status(200).json(await getColors());
}
