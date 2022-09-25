function Index() {
  return (
    <>
      <div className="h-8 text-center">JSON Tool</div>
      <div className="m-2 h-screen bg-red-200 flex flex-row space-x-1">
        <div className="flex-1 bg-pink-300 p-2 w-full h-full">
          <textarea className="w-full h-full bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 "></textarea>
        </div>
        <div className="bg-blue-300">文字按钮</div>
        <div className="flex-1 bg-orange-300 p-2 w-full h-full">
          <textarea className="w-full h-full bg-gray-50 rounded-lg"></textarea>
        </div>
      </div>
    </>
  );
}

export default Index;
