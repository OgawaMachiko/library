const book = Vue.createApp({
    data() {
      return {
        book: null,
        records: [],
        employees: [],
        bookId:null,
        canRegister: true,
        canRent: null,
        canReturn: false,
        registerButtonText: '＋リストに追加',
        rentButtonText: '貸出',
        returnButtonText: '返却',
        recordList:[],
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
            if (matchingBook.status === "貸出可能") {
              this.canRent = true;
            } else {
              this.canRent = false;
            }
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
            if (matchingRecords[0].emp_id === 1) {
              this.canReturn = true;
              this.canRent = false;
            } else {
              this.canReturnt = false;
            }
          } else {
            console.error('Record not found.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        fetch(`http://localhost:3000/employees/1`)
        .then(response => response.json())
        .then(data => {
            this.recordList = data.goals[0].recordList;
        })
        
        
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
          this.canRegister = !this.canRegister;//canRegisterをfalseにして
          // （要対応）JSONのrecordに今見てるbookを追加、
          
          this.registerButtonText = this.canRegister ? '＋リストに追加' : 'リストに追加済';
          
          const newList = this.recordList
          const dataLen = this.recordList.length + 1
          const dataRec = this.recordList.record_id
          const data = { "id":dataLen, "record_id":1 };
          newList.push(data);

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

          fetch(`http://localhost:3000/records/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.records.length+1,
              emp_id: 1,
              book_id: this.bookId,
              readStatus:"予定",
              readYear:1,
              readJob:"エンジニア",
              color: "#afeeee",
              star:0,
              comment: ""
            }),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Successfully Insert:', data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        },
        
        deleteRecord() {
          this.canRegister = !this.canRegister;//canRegisterをtrueにして
          // （要対応）JSONのrecordから今見てるbookを削除

          this.registerButtonText = this.canRegister ? '＋リストに追加' : 'リストに追加済';
        },


        rentalBook() {
          this.canRent = false;
          this.canReturn = true; 

          this.rentButtonText = this.canRent ? '貸出' : '貸出済';
          //（要対応？）JSONのbookのstatusを貸出不可にする

        },
        returnBook() {
          this.canRent = true; 
          this.canReturn = false; 
          this.rentButtonText = this.canRent ? '貸出' : '貸出済';
          //（要対応？）JSONのstatusを変えるかメッセージを表示
        }
    },
  });
  book.mount('#book');