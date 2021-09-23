import { Factory, FactoryCallback } from './types';

export default function factory(callback: FactoryCallback): Factory {
  return {
    callback,
    isFactory: true,
  };
}
