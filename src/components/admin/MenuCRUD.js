import React from 'react';
import './MenuCRUD.css';
import User from '../../models/User'

import UserData from '../../models/UserData';

class MenuCRUD extends React.Component {
    
    state = {
        menuList : [],
        isMenu : false,
        count : [],
        totalBill : 0,
        isEdit : [],
        id:'',
        name: '',
        price: '',
        newItem : false,
    }

    getFetchMenu = async () => {
        let mList = [];
        await  fetch("http://localhost:3001/menu").then(res => res.json()).then(result => mList = result ).catch(console.log);
        console.log(mList)
      
        for(let i = 0 ; i < mList.length; i++) {
            this.state.count.push(0);
        }

        for(let i = 0 ; i < mList.length; i++) {
            this.state.isEdit.push(false);
        }

        this.setState({
            menuList : mList,
            isMenu : true,
        })
      }
     
    componentDidMount = () => {
           this.getFetchMenu();
    }

    

    save = async () => {
        let uData = null;
        await  fetch("http://localhost:3001/users/"+ UserData.id ).then(res => res.json()).then(result => uData = result ).catch(console.log);
        console.log(uData.orders)
        for(let i = 0; i < this.state.menuList.length; i++) {
            if( this.state.count[i] !== 0 ) {
                let itemName = this.state.menuList[i].name;
                let totalPrize = this.state.count[i] * this.state.menuList[i].price;
                uData.orders.push(
                    {
                        "name":itemName,
                        "price" : totalPrize
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
            alert('Order Placed')
    }

    delete = async (id) => {
      await  fetch("http://localhost:3001/menu/"+id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
          })
            .then(res => res.json())
            .then(result => {
            });
          this.getFetchMenu();
    }

    update = async (id) => {
         
        let updatedItem = {
            "id":this.state.id,
            "name":this.state.name,
            "price":this.state.price,
        }
      await  fetch("http://localhost:3001/menu/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem)
    })
      .then(res => res.json())
      .then(result => {
       
      });
      
      this.toggleEdit(id,this.state.id,false);
      this.getFetchMenu();   
    }

    toggleEdit = (idx,itemId,type) => {
          let e = this.state.isEdit.map((v,i)=>{ if(i == idx) return !v})
        
         if(type){
          this.setState({
            isEdit : e,
            id: itemId,
            name:this.state.menuList[idx].name,
            price : this.state.menuList[idx].price
          })} else {
            this.setState({
                isEdit : e,
              })
          }
          
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // call parent component's function to update the item
        // this.props.onUpdateItem({ name: this.state.name, price: this.state.price });
        console.log(this.state.price);
        this.update(this.state.id);
        this.toggleEdit(this.state.id); 
      };
    
      newItemHandleSubmit = (event) => {
        event.preventDefault();
        // call parent component's function to update the item
        // this.props.onUpdateItem({ name: this.state.name, price: this.state.price });
       
       this.postNewItem();
      
      
      };

      postNewItem = async () => {
     
        let newItem = {
            "name":this.state.name,
            "price":this.state.price,
        }
    
      await  fetch("http://localhost:3001/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        }).then(
           
        );
      await  this.getFetchMenu()
      this.toggleNewItem()
      }
    

      handleNameChange = (event) => {
        this.setState({ name: event.target.value });
      };
    
      handlePriceChange = (event) => {
        this.setState({ price: event.target.value });
      };

      toggleNewItem = () => {
          this.setState({
            newItem : !this.state.newItem
          })
      }

    render () {

        const newItemD  = (this.state.newItem)?  <form style={{padding:'30px', width:'915px',maxWidth:'1000px' , margin:'0px'}} className='EditForm' onSubmit={this.newItemHandleSubmit}>
       
      <input style={{width:'300px',margin:'10px'}} type="text" value={this.state.name} onChange={this.handleNameChange} />
    
  
      <input style={{width:'300px',margin:'10px 10px'}} type="number" value={this.state.price} onChange={this.handlePriceChange} />
   
    <button className='EditFormSubmit' type="submit">Add Item</button>
  </form> : <div className='PlaceOrder'>
               
               <div className='PlaceOrderHeading' style={{backgroundColor:' rgb(207, 97, 0)'}} onClick={this.toggleNewItem} >Add New Item </div>
            </div>
        
        const menuListBody =<div>{this.state.menuList.map((item,idx)=>(

              this.state.isEdit[idx]? 
              <form style={{padding:'30px', width:'915px',maxWidth:'1000px' , margin:'0px'}} className='EditForm' onSubmit={this.handleSubmit}>
                  <div className='MenuId'> {item.id} </div>
                <input style={{width:'300px',margin:'10px'}} type="text" value={this.state.name} onChange={this.handleNameChange} />
              
            
                <input style={{width:'300px',margin:'10px 10px'}} type="number" value={this.state.price} onChange={this.handlePriceChange} />
             
              <button className='EditFormSubmit' type="submit">Save</button>
            </form> :


              <div className='MenuCard' key={item.id}>
                <div className='MenuId'> {item.id} </div>
                <div className='MenuName'>{item.name} </div>
                <div className='ItemCost'>{item.price}</div>
                <div className='Edit' onClick={()=>this.toggleEdit(idx,item.id,true)} >Edit</div>
                <div className='Delete' onClick={()=>this.delete(item.id)}>Delete</div>
              </div>
        ))}
          {newItemD}
        </div> 
        
       
        return (
            <div className='Menu'>
                   {menuListBody}
            </div>
        )
    }
}

export default MenuCRUD;