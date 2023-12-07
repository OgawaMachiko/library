const app = Vue.createApp({
    data() {
      return {
        books: [],
        employee:null,
        employeeId:1,
      };
    },
    mounted() {
      fetch(`http://localhost:3000/employees/${this.employeeId}`) 
        .then(response => response.json())
        .then(data => {
          this.employee = data; 
          this.books = data.booksList; 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    methods:{
      home(){
        this.$router.push('./index.html')
      },
      handleRowClick(id){
        console.log(id);
        window.location.href='http://127.0.0.1:3000/book.html'
      }
    }
  });
  app.mount('#app');