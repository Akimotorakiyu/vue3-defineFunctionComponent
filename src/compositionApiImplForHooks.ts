import {
  getCurrentInstance,
  onMounted,
  watch,
  WatchStopHandle,
  WatchSource,
  WatchCallback,
  WatchOptions,
  computed,
  ComputedRef,
  watchEffect,
  onUpdated,
  onUnmounted,
  onBeforeUnmount,
  nextTick,
  onDeactivated,
  queuePostFlushCb,
} from "vue";
type MultiWatchSources = (WatchSource<unknown> | object)[];
type MapSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V>
    ? Immediate extends true
      ? V | undefined
      : V
    : T[K] extends object
    ? Immediate extends true
      ? T[K] | undefined
      : T[K]
    : never;
};
const hookSymbol = Symbol("hookSymbol");
interface HookState {
  states: unknown[];
  currentIndex: number;
  initial: boolean;
}

export const useState = <T>(state: T): T => {
  const instance = getCurrentInstance();

  let hookState: HookState = Reflect.get(instance, hookSymbol);

  if (!instance.isMounted) {
    if (!hookState) {
      hookState = {
        states: [state],
        currentIndex: 0,
        initial: true,
      };
      Reflect.set(instance, hookSymbol, hookState);
    } else {
      hookState.currentIndex++;
      hookState.states.push(state);
    }
  } else {
    hookState.currentIndex++;
    if (hookState.states.length === hookState.currentIndex) {
      hookState.currentIndex = 0;
    }
  }

  return hookState.states[hookState.currentIndex] as T;
};
export interface UseWatch {
  <T extends MultiWatchSources, Immediate extends Readonly<boolean> = false>(
    sources: [...T],
    cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;
  <
    T extends Readonly<MultiWatchSources>,
    Immediate extends Readonly<boolean> = false
  >(
    source: T,
    cb: WatchCallback<MapSources<T, false>, MapSources<T, Immediate>>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;

  <T, Immediate extends Readonly<boolean> = false>(
    source: WatchSource<T>,
    cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;

  <T extends object, Immediate extends Readonly<boolean> = false>(
    source: T,
    cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
    options?: WatchOptions<Immediate>
  ): WatchStopHandle;
}

export const useWatch = ((source, watchCallback, option) => {
  const instance = getCurrentInstance();
  let watchStopHandle: WatchStopHandle;
  if (!instance.isMounted) {
    watchStopHandle = watch(source, watchCallback, option);
  }

  return useState(watchStopHandle);
}) as unknown as UseWatch;

export const useComputed = <T>(fn: () => T) => {
  const instance = getCurrentInstance();
  let computedRef: ComputedRef;
  if (!instance.isMounted) {
    computedRef = computed(fn);
  }
  return useState(computedRef);
};

export const useWatchEffect = <T>(fn: () => T) => {
  const instance = getCurrentInstance();
  let watchStopHandle: WatchStopHandle;
  if (!instance.isMounted) {
    watchStopHandle = watchEffect(fn);
  }
  return useState(watchStopHandle);
};

export const useOnMounted = <T>(fn: () => void) => {
  const instance = getCurrentInstance();
  if (!instance.isMounted) {
    queuePostFlushCb(fn);
  }
};

export const useOnUpdated = <T>(fn: () => void) => {
  const instance = getCurrentInstance();
  if (!instance.isMounted) {
    onUpdated(fn, instance);
  }
};

export const useOnUnmounted = <T>(fn: () => void) => {
  const instance = getCurrentInstance();
  if (!instance.isMounted) {
    // const i = instance as unknown as { um: (() => void)[] };
    // if (!i.um) {
    //   i.um = [];
    // }
    // i.um.push(fn);

    onUnmounted(fn, instance);
  }
};
