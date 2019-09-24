import axios, { AxiosResponse } from 'axios';
import Post from './models/Post';

const url: string = 'api/posts';

class PostService {
  // Get posts
  public static getPosts(): Promise<Post[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data: Post[] = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Add posts
  public static insertPost(post: Post): Promise<AxiosResponse<any>> {
    const { text } = post;
    return axios.post(url, { text });
  }

  // Delete posts
  public static deletePost(post: Post): Promise<AxiosResponse<any>> {
    const { _id } = post;
    return axios.delete(`${url}/${_id}`);
  }
}

export default PostService;
