import React from 'react';
import './MenuCRUD.css';
import User from '../../models/User'

import UserData from '../../models/UserData';

class usersCRUD extends React.Component {
    
    state = {
        usersList : [],
        isusers : false,
        count : [],
        totalBill : 0,
        isEdit : [],
        id:'',
        name: '',
        password: '',
        newItem : false,
    }

    getFetchusers = async () => {
        let mList = [];
        await  fetch("https://restaurant-backend-server.onrender.com/users").then(res => res.json()).then(result => mList = result ).catch(console.log);
        console.log(mList)
      
        for(let i = 0 ; i < mList.length; i++) {
            this.state.count.push(0);
        }

        for(let i = 0 ; i < mList.length; i++) {
            this.state.isEdit.push(false);
        }

        this.setState({
            usersList : mList,
            isusers : true,
        })
      }
     
    componentDidMount = () => {
           this.getFetchusers();
    }

    

    save = async () => {
        let uData = null;
        await  fetch("https://restaurant-backend-server.onrender.com/users/"+ UserData.id ).then(res => res.json()).then(result => uData = result ).catch(console.log);
        console.log(uData.orders)
        for(let i = 0; i < this.state.usersList.length; i++) {
            if( this.state.count[i] !== 0 ) {
                let itemName = this.state.usersList[i].name;
                let totalPrize = this.state.count[i] * this.state.usersList[i].password;
                uData.orders.push(
                    {
                        "name":itemName,
                        "password" : totalPrize
                    }
                )
            }
        }

        fetch("https://restaurant-backend-server.onrender.com/users/"+ UserData.id, {
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
      await  fetch("https://restaurant-backend-server.onrender.com/users/"+id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
          })
            .then(res => res.json())
            .then(result => {
            });
          this.getFetchusers();
    }

    update = async (id) => {
         
        let updatedItem = {
            "id":this.state.id,
            "name":this.state.name,
            "password":this.state.password,
        }
      await  fetch("https://restaurant-backend-server.onrender.com/users/" + id, {
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
      this.getFetchusers();   
    }

    toggleEdit = (idx,itemId,type) => {
          let e = this.state.isEdit.map((v,i)=>{ if(i == idx) return !v})
        
         if(type){
          this.setState({
            isEdit : e,
            id: itemId,
            name:this.state.usersList[idx].name,
            password : this.state.usersList[idx].password
          })} else {
            this.setState({
                isEdit : e,
              })
          }
          
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // call parent component's function to update the item
        // this.props.onUpdateItem({ name: this.state.name, password: this.state.password });
        console.log(this.state.password);
        this.update(this.state.id);
        this.toggleEdit(this.state.id); 
      };
    
      newItemHandleSubmit = (event) => {
        event.preventDefault();
        // call parent component's function to update the item
        // this.props.onUpdateItem({ name: this.state.name, password: this.state.password });
       
       this.postNewItem();
      
      
      };

      postNewItem = async () => {
     
        let newItem = {
            "name":this.state.name,
            "password":this.state.password,
            "orders" :[]
        }
    
      await  fetch("https://restaurant-backend-server.onrender.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newItem)
        }).then(
           
        );
      await  this.getFetchusers()
      this.toggleNewItem()
      }
    

      handleNameChange = (event) => {
        this.setState({ name: event.target.value });
      };
    
      handlepasswordChange = (event) => {
        this.setState({ password: event.target.value });
      };

      toggleNewItem = () => {
          this.setState({
            newItem : !this.state.newItem
          })
      }

    render () {

        const newItemD  = (this.state.newItem)?  <form style={{padding:'30px', width:'915px',maxWidth:'1000px' , margin:'0px'}} className='EditForm' onSubmit={this.newItemHandleSubmit}>
       
      <input style={{width:'300px',margin:'10px'}} type="text" value={this.state.name} onChange={this.handleNameChange} />
    
  
      <input style={{width:'300px',margin:'10px 10px'}} type="number" value={this.state.password} onChange={this.handlepasswordChange} />
   
    <button className='EditFormSubmit' type="submit">AddUser</button>
  </form> : <div className='PlaceOrder'>
               
               <div className='PlaceOrderHeading' style={{backgroundColor:' rgb(207, 97, 0)'}} onClick={this.toggleNewItem} >Add New User </div>
            </div>
        
        const usersListBody =<div>{this.state.usersList.map((item,idx)=>(

              this.state.isEdit[idx]? 
              <form style={{padding:'30px', width:'915px',maxWidth:'1000px' , margin:'0px'}} className='EditForm' onSubmit={this.handleSubmit}>
                  <div className='usersId'> {item.id} </div>
                <input style={{width:'300px',margin:'10px'}} type="text" value={this.state.name} onChange={this.handleNameChange} />
              
            
                <input style={{width:'300px',margin:'10px 10px'}} type="number" value={this.state.password} onChange={this.handlepasswordChange} />
             
              <button className='EditFormSubmit' type="submit">Save</button>
            </form> :


              <div className='MenuCard' key={item.id}>
                <div className='MenuId'> {item.id} </div>
                <div className='MenuName'>{item.name} </div>
                <div className='ItemCost'>{item.password}</div>
                <div className='Edit' onClick={()=>this.toggleEdit(idx,item.id,true)} >Edit</div>
                <div className='Delete' onClick={()=>this.delete(item.id)}>Delete</div>
              </div>
        ))}
          {newItemD}
        </div> 
        
       
        return (
            <div className='Menu'>
                   {usersListBody}
            </div>
        )
    }
}

export default usersCRUD;