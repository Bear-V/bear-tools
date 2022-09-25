function Button({ click, name }) {
  return (
    <div
      className="select-none m-2 pl-2 w-32 text-left text-sm font-bold rounded-r-full bg-blue-100 cursor-pointer
                 hover:bg-blue-200 hover:shadow-lg hover:text-white active:bg-blue-300"
      onClick={click}
    >
      {name}
    </div>
  );
}

export default Button;
