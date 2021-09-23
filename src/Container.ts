import DiClassCreationError from './Error/DiClassCreationError';
import DiFactoryError from './Error/DiFactoryError';
import NotDefinedError from './Error/NotDefinedError';
import { FactoryCallback, Class, DefinitionMap } from './types';

export default class Container {
  private definitions: DefinitionMap;

  constructor(definitions: DefinitionMap|null = null) {
    if (definitions === null) {
      definitions = new Map<Class|string, any>();
    }

    this.definitions = definitions;
  }

  public async get<T>(name: Class|string): Promise<T> {
    if (typeof name === 'string' || this.definitions.has(name) === true) {
      return this.getByDefinition(name);
    }

    let instance;
    try {
      instance = new name();
    } catch (error) {
      console.error(new DiClassCreationError('Error during class creation'));
      throw error;
    }
    this.definitions.set(name, instance);
    return instance;
  }

  private async getByDefinition<T>(name: Class|string): Promise<T> {
    if (this.definitions.has(name) === false) {
      throw new NotDefinedError(`No definition for "${name}"`);
    }

    const result = this.definitions.get(name);

    if (result.isFactory === true && typeof result.callback === 'function') {
      const factory: FactoryCallback = result.callback;

      let factoryResult;
      try {
        factoryResult = await factory(this);
      } catch (error) {
        console.error(new DiFactoryError('Error during Factory execution'));
        throw error;
      }
      this.definitions.set(name, factoryResult);
      return factoryResult;
    }

    return result;
  }
}
