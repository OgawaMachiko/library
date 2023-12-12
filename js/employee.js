const app = Vue.createApp({
  data() {
    return {
      employees: [],
      employeeId: 0,
      selectedJobs: [],
      fromYear: null,
      toYear: null,
      availableYears: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },

  mounted() {
    this.getEmployees();
  },

  methods: {
    home() {
      this.$router.push('./index.html');
    },
    handleRowClickEmp(employeeId) {
      window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;
    },
    goBack() {
      window.history.back();
    },
    getEmployees() {
      fetch('http://localhost:3000/employees')
        .then(response => response.json())
        .then(data => {
          this.employees = data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    sortEmployees() {
      let filteredEmployees = this.sortedEmployees;

      if (this.fromYear) {
        filteredEmployees = filteredEmployees.filter(employee => employee.year >= this.fromYear);
      }
      if (this.toYear) {
        filteredEmployees = filteredEmployees.filter(employee => employee.year <= this.toYear);
      }

      filteredEmployees.sort((a, b) => b.year - a.year);

      this.employees = filteredEmployees;
    },
    // searchEmployees() {
    //   this.getEmployees()

    //   let filteredEmployees = [...this.employees];
    //   if (this.fromYear) {
    //     filteredEmployees = filteredEmployees.filter(employee => employee.year >= this.fromYear);
    //   }
    //   if (this.toYear) {
    //     filteredEmployees = filteredEmployees.filter(employee => employee.year <= this.toYear);
    //   }

    //   if (this.selectedJobs.length > 0) {
    //     filteredEmployees = filteredEmployees.filter(employee => this.selectedJobs.includes(employee.job));
    //   }

    //   // filteredEmployees.sort((a, b) => a.year - b.year);
    //   this.employees = filteredEmployees;



    // }
    async searchEmployees() {
      try {
        // データを取得
        const response = await fetch('http://localhost:3000/employees');
        const data = await response.json();
        this.employees = data;

        // 他の処理を実行
        let filteredEmployees = [...this.employees];
        if (this.fromYear) {
          filteredEmployees = filteredEmployees.filter(employee => employee.year >= this.fromYear);
        }
        if (this.toYear) {
          filteredEmployees = filteredEmployees.filter(employee => employee.year <= this.toYear);
        }
        if (this.selectedJobs.length > 0) {
          filteredEmployees = filteredEmployees.filter(employee => this.selectedJobs.includes(employee.job));
        }

        // フィルタリングされた結果を設定
        this.employees = filteredEmployees;
      } catch (error) {
        console.error('Error fetching or filtering data:', error);
      }
    },

  },

  computed: {
    sortedEmployees() {
      if (this.selectedJobs.length === 0) {
        return this.employees;
      } else {
        return this.employees.filter(employee => this.selectedJobs.includes(employee.job));
      }
    }
  }
});

app.mount('#employee');