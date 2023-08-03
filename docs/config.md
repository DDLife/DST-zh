# config.lua

## TheConfig

<docs-expose>

@Config()

</docs-expose>

## local

### Config

<docs-expose>

```ts
interface ConfigOptions {
  [key: string]: boolean;
}

class Config {
  constructor(options?: ConfigOptions);
  setOptions(options: ConfigOptions): void;
  isEnabled(option: string): boolean;
  enable(option: string): void;
  disable(option: string): void;
  toString(): string;
}
```

</docs-expose>
