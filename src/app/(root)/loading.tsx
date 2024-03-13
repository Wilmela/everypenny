import Spinner from "@/components/shared/Spinner";

const Loading = () => {
  return (
    <div className="h-screen w-full items-center justify-center flex">
      <Spinner className="text-green-500 font-bold" /> &nbsp;
      <p className="p-text">Loading...</p>
    </div>
  );
};

export default Loading;
