import { Item } from './item';

export class List {    
  id?: string;
  itemsList? : Array<Item>;
  title: string;
  subtitle: string;
  image: string;

  constructor (title: string, subtitle: string, image: string, itemsList?: Array<Item>, id?: string){
     this.id = id
     this.itemsList = itemsList || [];
     this.title = title;
     this.subtitle = subtitle;
     this.image = image;
  }
}
