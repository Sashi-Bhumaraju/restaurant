import React from 'react';
import '../user/Menu.css';
import './OrderHistory.css'

import UserData from '../../models/UserData';

class OrderHistory extends React.Component {
    
    state = {
        menuList : [],
        currentBills : [],
        isMenu : false,
        count : [],
        totalBill : 0,
        billType : 2
    }

    getFetchMenu = async () => {
        let uData = null;
        await  fetch("http://localhost:3001/users").then(res => res.json()).then(result => uData = result ).catch(console.log);
        let orders  = []
       let bill =0
        for(let i = 0; i < uData.length; i++ ) {
            for(let j = 0; j < uData[i].orders.length; j++ ) {
                orders.push(uData[i].orders[j])
                bill=  bill + orders[j].price;
            }
        }

        
        for(let i = 0; i < orders.length; i++ ) {
            bill=  bill + orders[i].price;
        }


        this.setState({
            menuList :orders,
            totalBill : bill,
            currentBills : orders,
        })
        
      }
     
    componentDidMount = () => {
           this.getFetchMenu();

    }

    compareDate = ( type, date1, date2 ) => {
          switch(type) {
             case 0 : {
                 if( date1.getDate() == date2.getDate() && date1.getUTCMonth() == date2.getUTCMonth() && date1.getFullYear() == date2.getFullYear())
                   return true;
             } break;

             case 1 : {
                if( date1.getDate() == date2.getDate() && date1.getUTCMonth() == date2.getUTCMonth() && date1.getFullYear() == date2.getFullYear())
                  return true;
            } break;
          }
    }

    getTodayBills = () => {
       
        const today = new Date();

        // filter out records that match today's date
        var todayRecords = []
         todayRecords = this.state.menuList.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate.toDateString() === today.toDateString();
        });
        var bill =0;
        for(let i = 0; i < todayRecords.length; i++ ) {
            bill=  bill + todayRecords[i].price;
        }

        this.setState({
            billType : 0,
            currentBills :  todayRecords,
            totalBill : bill
        })

    }

    getMonthBills = () => {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30);
        
        // filter out records that fall within the last 30 days
        var lastThirtyDaysRecords = []
        lastThirtyDaysRecords = this.state.menuList.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= thirtyDaysAgo && recordDate <= today;
        });

        var bill =0;
        for(let i = 0; i < lastThirtyDaysRecords.length; i++ ) {
            bill=  bill + lastThirtyDaysRecords[i].price;
        }
        this.setState({
            billType : 1,
            currentBills : lastThirtyDaysRecords,
            totalBill : bill
        })
        // console.log(lastThirtyDaysRecords + "sasiiiiiiiiiiiiiiiiii")
    }

    getTotalBills = () => {
        var bill =0;
        for(let i = 0; i < this.state.menuList.length; i++ ) {
            bill=  bill + this.state. menuList[i].price;
        }
        this.setState({
            billType : 2,
            currentBills : this.state.menuList,
            totalBill : bill
        })
    }

    render () {
        
        const menuListBody =<div>{this.state.currentBills.map((item,idx)=>(
              <div className='MenuCard' key={item.id}>
                  <div className='Date '>{new Date(item.date).getDate()} - {new Date(item.date).getUTCMonth()+1} - {new Date(item.date).getFullYear()}</div>
                <div className='MenuName'>{item.name} </div>
                {/* <div className='ItemCost'>{item.price}</div> */}
                <div className='CurrentBill'> { item.price  } </div>
              
              </div>
        ))}
         <div style={{width:410}} className='PlaceOrder'>
            <div className='TotalBillHeading'>Total Bill</div>
            <div className='CurrentBill' style={{fontWeight : 'bold'}}>{this.state.totalBill}  </div>
         </div> 
        </div> 
        return (
            <div className='Menu'>
                <div className='BillsButtons'>
                 <div className='Today h' style={{ backgroundColor : (this.state.billType == 0)? 'tomato' : 'white', color : (this.state.billType == 0)? 'white' : 'black' }} onClick={this.getTodayBills} >Today </div>
                 <div className='Month h' style={{ backgroundColor : (this.state.billType == 1)? 'tomato' : 'white', color : (this.state.billType == 1)? 'white' : 'black'}}  onClick={this.getMonthBills}> Month</div>
                 <div className='Total h' style={{ backgroundColor : (this.state.billType == 2)? 'tomato' : 'white', color : (this.state.billType == 2)? 'white' : 'black'}} onClick={this.getTotalBills}> Total</div>
                </div> 
                   {menuListBody}
            </div>
        )
    }
}

export default OrderHistory;