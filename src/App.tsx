import { ref, SetupContext, reactive } from "vue";
import {
  useState,
  useWatch,
  useOnMounted,
  useOnUpdated,
  useOnUnmounted,
  useComputed,
  useWatchEffect,
} from "./compositionForHooksImplement";
import { defineFunctionComponent } from "./defineFunctionComponent";

export const App = defineFunctionComponent(() => {
  const time = ref(Date());

  setInterval(() => {
    time.value = Date();
  });

  return {
    render() {
      return (
        <>
          <h1>时间: defineFunctionComponent 函数工厂组件</h1>
          <h2>
            <Clock time={time.value}></Clock>
          </h2>
          <h1>计数器：纯函数组件 with composition api 的 Hooks 实现</h1>
          <h2>
            <Counter time={time.value}></Counter>
          </h2>
        </>
      );
    },
  };
});

const Clock = defineFunctionComponent((props: { time: string }) => {
  return {
    render() {
      return <span>{props.time}</span>;
    },
  };
});

const Counter = (props: { time: string }, ctx: SetupContext) => {
  const state = useState(reactive({ count: 0 }));
  const double = useComputed(() => {
    return state.count * 2;
  });

  useWatch(state, () => {
    console.log("useWatch", state.count);
  });

  useWatchEffect(() => {
    console.log("useWatchEffect double", double.value);
  });

  useOnUpdated(() => {
    console.log("useOnUpdated");
  });

  useOnMounted(() => {
    console.log("useOnMounted");
  });

  useOnUnmounted(() => {
    console.log("useOnUnmounted");
  });

  return (
    <div>
      <h2>
        count:{state.count};double:{double.value}
        <button
          onClick={() => {
            state.count++;
          }}
          style={{
            border: "none",
            backgroundColor: "lightgreen",
            borderRadius: "8px",
            fontSize: "24px",
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 8px",
            margin: "0 8px",
            cursor: "pointer",
          }}
        >
          increase
        </button>
      </h2>
      <h4>{props.time}</h4>
    </div>
  );
};
