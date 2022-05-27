import { client } from './client';

export async function fetchProfiles() {
  const { data } = await client.from('profile').select();
  console.log(data);
  return data;
}

export function statusSubscribe() {}
