import { Post } from '../types/post';

const url = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (page: number, pageSize: number) => {
  const res = await fetch(`${url}/posts?_page=${page}&_limit=${pageSize}`);
  const posts: Post[] = await res.json();
  const totalPosts = parseInt(res.headers.get('X-Total-Count') || '0');

  return { posts, totalPosts };
};
