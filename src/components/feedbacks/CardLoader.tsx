export const CardLoader = () => {
  return (
    <div className="border border-blue-300   p-4 max-w-sm w-full  h-full flex justify-center pt-24">
      <div className="animate-pulse flex flex-col space-x-4 w-full items-center ">
        <div className="rounded-lg  bg-blue-400/30 h-52 w-full "></div>
        <div className="  w-full flex pt-12">
          <div className="h-24  bg-blue-400/30 rounded-lg w-full mr-2"></div> 
          <div className="h-24  bg-blue-400/30 rounded-lg w-full mr-2"></div> 
          <div className="h-24  bg-blue-400/30 rounded-lg w-full"></div> 
          
        </div>
        <div className="h-14  bg-blue-400/30 rounded-lg w-full mt-14"></div> 
      </div>
    </div>
  );
};
