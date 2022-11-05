import db from '../../lib/db';

export default async (req, res) => {
  const { id } = req.query;
  const participients = await db('participations')
    .where({ pin_id: id })
    .join('users', 'participations.user_id', 'users.id')
    .select('users.id', 'users.username');
  const current = participients.length;
  const max = (await db('pins')
    .where({ id })
    .first()
    .select('max_participients')).max_participients;
  res.status(200).json({ participients, current, max });
};