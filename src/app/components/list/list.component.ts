import { Component, OnInit } from '@angular/core';
// import { Task, TodoItem } from 'src/app/task';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  todoItem: string = '';
  todoItemsArray: any[] =[];
  todoObj: any = {
    todoItem: '',
    isDone: false
  };
  editTaskValue : string = '';
  isMarked : boolean = false;
  display = "none";
  lastValue : string = '';

  constructor() { 
  }

  ngOnInit(): void {
    const localData = localStorage.getItem('todoItems');
    if(localData != null) {
      this.todoItemsArray = JSON.parse(localData);
    }
  }

  onCloseHandled() {
    this.display = "none";
  }

  onItemAdd() {
    this.todoObj.isDone = false;
    this.todoItemsArray.push(this.todoObj);
    localStorage.setItem('todoItems',JSON.stringify(this.todoItemsArray));
    this.todoObj = {
      todoItem: '',
      isDone: false
    };
  }

  deleteTask(items:string) {
    let index = this.todoItemsArray.findIndex(element => element.todoItem === items);
    this.todoItemsArray.splice(index,1);
    localStorage.setItem('todoItems',JSON.stringify(this.todoItemsArray));
    this.todoObj = {
      todoItem: '',
      isDone: false
    };
  }

  getCheckBoxValue(value: boolean, index:number)
  {
    this.todoItemsArray[index].isDone = !value;
    localStorage.setItem('todoItems',JSON.stringify(this.todoItemsArray));
    this.todoObj = {
      todoItem: '',
      isDone: false
    };
  }

  editTask() {
    let index = this.todoItemsArray.findIndex(element => element.todoItem === this.lastValue);
    this.todoItemsArray[index].todoItem = this.editTaskValue;
    this.display = "none";
    localStorage.setItem('todoItems',JSON.stringify(this.todoItemsArray));
    this.todoObj = {
      todoItem: '',
      isDone: false
    };
    this.lastValue = '';
  }

  call(items:string) {
    let index = this.todoItemsArray.findIndex(element => element.todoItem === items);
    this.editTaskValue = this.todoItemsArray[index].todoItem;
    this.display = "block";
    this.lastValue = this.todoItemsArray[index].todoItem;
  }
}
