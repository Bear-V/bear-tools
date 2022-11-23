function Button({click, name}) {
  return (
    <div
      className="select-none w-auto px-2 text-center text-sm font-bold rounded-full bg-blue-100 cursor-pointer
                 hover:bg-blue-200 hover:shadow-lg hover:text-white active:bg-blue-300"
      onClick={click}
    >
      {name}
    </div>
  );
}

export default Button;
