export class Item {    
  id?: string;
  task: string;
  priority: number;
  createdAt: number;

  constructor (task: string, priority: number, createdAt: number, id?: string){
     this.id = id
     this.task = task
     this.priority = priority
     this.createdAt = createdAt
  }
}
