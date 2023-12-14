const app = Vue.createApp({
  data() {
    return {
      goals: [],
      employee: null,
      employeeId: null,
    };
  },
  dataBook() {
    return {
      books: []
    };
  },
  mounted() {
    var params = new URLSearchParams(window.location.search);
    this.employeeId = parseInt(params.get('id'));
    console.log(this.employeeId)


    fetch(`http://localhost:3000/employees/`)
      .then(response => response.json())
      .then(data => {
        const matchingEmployee = data.find(employee => employee.id === this.employeeId);
        if (matchingEmployee) {
          this.employee = matchingEmployee;
        } else {
          console.error('Employee not found.');
        }
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

  methods: {
    home() {
      this.$router.push('./index.html')
    },
    handleRowClick(bookId) {
      window.location.href = 'http://127.0.0.1:3000/book.html?id=' + bookId;

    },
    handleRowClickEmp(employeeId) {
      window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;
    },
    handleDeleteClick(id, event){
      event.stopPropagation();
      
      var result = window.confirm('読書予定を削除しますか？')
      if(!result){
        return
      }

      // fetch(`http://localhost:3000/book` + id, {
      //   mothod: 'DELETE',
      // }).then((response) => {
      //   if(!response.ok) {
      //       throw new Error('error');
      //   }        
      // }).then(()  => {
      //     id.remove()
      // }).catch((error) => {
      //   console.error('Error deleting data:', error);
      // });
    },
    handleRowClickAllEmp() {
      window.location.href = 'http://127.0.0.1:3000/employee.html';
    },
    goBack() {
      window.history.back();
    },
  }
});
app.mount('#app');