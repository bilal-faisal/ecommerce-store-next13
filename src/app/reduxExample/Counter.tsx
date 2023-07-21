"use client";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "@/store/slice/counterSlice";
import { RootState } from "@/store/store";

const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.counterSlice.value);
  function incrementFunc() {
    dispatch(counterActions.increment());
  }
  function decrementFunc() {
    dispatch(counterActions.decrement());
  }

  return (
    <div className="flex items-center">
      <button className="py-2 px-4 m-2 bg-red-400" onClick={decrementFunc}>
        -
      </button>
      <p>value {value}</p>
      <button className="py-2 px-4 m-2 bg-green-400" onClick={incrementFunc}>
        +
      </button>
    </div>
  );
};

export default Counter;
