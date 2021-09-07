import { ref, SetupContext, reactive } from "vue";
import {
  useState,
  useWatch,
  useOnMounted,
  useOnUpdated,
  useOnUnmounted,
  useComputed,
  useWatchEffect,
} from "./compositionApiImplForHooks";
import { defineFunctionComponent } from "./defineFunctionComponent";
import Counter from "./Test.vue";
export const App = defineFunctionComponent(() => {
  const time = ref(Date());

  setInterval(() => {
    time.value = Date();
  });

  const show = ref(true);

  return {
    render() {
      return (
        <>
          <button
            onClick={() => {
              show.value = !show.value;
            }}
          >
            show
          </button>
          {show.value && <Clock></Clock>}

          <Clock></Clock>
          <Clock></Clock>

          {show.value && <Clock></Clock>}
          <Counter></Counter>
        </>
      );
    },
  };
});

const Clock = defineFunctionComponent((props: {}) => {
  const state = ref(0);

  return {
    render() {
      return (
        <div
          onClick={() => {
            state.value++;
          }}
        >
          {state.value}
        </div>
      );
    },
  };
});
