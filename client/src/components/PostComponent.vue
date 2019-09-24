<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="create-post">
      <label for="create-post">Say something...</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create post" />
      <button @click="createPost">Post!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        :item="post"
        :key="post._id"
        :index="index"
        @dblclick="deletePost(post)"
      >
        {{toDateString(post.createdAt)}}
        <p class="text">{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Post from '../models/Post';
import PostService from '../PostsService';

@Component({})
export default class PostComponent extends Vue {
  private posts: Post[] = [];
  private error: string = '';
  private text: string = '';

  private async created() {
    try {
      PostService.getPosts()
        .then(res => {
          this.posts = res;
        })
        .catch(err => {
          this.posts = [];
          this.error = err;
        });
    } catch (err) {
      this.error = err;
    }
  }
  private toDateString(date: Date): string {
    return new Date(date).toDateString();
  }
  private async createPost() {
    const post = new Post('', this.text, new Date());
    await PostService.insertPost(post);
    await PostService.getPosts()
      .then(res => (this.posts = res))
      .catch(err => {
        this.posts = [];
        this.error = err;
      });
  }

  private async deletePost(post: Post) {
    await PostService.deletePost(post);
    await PostService.getPosts()
      .then(res => (this.posts = res))
      .catch(err => {
        this.posts = [];
        this.error = err;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 10px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
