import React from 'react';
import './AdminHome.css';
import { Route,NavLink, Routes,withRouter} from 'react-router-dom';
import MenuCRUD  from './MenuCRUD';
import UserCRUD from './UserCRUD';
import OrderHistory from './OrderHistory'


class AdminHome extends React.Component {
  render() {
    const linkStyle = {
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 10px',
        color:'white',

    };
    return(
        
        <div className='AdminHome'>
        <div className='AdminNavigation'>
           <h2 style={{color:'white'}}>   Restarant </h2>
            <div className='links'>
            <NavLink   className={({isActive})=>{
                        return (isActive)? 'active' : 'notActive'
                    }}  to={'/MenuCRUD'}> Menu </NavLink>
            <NavLink   className={({isActive})=>{
                        return (isActive)? 'active' : 'notActive'
                    }} to={'/UserCRUD'}> Users </NavLink>
            <NavLink    className={({isActive})=>{
                        return (isActive)? 'active' : 'notActive'
                    }} to={'/OrderHistory'}> Order History </NavLink>
            {/* <NavLink className='ALogout' style={linkStyle}  to={'/'} onClick={()=>this.props.logOut()}>  log</NavLink> */}
            </div>
            <NavLink className='ALogout'   to={'/'} onClick={()=>this.props.logOut()}>  LogOut</NavLink>
        </div>
        <div className='AdminBody'>
        <Routes>
            <Route exact path='/AdminLogin' element={<MenuCRUD></MenuCRUD>}></Route>
            <Route exact path='/MenuCRUD' element={<MenuCRUD></MenuCRUD>}></Route>
            <Route exact path='/UserCRUD' element={<UserCRUD></UserCRUD>}></Route>
            <Route exact path='/OrderHistory' element={<OrderHistory></OrderHistory>}></Route>
            {/* <Route exact path='/' element={<UserAuth changeLoginState={this.changeLoginState} ></UserAuth>}></Route> */}
        </Routes>
        </div>
       </div>
    )
   }
}

export default  AdminHome;