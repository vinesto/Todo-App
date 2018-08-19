var app = new Vue({
    el: "#app",
    data: {
        User: {
            name: '',
            email: '',
            password: '',
            facebookID: ''
        },
        Task: {
            title: '',
            description: '',
            dueDate: '',
            status: false
        },
        Tasks:[]

    },
    methods: {
        registerUser: function () {
            axios.post('http://localhost:3000/users/register', {
                name: this.User.name,
                email: this.User.email,
                password: this.User.password,
            })
                .then(newUser => {
                    alert('Register Success')
                    window.location('/login.html')
                })
        },
        loginUser: function () {
            axios.post('http://localhost:3000/users/login', {
                email: this.User.email,
                password: this.User.password
            })
                .then(user => {
                    console.log(user);
                    
                    localStorage.setItem('token', user.data.token)
                    localStorage.setItem('name', user.data.name)
                    // alert(user.message)
                    alert('Login success')
                    window.location.replace('dashboard.html')
                })
                .catch(err => {
                    alert('Login failed')
                    window.location.replace('login.html')
                    console.log(err.message);
                })
        },
        loginfb: function () {
            // console.log('masuuuuk login fb client');
            axios.post('http://localhost:3000/users/loginFb', {
                name: this.User.name,
                email: this.User.email,
                facebookID: this.User.facebookID
            })
                .then(user => {
                    
                    // localStorage.setItem('token', user.data.token)
                    // localStorage.setItem('name', user.data.data.name)
                    alert('login fb success')
                    window.location.replace('dashboard.html')
                })
                .catch(err=>{
                    alert('login fb failed')
                    console.log(err)    
                })
        
        },

        logout:function(){
            localStorage.removeItem('token')
            window.location.replace('')
        },

        uploadImage:function(){

        },
        fetchimage:function(){

        },

        addTask:function(){
            // console.log(this.Task.title);
            // console.log(localStorage.getItem("token"));
            
            axios.post('http://localhost:3000/tasks',{
                taskName:this.Task.title,
                description:this.Task.description,
                dueDate:this.Task.dueDate
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then(newTask=>{
                alert('add new task success')
                this.Tasks.push(newTask)
                window.location.reload()
            })
            .catch(err=>{
                alert('add new task failed')
            })
        },

        deleteTask:function(id){
            axios.delete(`http://localhost:3000/tasks/${id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then(data=>{
                // Tasks.splice(Tasks.indexOf(data),1)
                alert('delete task success')
                window.location.reload()
            })
            .catch(err=>{
                alert('delete task failed')
            })
        },

        readAllTask:function(){
            let self=this
            axios.get('http://localhost:3000/tasks',{
                headers:{
                    token:localStorage.getItem("token"),
                    json:true
                }
            })
            .then(response =>{
                console.log("===ini response dari get==",response.data.data);
                this.Tasks = response.data.data
            })
            .catch(err =>{
                console.log(err);
                
            })
        },

        completeTask:function(){
            
        }

    },
    created(){
        this.readAllTask();
    },
})