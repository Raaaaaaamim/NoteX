import { cn } from "@/lib/utils.js";

const Loader = ({ className }) => {
  return (
    <div
      className={cn(
        " w-[50px] h-[50px] border-border border-y-[1px] animate-spin rounded-full ",
        className
      )}
    ></div>
  );
};

export default Loader;
