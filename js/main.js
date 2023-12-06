const app = Vue.createApp({
    data() {
      return {
        books: []
      };
    },
    mounted() {
      // JSONサーバーから書籍データを取得する
      fetch('http://localhost:3000/booksList') // JSONサーバーのURLを指定してください
        .then(response => response.json())
        .then(data => {
          this.books = data; // 書籍データをVueアプリケーションのデータに設定する
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  });
  app.mount('#app');