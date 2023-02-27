import React from 'react';
import './Menu.css';

import UserData from '../../models/UserData';

class Cart extends React.Component {
    
    state = {
        menuList : [],
        isMenu : false,
        count : [],
        totalBill : 0,
    }

    getFetchMenu = async () => {
        let uData = null;
        await  fetch("https://restaurant-backend-server.onrender.com/users/"+UserData.id).then(res => res.json()).then(result => uData = result ).catch(console.log);
        console.log(uData.orders)
        let bill = this.state.totalBill ;
        for(let i = 0; i < uData.orders.length; i++ ) {
            bill=  bill + uData.orders[i].price;
        }
        this.setState({
            menuList : uData.orders,
            totalBill : bill
        })
        
      }
     
    componentDidMount = () => {
           this.getFetchMenu();
    }

    render () {
        
        const menuListBody =<div>{this.state.menuList.map((item,idx)=>(
              <div className='MenuCard' key={item.id}>
              
                <div className='MenuName'>{item.name} </div>
                {/* <div className='ItemCost'>{item.price}</div> */}
                <div className='CurrentBill'>{ item.price  }</div>
              </div>
        ))}
         <div style={{width:410}} className='PlaceOrder'>
            <div className='TotalBillHeading'>Total Bill</div>
            <div className='CurrentBill' style={{fontWeight : 'bold'}}>{this.state.totalBill}  </div>
         </div>
        </div> 
        return (
            <div className='Menu'>
                   {menuListBody}
            </div>
        )
    }
}

export default Cart;