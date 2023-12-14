const book = Vue.createApp({
    data() {
      return {
        book: null,
        records: [],
        employees: [],
        bookId:null,
        canRegister: true,
        canRent: true,
        canReturn: false,
        registerButtonText: '＋リストに追加',
        rentButtonText: '貸出',
        returnButtonText: '返却',
      };

      
    },
    mounted() {
      var params = new URLSearchParams(window.location.search);
      this.bookId = parseInt(params.get('id'));

      fetch(`http://localhost:3000/books`) 
        .then(response => response.json())
        .then(data => {
          const matchingBook = data.find(book => book.id === this.bookId);
          if (matchingBook) {
            this.book = matchingBook;
          } else {
            console.error('Book not found.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        fetch(`http://localhost:3000/records`) 
        .then(response => response.json())
        .then(data => {
          const matchingRecords = data.filter(records => records.book_id === this.bookId);
          if (matchingRecords.length > 0) {
            this.records = matchingRecords;
          } else {
            console.error('Record not found.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        fetch(`http://localhost:3000/employees`) 
        .then(response => response.json())
        .then(data => {
          this.employees = data;
          // const matchingEmployees = data.filter(employees => records.book_id === this.bookId);
          // if (matchingEmployees.length > 0) {
          //   this.employees = matchingEmployees;
          // } else {
          //   console.error('Employee not found.');
          // }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        
      },
      

    methods: {
        returnTop(id){
          window.location.href = "http://127.0.0.1:3000/index.html"
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

        getUserName(empId) {
          const employee = this.employees.find(emp => emp.id === empId);
          return employee ? employee.user_name : 'Unknown';
        },

        toggleRegistration() {
          if (this.canRegister) {
            this.registerList();
          } else {
            this.deleteRecord();
          }
        },

        registerList() {
          this.canRegister = !this.canRegister;
          // 切り替えた後の処理を追加する
          if (this.canRegister) {
          // canRegisterがtrueになった後の処理をここに記述
          }
          
          this.registerButtonText = this.canRegister ? '＋リストに追加' : 'リストに追加済';
        },
        deleteRecord() {
          this.canRegister = !this.canRegister;

          // ＋リストに追加済 ボタンをクリックした際の処理をここに記述
          // 例えば、特定の関数を呼び出す、データを更新する、APIを叩くなど

          this.registerButtonText = this.canRegister ? '＋リストに追加' : 'リストに追加済';
        },


        rentalBook() {
          this.canRent = false;
          this.canReturn = true; 
          this.rentButtonText = this.canRent ? '貸出' : '貸出済';
        },
        returnBook() {
          this.canRent = true; 
          this.canReturn = false; 
          this.rentButtonText = this.canRent ? '貸出' : '貸出済';
        }
    },
  });
  book.mount('#book');