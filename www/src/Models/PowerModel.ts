export default class PowerModel {
  id: string;
  name: string;
  description: string;
  requeriments: string;
  
  constructor(
    id: string,
    name: string,
    description: string,
    requeriments = null,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.requeriments = requeriments;
  }


}