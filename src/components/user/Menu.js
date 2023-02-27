import React from 'react';
import './Menu.css';

import UserData from '../../models/UserData';
import notification from '../Notification';

class Menu extends React.Component {
    
    state = {
        menuList : [],
        isMenu : false,
        count : [],
        totalBill : 0,
    }

    getFetchMenu = async () => {
        let mList = [];
        await  fetch("http://localhost:3001/menu").then(res => res.json()).then(result => mList = result ).catch(console.log);
        console.log(mList)
      
        for(let i = 0 ; i < mList.length; i++) {
            this.state.count.push(0);
        }
        this.setState({
            menuList : mList,
            isMenu : true,
        })
      }
     
    componentDidMount = () => {
           this.getFetchMenu();
    }

    removeItem = (idx) => {
        this.state.totalBill = (this.state.count[idx] != 0)? this.state.totalBill - this.state.menuList[idx].price :  this.state.totalBill;
        this.state.count[idx] = ( this.state.count[idx] != 0 )? this.state.count[idx]-1 : 0;
       
        this.setState({
            count : this.state.count
        })
    }

    addItem = (idx) => {
        this.state.count[idx] = Number( this.state.count[idx])+1 ;
        this.state.totalBill = this.state.totalBill + Number( this.state.menuList[idx].price); 
        this.setState({
            count : this.state.count
        })
    }

    placeOrder = async () => {
        let uData = null;
        await  fetch("http://localhost:3001/users/"+ UserData.id ).then(res => res.json()).then(result => uData = result ).catch(console.log);
        console.log(uData.orders)
        for(let i = 0; i < this.state.menuList.length; i++) {
            if( this.state.count[i] !== 0 ) {
                let itemName = this.state.menuList[i].name;
                let totalPrize = Number( this.state.count[i]) * Number(this.state.menuList[i].price);
                uData.orders.push(
                    {
                        "name":itemName,
                        "price" : totalPrize,
                        "date" : new Date()
                    }
                )
            }
        }

        fetch("http://localhost:3001/users/"+ UserData.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(uData)
          })
            .then(res => res.json())
            .then(result => {
            });
          let c =   this.state.count.map((v)=>{
                   return 0
            })
            this.setState({
                count  : c,
                totalBill : 0,

            })
            var isThereOrders = false;
            this.state.count.forEach((v)=>{
                if( v != 0) {
                    isThereOrders = true;
                }
            })

           if( !isThereOrders) 
              notification.error("Empty Cart");
           else {  notification.success("Order placed"); }   
    }

   

    render () {
        
        const menuListBody =<div>{this.state.menuList.map((item,idx)=>(
              <div className='MenuCard' key={item.id}>
                <div className='MenuId'> {item.id} </div>
                <div className='MenuName'>{item.name} </div>
                <div className='ItemCost'>{item.price}</div>
                <div className='Add'>
                <div className='remove' onClick={()=>this.removeItem(idx)}> -</div>
                <div className='count'>{this.state.count[idx]}</div>
                <div className='add' onClick={()=>this.addItem(idx)}> + </div>
                </div>
                <div className='CurrentBill'>{ item.price * this.state.count[idx] }</div>
              </div>
        ))}
         <div className='PlaceOrder'>
            <div className='PlaceOrderHeading' onClick={this.placeOrder} > Place Order </div>
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

export default Menu;