export interface AtomicInterface {
  aquire(): Promise<() => void>;
}
