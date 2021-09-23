treason-di
===============

**Experimental** Dependency injection library

## Usage

```ts
import { Container, factory } from 'treason-di';

class FooDependency {
  getFoo(): string {
    return 'Foo!';
  }
}

class Foo {
  constructor(
    private dependency: FooDependency,
  ) {}

  getFoo(): string {
    return this.dependency.getFoo();
  }
}

async function fooFactory(container: Container): Promise<Foo> {
  const fooDependency = await container.get<FooDependency>(FooDependency);

  return new Foo(fooDependency);
}

const definitions = new Map();
definitions.set(Foo, factory(fooFactory));

const container = new Container(definitions);

container.get<Foo>(Foo).then(foo => {
  console.log(foo.getFoo()); // Prints "Foo!"
});
```
