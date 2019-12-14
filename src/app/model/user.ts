export class User {    
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
  image: string;

  constructor (email: string, firstname: string, lastname: string, createdAt: Date, image: string, id?: string){
     this.id = id
     this.email = email,
     this.firstname = firstname, 
     this.lastname = lastname,
     this.createdAt = createdAt,
     this.image = image
  }
}
