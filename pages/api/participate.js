import db from '../../lib/db';

export default async (req, res) => {
  const { id, pin_id } = req.query;
  const participation = await db('participations')
    .where({ pin_id });
  if (participation.some(participation => participation.user_id == id))
    return res.status(400).end("You've already participated in this pin");
  await db('participations').insert({ user_id: id, pin_id });
  res.status(200).json(await db('participations')
    .where({ pin_id })
    .join('users', 'participations.user_id', 'users.id')
    .select('users.id', 'users.username'));
};