import { Config, Singleton, Tools, ColorSettings } from './Config/Config';

export default class Base {
	protected config: Config;
	protected tools: Tools;

  constructor() {
    let singleton = Singleton.get();
		this.config = singleton.config;
		this.tools = singleton.tools;
  }
}
