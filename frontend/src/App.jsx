function App() {
  return (
    <div>
      <form className="flex flex-col gap-7 p-4 w-[50%] mx-auto mt-20 ">
        <input type="text" placeholder="Enter blood group" className="border-2 h-10 p-2"/>
        <input type="number" placeholder="Enter age" min="10" max="100" className="border-2 h-10 p-2"/>
        <input type="number" placeholder="enter height" className="border-2 h-10 p-2"/>
        <input type="number" placeholder="enter weight" className="border-2 h-10 p-2"/>
        <textarea placeholder="enter description of disease" className="border-2 h-32 p-2"></textarea>
        <button>Add symptom +</button>
        <button className="w-fit p-2 bg-green-300 border-2 cursor-pointer">Submit</button>
      </form>
    </div>
  )
}

export default App
