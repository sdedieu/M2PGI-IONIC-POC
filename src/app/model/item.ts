export class Item {    
  id?: string;
  task: string;
  priority: number;
  createdAt: number;
  createdBy: string;

  constructor (task: string, priority: number, createdAt: number, createdBy: string, id?: string){
     this.id = id
     this.task = task
     this.priority = priority
     this.createdAt = createdAt
     this.createdBy = createdBy
  }
}
