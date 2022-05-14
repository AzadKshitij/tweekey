import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App bg-black min-h-screen flex max-w-[1600px] mx-auto">
      <div class="flex flex-row w-full h-20 justify-end">
        <div class="w-56 text-white font-bold pt-4 pl-4 text-3xl bg-green-700 mr-auto">May 2022</div>
        <div class="w-10 text-white bg-red-800">02</div>
        <div class="w-10 text-white bg-amber-400">03</div>
        <div class="w-10 text-white bg-teal-600">04</div>
        <div class="w-10 text-white bg-lime-400">05</div>
      </div>

      
      
    </div>
  );
}

export default App;
