import { getFullPins } from '../../lib/db';

export default async function handler(req, res) {
  res.status(200).json(await getFullPins());
}
