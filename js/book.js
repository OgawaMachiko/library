const app = Vue.createApp({
    data() {
      return {
        book: null,
        comments: [],
        bookId:1
      };
    },
    mounted() {
      fetch(`http://localhost:3000/book/${this.bookId}`)
      .then(response => response.json())
      .then(data => {
        this.book = data;
        this.comments = data.comments
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