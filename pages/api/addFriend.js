import db from '../../lib/db';
import { getFriendRequests } from './getFriendRequests';

export default async (req, res) => {
  const { id, receiver } = req.query;
  if (id == receiver)
    return res.status(400).end("You can't be friends with yourself");
  const { outgoing, incoming } = await getFriendRequests(id);
  if (outgoing.some(friend => friend.id == receiver))
    return res.status(400).end("You've already sent a friend request to this user");
  if (incoming.some(friend => friend.id == receiver))
    return res.status(400).end("This user has already sent you a friend request");
  await db('friendships').insert({ sender: id, receiver });
  res.status(200).json(await getFriendRequests(id));
}