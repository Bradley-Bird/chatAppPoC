import { getUser } from './auth';
import { client, parseData } from './client';

export async function fetchMessages() {
  const resp = await client.from('messages').select();
  return parseData(resp);
}

export async function postMessage(post, id) {
  const resp = await client
    .from('messages')
    .insert({ posts: post, profile_id: id });
  return parseData(resp);
}

export function subscribe(onPost = (_post) => {}) {
  const messageService = client
    .from('messages')
    .on('INSERT', (payload) => {
      console.log('Post Posted!', payload);
      onPost(payload.new);
    })
    .subscribe();
  return parseData(messageService);
}

export function unsubscribe() {
  return client.removeAllSubscriptions();
}
