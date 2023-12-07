const app = Vue.createApp({
    data() {
      return {
        books: [],
        employees:[]
      };
    },
    mounted() {
      fetch('http://localhost:3000/employees') 
        .then(response => response.json())
        .then(data => {
          this.employees = data; 
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        fetch('http://localhost:3000/booksList') 
        .then(response => response.json())
        .then(data => {
          this.books = data; 
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
        window.location.href='http://127.0.0.1:3000/index.html'
      }
    }
  });
  app.mount('#app');