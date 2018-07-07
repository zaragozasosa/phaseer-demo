export default class PowerModel {
  id: string;
  name: string;
  description: string;
  requeriments: string;
  backgroundId: string
  
  constructor(
    id: string,
    name: string,
    description: string,
    requeriments = null,
    backgroundId = 'witch'
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.requeriments = requeriments;
    this.backgroundId = backgroundId;
  }
}