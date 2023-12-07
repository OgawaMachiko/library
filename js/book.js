const app = Vue.createApp({
    data() {
      return {
        book: [],
        comments: []
      };
    },
    mounted() {
      // JSONサーバーから書籍データを取得する
      fetch('http://localhost:3000/book') // JSONサーバーのURLを指定してください
      .then(response => response.json())
      .then(data => {
        this.book = data; // 書籍データをVueアプリケーションのデータに設定する
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      // JSONサーバーから書籍データを取得する
      fetch('http://localhost:3000/comments') // JSONサーバーのURLを指定してください
      .then(response => response.json())
      .then(data => {
        this.comments = data; // 書籍データをVueアプリケーションのデータに設定する
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },
    methods: {
        returnTop(id){
            window.location.href="http://127.0.0.1:3000/index.html"
        }
    },
  });
  app.mount('#app');