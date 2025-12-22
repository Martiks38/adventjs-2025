import { createInterface, Interface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/**
 * Singleton de Readline basado en node:readline/promises.
 * Provee una única instancia de Readline para todo el proceso.
 */
export class ReadlineSingleton {
  // instancia privada estática
  static #instance: Interface | null = null;

  // impedir instanciación directa
  private constructor() {}

  /**
   * Obtiene la instancia única de Readline.
   * Si no existe, la crea con stdin/stdout del proceso.
   */
  public static get instance(): Interface {
    if (!ReadlineSingleton.#instance) {
      ReadlineSingleton.#instance = createInterface({
        input,
        output,
        terminal: true, // opcional: habilita comportamiento de TTY (prompt, etc.)
      });
    }

    return ReadlineSingleton.#instance;
  }

  /**
   * Cierra la interfaz y resetea el singleton para permitir recreación.
   */
  public static close(): void {
    ReadlineSingleton.#instance?.close();
    ReadlineSingleton.#instance = null;
  }
}
