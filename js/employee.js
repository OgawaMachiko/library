const app = Vue.createApp({
    data() {
      return {
        employees:[],
        employeeId:0,
        selectedJobs: [],
        fromYear: null,
        toYear: null,
        availableYears: [1,2,3,4,5,6,7,8,9,10]
      };
    },

    mounted() {
      fetch(`http://localhost:3000/employees`)
        .then(response => response.json())
        .then(data => {
          this.employees = data;       
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
        
        this.getEmployees();
    },
    
    methods:{
      home(){
        this.$router.push('./index.html')
      },
      handleRowClickEmp(employeeId){
        window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;

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
    }
    },
    computed: {
        sortedEmployees() {
          if (this.selectedJobs.length === 0) {
            return this.employees; 
          } else {
            return this.employees.filter(employee => this.selectedJobs.includes(employee.job));
          }
        }
      },
  });
  app.mount('#employee');