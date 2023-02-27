import React, { Component } from 'react';
import User from '../../models/User'
import './UserAuth.css';
import notification from '../Notification';



class UserAuth extends Component {
  state = {
    username: '',
    password: '',

    name: '',
    email: '',
    pass: '',

    isLogin : true,
    users : []
  }
  
   getFetchUsers = async () => {
    let usersList = [];
    await  fetch("https://restaurant-backend-server.onrender.com/users").then(res => res.json()).then(result => usersList = result ).catch(console.log);
    console.log(usersList)
    let loginSucces = false;
    usersList.map((user)=>{
          if(user.name === this.state.username && user.password === this.state.password && user.isAdmin === false )
           {
          // const  navigate = useNavigate();
            this.props.changeLoginState(user);
            // <Navigate replace to="/AdminLogin" />
            //  navigate("AdminLogin");
          
            
             loginSucces = true;
          }
    })
    return loginSucces;
  }

  postFetchUsers = async () => {
    let u = new User();
    u.isAdmin = false;
    u.name = this.state.name;
    u.password = this.state.pass;

    fetch("https://restaurant-backend-server.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(u)
    }).then(
      this.props.changeLoginState(u)
    );
  }

  handleLoginInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleLoginSubmit = async event => {
    event.preventDefault(); 
    const { username, password } = this.state; 
    if( username === '' || password == ''  ) {
      // alert('enter valid user credentials');
      notification.error('enter valid user credentials')
      return;
    }
    let loginSucces ;
     loginSucces = await this.getFetchUsers();
     console.log(loginSucces)
   if( loginSucces ) {
    notification.success('Succesfull login')
      // this.props.changeLoginState();
   } else {
    notification.error('User not found')
        // alert('user not found')
   }
  }

  handleRegisterInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleRegisterSubmit = event => {
    event.preventDefault();
    const { name, email, pass } = this.state;
    if( name === '' || pass == '' || email == '' || name.length < 8 || pass.length < 8) {
      // alert('enter valid user data. \n 1. enter username with more than 8 characters \n 2. password length should be more than 8 characters  ');
      notification.error('1. enter username with more than 8 characters \n 2. password length should be more than 8 characters  ')
      return;
    }
    this.postFetchUsers();
    notification.success("Succesfull SignUp")
    // Send registration request to server with name, email, and password
  }

  render() {

    const { username, password, name, email, pass } = this.state;

    

    return (
     
      <div className='UserAuth'>
        <h1> User Authentication </h1>
      <form onSubmit={this.handleLoginSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleLoginInputChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleLoginInputChange}
          />
        </div>
        <button className='UsertSubmit' type="submit">Login</button>
      </form>


       <br></br>


       <form onSubmit={this.handleRegisterSubmit}>
       <h2>Register</h2>
       <div>
         <label>Name</label>
         <input
           type="text"
           name="name"
           value={name}
           onChange={this.handleRegisterInputChange}
         />
       </div>
       <div>
         <label>Email</label>
         <input
           type="email"
           name="email"
           value={email}
           onChange={this.handleRegisterInputChange}
         />
       </div>
       <div>
         <label>Password</label>
         <input
           type="pass"
           name="pass"
           value={pass}
           onChange={this.handleRegisterInputChange}
         />
       </div>
       <button className='UsertSubmit' type="submit">Register</button>
     </form>

     </div>
    );
  }
}



export default  UserAuth ;
