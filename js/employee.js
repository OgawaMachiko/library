const app = Vue.createApp({
  data() {
    return {
      employees: [],
      employeeId: 0,
      selectedJobs: [],
      fromYear:  0,
      toYear: 0,
      availableYears: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      isFilterCleared: true
    };
  },

  mounted() {
    // ページ読み込み時にURLからパラメータを取得して初期値として設定
    this.fromYear = parseInt(new URLSearchParams(window.location.search).get('fromYear')) || 0;
    this.toYear = parseInt(new URLSearchParams(window.location.search).get('toYear')) || 0;
    const selectedJobsParam = new URLSearchParams(window.location.search).get('selectedJobs');
    this.selectedJobs = selectedJobsParam ? selectedJobsParam.split(',') : [];

    this.searchEmployees()
  },

  methods: {
    handleRowClickEmp(employeeId) {
      window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;
    },
    async searchEmployees() {
      try {      
        // URL パラメータを更新
        const queryParams = `?fromYear=${this.fromYear}&toYear=${this.toYear}&selectedJobs=${this.selectedJobs.join(',')}`;
        const newUrl = window.location.origin + window.location.pathname + queryParams;
        // URLを更新
        window.history.replaceState({}, null, newUrl);
          
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
    },
    getNumOfBooks(empId) {
      const employee = this.employees.find(emp => emp.id === empId);

      let totalNum = 0;

      for (let i = 0; i < employee.goals.length; i++) {
        const num = employee.goals[i].recordList.length;
        totalNum += num;
      }

      return totalNum !== undefined ? totalNum : 'Unknown';
  } 
},
  }
);

app.mount('#employee');