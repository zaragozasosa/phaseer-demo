import Factory from './Base/Factory';

export default class TransitionFactory extends Factory {
  changeState(state: string, ...args) {
    this.game.state.start(state, true, false, ...args);
  }

  toState(state: string, gameboardConfig: any, ...args) {
    this.changeState(
      'Transition',
      gameboardConfig,
      () => this.changeState(state, ...args)
    );
  }

  toStateConfig(state: string, gameboardConfig: any, ...args) {
    this.toState(state, gameboardConfig, gameboardConfig, ...args);
  }

  toLoader(
    state: string,
    gameboardConfig: any,
    loader = null,
    ...args
  ) {
    this.changeState(
      'Transition',
      gameboardConfig,
      () => this.changeState(state, ...args),
      true,
      loader
    );
  }

  toLoaderConfig(
    state: string,
    gameboardConfig: any,
    loader = null,
    ...args
  ) {
    this.toLoader(state, gameboardConfig, loader, gameboardConfig, ...args);
  }

  smoothLoaderConfig(
    state: string,
    gameboardConfig: any,
    loader = null,
    ...args
  ) {
    this.changeState(
      'Transition',
      gameboardConfig,
      () => this.changeState(state, gameboardConfig, ...args),
      false,
      loader
    );
  }

  restartState(...args) {
    this.game.state.restart(true, false, ...args);
  }
}
