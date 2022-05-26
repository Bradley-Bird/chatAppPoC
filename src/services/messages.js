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
  const resp = client
    .from('messages')
    .on('*', (message) => {
      console.log('Post Posted!', message);
      onPost(message.new);
    })
    .subscribe();
  return resp;
}

export function unsubscribe() {
  return client.removeAllSubscriptions();
}
