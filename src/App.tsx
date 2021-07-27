import { ref } from "vue";

import { defineFunctionComponent } from "./defineFunctionComponent";

const Clock = defineFunctionComponent((props: { time: string }) => {
  return {
    render() {
      return <span>{props.time}</span>;
    },
  };
});

export const App = defineFunctionComponent(() => {
  const time = ref(Date());

  setInterval(() => {
    time.value = Date();
  });

  return {
    render() {
      return (
        <>
          <h1>时间</h1>
          <h2>
            <Clock time={time.value}></Clock>
          </h2>
        </>
      );
    },
  };
});
