import { createInterface, Interface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export class ReadlineSingleton {
  static #instance: Interface | null = null;

  private constructor() {}

  public static get instance(): Interface {
    if (!ReadlineSingleton.#instance) {
      ReadlineSingleton.#instance = createInterface({
        input,
        output,
        terminal: true,
      });
    }

    return ReadlineSingleton.#instance;
  }

  public static close(): void {
    ReadlineSingleton.#instance?.close();
    ReadlineSingleton.#instance = null;
  }
}
