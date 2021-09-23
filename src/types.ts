import Container from './Container';

export type FactoryCallback = (container: Container) => Promise<any>

export interface Factory {
  callback: FactoryCallback,
  isFactory: true,
}

export type Class = { new(...args: any[]): any; };

export type DefinitionMap = Map<Class|string, any>
