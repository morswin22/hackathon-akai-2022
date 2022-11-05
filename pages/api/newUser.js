import db from '../../lib/db';

export default async (req, res) => {
  if (req.method !== 'POST')
    return res.status(405).end("Method not allowed");
  const { username } = req.body;
  const storedUser = await db('users').where({ username });
  res.status(200).json((storedUser.length ? storedUser : await db('users').insert({ id: null, username }).returning('*'))[0]);
}