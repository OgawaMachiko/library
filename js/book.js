const book = Vue.createApp({
    data() {
      return {
        book: null,
        comments: [],
        explanations: [],
        bookId:null,
        employeeId:null
      };
    },
    mounted() {
      var params = new URLSearchParams(window.location.search);
      this.bookId = parseInt(params.get('id'));

      fetch(`http://localhost:3000/book`) 
        .then(response => response.json())
        .then(data => {
          const matchingBook = data.find(book => book.id === this.bookId);
          if (matchingBook) {
            this.book = matchingBook;
            this.comments = matchingBook.comments;
            this.explanations = matchingBook.explanations
          } else {
            console.error('Book not found.');
          }
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
        },
        handleRowClickAllEmp(){
          window.location.href = 'http://127.0.0.1:3000/employee.html';
        },
        goBack() {
          window.history.back();
        },  
    },
  });
  book.mount('#book');