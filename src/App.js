import React from 'react';
import { Route,NavLink, Routes,withRouter} from 'react-router-dom';
import { Navigate ,useNavigate } from 'react-router-dom';
import UserAuth from './components/user/UserAuth';
import AdminAuth from './components/admin/AdminAuth';
import User from './models/User.js';
import UserData from './models/UserData';
import UserHome from './components/user/UserHome';
import AdminHome from './components/admin/AdminHome';

import './App.css';

class App extends React.Component {

    state = {
        loginSucces : false,
        userData : UserData,
        loginType : 'U'
    }

    changeLoginState = (user, lT) => {
        localStorage.setItem('user',JSON.stringify(user)); 
        this.updateUserData(); 
    }

    updateUserData = async () => {
        let u =  await JSON.parse(localStorage.getItem('user'));   
        if( u !== null ) { 
            UserData.name = u.name; 
            UserData.password = u.password;
            UserData.isAdmin = u.isAdmin;
            UserData.id = u.id;
            console.log(UserData) 
            this.setState({
            loginSucces : true
            })
        }
    }

    componentDidMount = async () => {
        // localStorage.removeItem('user');
        this.updateUserData();
    }

    logOut = () => {
      localStorage.removeItem('user');
    //   useNavigate("/")
    this.state.loginSucces = false;
    
      this.setState({
        loginSucces : false
      })
     
    }
    render () {
        const linkStyle = {
            textDecoration: 'none',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '18px',
            margin: '0 10px',
            color:'white'
        };

    const Auth = <> <div className='AuthHeader'>
            <h2 style={{color:'white'}}> Restarant </h2>
            <div className='AuthType'>
            <NavLink  className={({isActive})=>{
                        return (isActive)? 'Authactive' : 'AuthnotActive'
                    }}  to={'/'}> User </NavLink>
            <NavLink  className={({isActive})=>{
                        return (isActive)? 'Authactive' : 'AuthnotActive'
                    }}to={'/AdminLogin'}> Admin </NavLink>
            
            </div>
        </div>
       
        <div className='AuthBody'>
        <div className='bgblur'></div>
        <Routes>
            <Route exact path='/AdminLogin' element={<AdminAuth changeLoginState={this.changeLoginState} ></AdminAuth>}></Route>
            <Route exact path='/' element={<UserAuth changeLoginState={this.changeLoginState} ></UserAuth>}></Route>
        </Routes>
        </div> </>
    
    const body = ( this.state.loginSucces != true )? Auth :   (UserData.isAdmin == true)? <AdminHome logOut = {this.logOut}></AdminHome>: <UserHome logOut = {this.logOut}></UserHome>;
       
      
    return (
        <div className="App">
            {body}
        </div>
        );
    }
}

export default App;
