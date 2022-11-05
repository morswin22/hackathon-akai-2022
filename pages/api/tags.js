import db from '../../lib/db';

const getTags = async () => await db("tags_list");

export default async function handler(req, res) {
  res.status(200).json(await getTags());
}
  