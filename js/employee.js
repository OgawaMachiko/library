const app = Vue.createApp({
  data() {
    return {
      employees: [],
      employeeId: 0,
      selectedJobs: [],
      fromYear: 0,
      toYear: 0,
      availableYears: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      isFilterCleared: true,
    };
  },

  mounted() {
    this.searchEmployees()
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
    async searchEmployees() {
      try {
        // バリデーション: fromYear が toYear よりも小さい場合に警告を表示
        if (this.fromYear && this.toYear && this.fromYear > this.toYear) {
          alert('From年次はTo年次よりも小さくすることはできません。');
          return; // バリデーションエラーの場合、以降の処理を実行せずに終了
        }

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

        // 年次で昇順、同じ年次の場合は職種で昇順にソート
        filteredEmployees.sort((a, b) => {
          if (a.year !== b.year) {
            return a.year - b.year;
          } else {
            // 年次が同じ場合、職種で昇順にソート
            return a.job.localeCompare(b.job);
          }
        });

        // フィルタリングされた結果を設定
        this.employees = filteredEmployees;
      } catch (error) {
        console.error('Error fetching or filtering data:', error);
      }
    },
    clearFilters() {
      this.fromYear = null;
      this.toYear = null;
      this.selectedJobs = [];
      this.isFilterCleared = true;
      this.searchEmployees();
    }
  }
});

app.mount('#employee');