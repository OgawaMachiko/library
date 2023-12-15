const book = Vue.createApp({
    data() {
      return {
        book: null,
        records: [],
        employees: [],
        bookId:null,
        canRegister: true,
        canRent: false,
        canReturn: false,
        registerButtonText: '＋リストに追加',
        rentButtonText: '貸出',
        returnButtonText: '返却',
        recordList:[],
        rentalList:[1],
      };

      
    },
    mounted() {
      var params = new URLSearchParams(window.location.search);
      this.bookId = parseInt(params.get('id'));
      bookList = this.rentalList;
      console.log(bookList);

      fetch(`http://localhost:3000/books`) 
        .then(response => response.json())
        .then(data => {
          const matchingBook = data.find(book => book.id === this.bookId);
          if (matchingBook) {
            this.book = matchingBook;
          const hasBook = bookList.includes(this.bookId);
          console.log(hasBook);

          if (matchingBook.status === "貸出可能"){
            this.canRent = true;
          }
          if(hasBook === true && matchingBook.status === "貸出不可"){
            this.canReturn  = true;
          }

          } else {
            console.error('Book not found.');
          }          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        // fetch(`http://localhost:3000/records`) 
        // .then(response => response.json())
        // .then(data => {
        //   const Records = data.filter(records => records.comment !== "");
        //   const matchingRecords = Records.filter(records => records.emp_id === 1);
        //   if (matchingRecords.length > 0 ) {
        //     this.records = matchingRecords;
        //     // if (matchingRecords[0].emp_id === 1) {
        //     //   this.canReturn = true;
        //     //   this.canRent = false
        //     // } else {
        //     //   this.canReturnt = false;
        //     // }
        //     if (matchingRecords[0].emp_id === 1) {
        //       this.canRegister = false;
        //     }
        //   } else {
        //     console.error('Record not found.');
        //   }
        // })
        // .catch(error => {
        //   console.error('Error fetching data:', error);
        // });
      
        //従業員コメントの名前を表示するための
        fetch(`http://localhost:3000/employees/`)
        .then(response => response.json())
        .then(data => {
            this.employees = data;
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

        // toggleRegistration() {
        //   if (this.canRegister) {
        //     this.registerList();
        //   } else {
        //     this.deleteRecord();
        //   }
        // },

        // registerList() {
        //   this.canRegister = !this.canRegister;//canRegisterをfalseにして
        //   this.registerButtonText = this.canRegister ? '＋リストに追加' : 'リストに追加済';
        // },
        
        // deleteRecord() {
        // },

        //本を借りるＡＰＩ
        rentalBook() {
          var result = window.confirm('この本を予約します。\r\nよろしいですか。')
          if(!result){
            return;
          }

          this.canRent = false;
          this.canReturn = true; 
     
          fetch(`http://localhost:3000/books/${this.bookId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.book.id,
              title: this.book.title,
              author: this.book.author,
              genre: this.book.genre,
              publisher: this.book.publisher,
              place: this.book.place,
              url: this.book.url,
              status: "貸出不可",
              image: this.book.image,
              date: this.book.date,
              chapterList: this.book.chapterList       
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
              rentalBook.push(this.bookId);
            })
            .catch(error => {
              console.error('Error:', error);
            });

        },

        //本を返すＡＰＩ
        returnBook() {

          var result = window.confirm('この本を返却します。\r\n借りている本であることを確認してください。')
          if(!result){
            return;
          }

          this.canRent = true; 
          this.canReturn = false; 
       
          fetch(`http://localhost:3000/books/${this.bookId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.book.id,
              title: this.book.title,
              author: this.book.author,
              genre: this.book.genre,
              publisher: this.book.publisher,
              place: this.book.place,
              url: this.book.url,
              status: "貸出可能",
              image: this.book.image,
              date: this.book.date,
              chapterList: this.book.chapterList       
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
              rentalList = rentalList.filter(item => item !== this.bookId);
            })
            .catch(error => {
              console.error('Error:', error);
            });   
        }
    },
  });
  book.mount('#book');