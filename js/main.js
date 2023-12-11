const app = Vue.createApp({
    data() {
      return {
        books: [],
        goals:[],
        employee:null,
        employeeId:1,
        goalListId:0
      };
    },
    mounted() {
      
      fetch(`http://localhost:3000/employees/${this.employeeId}`) 
        .then(response => response.json())
        .then(data => {
          this.goals = data.goalList;
          this.employee = data; 
          this.books = data.goalList[`${this.goalListId}`].booksList; //この0にgoalListIdを代入？
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    methods:{
      home(){
        this.$router.push('./index.html')
      },
      handleRowClick(index){
        var selectedItem = this.books[index];
        window.location.href = 'http://127.0.0.1:3000/book.html?id=' + selectedItem.id;
      }
    }
  });
  app.mount('#app');