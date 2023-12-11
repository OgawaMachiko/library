const book = Vue.createApp({
    data() {
      return {
        book: null,
        comments: [],
        explanations: [],
        bookId:1,
        employeeId:1
      };
    },
    mounted() {
      var params = new URLSearchParams(window.location.search);
      this.bookId = params.get('id');

      fetch(`http://localhost:3000/book/${this.bookId}`) 
        .then(response => response.json())
        .then(data => {
          this.book = data; 
          this.comments = data.comments; 
          this.explanations = data.explanations;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    methods: {
        returnTop(id){
            window.location.href="http://127.0.0.1:3000/index.html"
        },
        handleRowClickEmp(employeeId){
          window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;
  
        }
    },
  });
  book.mount('#book');