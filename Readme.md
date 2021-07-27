# vue3 defineFunctionComponent

## Features

## usecase

- defineFunctionComponent
- pure function component with composition-api implement for hooks
  - useState
  - useComputed
  - useWatch, useWatchEffect
  - useOnUpdated, useOnMounted, useOnUnmounted

```tsx
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
```
