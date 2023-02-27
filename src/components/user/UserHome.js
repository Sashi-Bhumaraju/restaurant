import React from 'react';
import { Route,NavLink, Routes,withRouter} from 'react-router-dom';
import './UserHome.css';
import Menu from './Menu';
import Cart from './Cart';

class UserHome extends React.Component {
    constructor (props) {
        super(props);

    }

   render() {
   
    return(
        
        <div className='UserHome'>
        <div className='UserNavigation'>
           <h2 style={{color:'white'}}>   Restarant </h2>
            <div className='Userlinks'>
            <NavLink  className={({isActive})=>{
                        return (isActive)? 'Useractive' : 'UsernotActive'
                    }}   to={'/Menu'}> Menu </NavLink>
            <NavLink  className={({isActive})=>{
                        return (isActive)? 'Useractive' : 'UsernotActive'
                    }}  to={'/Cart'}> Cart </NavLink>
            </div>
            <NavLink className='UsersLogout' style={{color:'white'}}   to={'/'} onClick={()=>this.props.logOut()}>  LogOut</NavLink>
        </div>
        <div className='UserBody'>
        <Routes>
            <Route exact path='/' element={<Menu></Menu>}></Route>
            <Route exact path='/Menu' element={<Menu></Menu>}></Route>
            <Route exact path='/Cart' element={<Cart></Cart>}></Route>
            {/* <Route exact path='/' element={<UserAuth changeLoginState={this.changeLoginState} ></UserAuth>}></Route> */}
        </Routes>
        </div>
       </div>
    )
   }
}

export default UserHome;
