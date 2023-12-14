const app = Vue.createApp({
  data() {
    return {
      employeeId: null,
      employee:null,
      goals:[],
      records:[],
      books:[],
    };
  },
  mounted() {
    var params = new URLSearchParams(window.location.search);
    this.employeeId = parseInt(params.get('id'));
    console.log(this.employeeId)


    fetch(`http://localhost:3000/employees/1`)
      .then(response => response.json())
      .then(data => {
        // const targetEmp = data.find(emp => emp.id === this.employeeId)
        const targetEmp = data;
        if (targetEmp) {
          this.employee = targetEmp;
          this.goals = targetEmp.goals
        } else {
          console.error('Employee not found.');
        }
      })

    fetch(`http://localhost:3000/records/`)
      .then(response => response.json())
      .then(recordData => {
        this.records = recordData;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })

      fetch(`http://localhost:3000/books/`)
      .then(response => response.json())
      .then(booksData => {
        this.books = booksData;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
  },

  methods: {
    home() {
      this.$router.push('./index.html')
    },
    handleRowClick(recordId) {
      const targetRecord = this.records.find(data => data.id === recordId);
      const bookId = targetRecord.book_id;
      window.location.href = 'http://127.0.0.1:3000/book.html?id=' + bookId;

    },
    handleRowClickEmp(employeeId) {
      window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;
    },
    handleRowClickAllEmp() {
      window.location.href = 'http://127.0.0.1:3000/employee.html';
    },
    goBack() {
      window.history.back();
    },
    getBook(recordId){
      const targetRecord = this.records.find(data => data.id === recordId);
      const returnBook = this.books.find(data => data.id === targetRecord.book_id)
      return returnBook ? returnBook.title :"unknown";
    },
    getStatus(recordId){
      const returnRecord = this.records.find(data => data.id === recordId);
      return returnRecord ? returnRecord.readStatus :"unknown";
    },
    getYear(recordId){
      const returnRecord = this.records.find(data => data.id === recordId);
      return returnRecord ? returnRecord.readYear :"unknown";
    },
    getJob(recordId){
      const returnRecord = this.records.find(data => data.id === recordId);
      return returnRecord ? returnRecord.readJob :"unknown";
    },
    getStar(recordId){
      const returnRecord = this.records.find(data => data.id === recordId);
      return returnRecord ? returnRecord.star :"unknown";
    },
    getComment(recordId){
      const returnRecord = this.records.find(data => data.id === recordId);
      return returnRecord ? returnRecord.comment :"unknown";
    },
    getColor(recordId){
      const returnRecord = this.records.find(data => data.id === recordId);
      return returnRecord ? returnRecord.color :"unknown";
    },
  }
});
app.mount('#app');