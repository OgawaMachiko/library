const app = Vue.createApp({
    data() {
      return {
        employees:[],
        employeeId:0
      };
    },

    mounted() {
      
        console.log('mounted')
      fetch(`http://localhost:3000/employees`)
        .then(response => response.json())
        .then(data => {
          this.employees = data; 
          console.log('dataget')        
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        })
    },
    
    methods:{
      home(){
        this.$router.push('./index.html')
      },
      handleRowClickEmp(employeeId){
        window.location.href = 'http://127.0.0.1:3000/index.html?id=' + employeeId;

      }
    }
  });
  app.mount('#employee');