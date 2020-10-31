// json-server --watch src/db.json --port 3004


import React  from 'react';

//MODELS
import { IProps } from '../models/IProps';
import { IState } from '../models/IState';
//COMPONENTS
import Todolist from '../components/todoList';
import CreateTodo from '../components/createTodo';
export class Layout extends React.Component<{},IState,IProps> {
    getUrl = "http://localhost:3004/todos";
    setUrl = "http://localhost:3004/todos"


        state={
            todoList:[],
            error:false,
            loading:true
        }
        getTodos=async(url:string)=>{
            await fetch(url)
            .then((res)=>{
                if (!res.ok) {
                    this.setState({error:true ,loading:false})
                    throw Error(res.statusText);
                }
                return res;
            })
            .then(res=>res.json())
            .then(
                (result) =>{
                    console.log(result)
                    this.setState({
                        todoList:[...result],
                        loading:false
                    })
                }
                ).catch((error) => {
                    console.log('Error:', error);
                    this.setState({error:true,loading:false})
                });
        }

        setTodos=async(url:string='',data:object={})=>{
            const response = await fetch(url, {
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                  'Content-Type': 'application/json'                  
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify(data) 
              });
              return response.json();
        }

        handleCreateTodo=async(props:any)=>{
            await this.setTodos(this.setUrl,props).then(data=>console.log(data))
            await this.getTodos(this.getUrl)
            console.log(props)
        }
        componentDidMount(){
            this.getTodos(this.getUrl)
            }
            render(){
                const {todoList,error,loading} = this.state
    return (
    <div>
        <h1 className="display-4">Todo App</h1>
    <p>{error ?'We are having trouble displayin content please try again later':null}</p>
    <p>{loading ?'Loading ...':null}</p>

        <CreateTodo todoFromChild={this.handleCreateTodo}/>
        <Todolist todoList={todoList}/>
        </div>
        
        )
}

}