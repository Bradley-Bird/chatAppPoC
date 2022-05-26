import { client, parseData } from './client';

export async function fetchMessages() {
  const resp = await client.from().select();
  return parseData(resp);
}

export async function postMessage(email, status = 0) {
  if (!email) throw new Error('Please sign in to post.');
  const resp = await client.from('posts').insert({ email, status });
  return parseData(resp);
}

export function subscribe(onPost = (_post) => {}) {
  const messageService = client
    .from('posts')
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
