import Link from "next/link.js";
import { Button } from "./ui/button.jsx";

const SideBtn = ({ className, text, itemsCount }) => {
  return (
    <Link
      className=" hover:bg-border ease-in duration-100 group border-b-[1px] flex gap-2 justify-between items-center border-border h-14 font-[500] cursor-pointer w-full"
      href={`/${text}`}
    >
      <div className=" flex ml-2 gap-2 justify-center items-center ">
        <div className=" ease-in duration-100 group-hover:border-foreground border-border border-[1px] w-4 h-4 rounded-full "></div>
        <span>{text}</span>
      </div>
      <Button className=" mr-2 font-bold " variant="outline" size="sm">
        {itemsCount > 9 ? `9+` : `0${itemsCount}`}
      </Button>
    </Link>
  );
};

export default SideBtn;
