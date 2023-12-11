const app = Vue.createApp({
    data() {
      return {
        goals:[],
        employee:null,
        employeeId:0,
        goalListId:0
      };
    },
    dataBook() {
      return {
        books: []
      };
    },
    mounted() {
      
      fetch(`http://localhost:3000/employees`)
        .then(response => response.json())
        .then(data => {
          this.employee = data[`${this.employeeId}`]; 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
      fetch(`http://localhost:3000/book`)
        .then(response => response.json())
        .then(dataBook => {
          this.books = dataBook;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },
    
    methods:{
      home(){
        this.$router.push('./index.html')
      },
      handleRowClick(bookId){
        window.location.href = 'http://127.0.0.1:3000/book.html?id=' + bookId;

      }
    }
  });
  app.mount('#app');