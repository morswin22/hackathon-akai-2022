import db from '../../lib/db';

export const getFriendRequests = async (id) => {
  const outgoing = await db('friendships')
    .where({ sender: id })
    .join('users', 'friendships.receiver', 'users.id')
    .select('users.id', 'users.username');
  const incoming = await db('friendships')
    .where({ receiver: id })
    .join('users', 'friendships.sender', 'users.id')
    .select('users.id', 'users.username');
  return { outgoing, incoming };
};

export default async (req, res) => {
  res.status(200).json(await getFriendRequests(req.query.id));
};