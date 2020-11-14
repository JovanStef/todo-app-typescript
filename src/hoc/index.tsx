// json-server --watch src/db.json --port 3004

import React from "react";

//SERVICES
import {
  completedActions,
  deletedActions,
  filterActions,
} from "../services/todoService";
import {
  sortByCompleted,
  sortByDate,
  sortByImportance,
  sortByName,
} from "../services/helpers";
//MODELS
import { IProps } from "../models/IProps";
import { IState } from "../models/IState";
import { ITodo } from "../models/ITodo";
//COMPONENTS
import Todolist from "../components/todoList";
import CreateTodo from "../components/createTodo";
import FilterTodo from "../components/filterTodo";

export class Layout extends React.Component<{}, IState, IProps> {
  constructor(state: IState) {
    super(state);
  }
  getUrl = "http://localhost:3004/todos";
  setUrl = "http://localhost:3004/todos";
  updateUrl = "http://localhost:3004/todos";
  deleteUrl = "http://localhost:3004/todos";
  subscriptUpdate: any;
  subscriptDelete: any;
  subscriptFilter: any;

  state: IState = {
    todoList: [],
    error: false,
    loading: true,
  };
  getTodos = async (url: string): Promise<any> => {
    await fetch(url)
      .then((res) => {
        if (!res.ok) {
          this.setState({ error: true, loading: false });
          throw Error(res.statusText);
        }
        return res;
      })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          todoList: [...result],
          loading: false,
        });
      })
      .catch((error) => {
        console.log("Error:", error);
        this.setState({ error: true, loading: false });
      });
  };

  addTodo = async (url: string = "", data: ITodo | any = {}): Promise<any> => {
    this.setState({
      loading: true,
    });
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then(() => {
      this.setState({
        todoList: [...this.state.todoList, data],
        loading: false,
      });
    });
  };

  deleteTodo = async (
    url: string = "",
    data: ITodo | any = {}
  ): Promise<ITodo | any> => {
    this.setState({
      loading: true,
    });
    const response = await fetch(url + "/" + data.id, {
      method: "DELETE",
    }).then((res) => {
      this.setState({
        todoList: this.state.todoList.filter((t) => t.id !== data.id),
        loading: false,
      });
      return res.json();
    });
  };
  updateTodo = async (
    url: string = "",
    data: ITodo | any = {}
  ): Promise<ITodo | any> => {
    this.setState({
      loading: true,
    });
    const response = await fetch(url + "/" + data.id, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }).then((res) => {
      this.setState({
        todoList: this.state.todoList.map((t) => {
          if (t.id === data.id) {
            t.completed = data.completed;
          }
          return t;
        }),
        loading: false,
      });
      return res.json();
    });
  };

  handleCreateTodo = async (props: any): Promise<ITodo | any> => {
    await this.addTodo(this.setUrl, props).then((data) =>
      console.log("todo created")
    );
  };

  componentDidMount() {
    setTimeout(() => {
      this.getTodos(this.getUrl);
    }, 2000);

    this.subscriptUpdate = completedActions
      .getCompletedTodo()
      .subscribe((todo: unknown) => {
        this.updateTodo(this.updateUrl, todo);
      });
    this.subscriptDelete = deletedActions
      .getDeletedTodo()
      .subscribe((todo: unknown) => {
        this.deleteTodo(this.deleteUrl, todo);
      });

    this.subscriptFilter = filterActions
      .getFilterTodo()
      .subscribe((opt: any) => {
        console.log(opt.criteria);
        switch (opt.criteria) {
          case "name":
            this.setState({
              todoList: [...sortByName(this.state.todoList)],
            });
            break;
          case "importance":
            this.setState({
              todoList: [...sortByImportance(this.state.todoList)],
            });
            break;
          case "completed":
            this.setState({
              todoList: [...sortByCompleted(this.state.todoList)],
            });
            break;
          default:
            console.log(sortByDate(this.state.todoList, opt.criteria));
            this.setState({
              todoList: [...sortByDate(this.state.todoList, opt.criteria)],
            });
            break;
        }
      });

    // try{
    //     this.subscriptionTodo = loadTodos(this.getUrl).subscribe((todos:unknown)=>{
    //         this.setState({
    //             todoList:todos,
    //             loading:false
    //         })
    //     })
    // }catch(err){
    //     this.setState({
    //         loading:false,
    //         error:true
    //     })
    // }
  }
  componentWillUnmount() {
    this.subscriptUpdate.unsubscribe();
  }

  render() {
    const { todoList, error, loading } = this.state;
    return (
      <div>
        <h1 className="display-4">Todo App</h1>
        <p>
          {error
            ? "We are having trouble displaying content please try again later"
            : null}
        </p>
        <div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="spinner-border text-secondary"
                role="status"
              ></div>
            </div>
          ) : (
            <div>
              <div className="d-flex flex-wrap justify-content-around">
                <CreateTodo todoFromChild={this.handleCreateTodo} />
                <FilterTodo />
              </div>
              <Todolist todoList={todoList} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
