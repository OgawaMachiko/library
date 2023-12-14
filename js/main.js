const app = Vue.createApp({
  data() {
    return {
      employeeId: null,
      employee:null,
      goals:[],
      records:[],
      books:[],
      recordList:[],
    };
  },
  mounted() {
    var params = new URLSearchParams(window.location.search);
    this.employeeId = parseInt(params.get('id'));
    console.log(this.employeeId)


    fetch(`http://localhost:3000/employees/`)
      .then(response => response.json())
      .then(data => {
        const targetEmp = data.find(emp => emp.id === this.employeeId)
        // const targetEmp = data;
        if (targetEmp) {
          this.employee = targetEmp;
          this.goals = targetEmp.goals
          if(targetEmp.id===1){
            this.recordList = targetEmp.goals[0].recordList;
          }
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
    handleDeleteClick(recordId,event){
      event.stopPropagation();
      
      var result = window.confirm('読書予定を削除します。\r\n借りている本ではありませんか？')
      if(!result){
        return
      }

      const newList = this.recordList.filter(data => data.id !== recordId)

      fetch(`http://localhost:3000/employees/1/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:1,
          user_name: "石倉加菜子",
          department:"テレコムソリューション事業部",
          year:1,
          job:"エンジニア",
          goals:[
          { id:1, goal_name:"デザインエンジニアへのキャリアチェンジ", 
            recordList:newList,
        }
      ]       
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Successfully deleted:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
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