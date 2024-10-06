import { Anton, Roboto, Roboto_Mono } from "next/font/google";

import { Badge } from "./ui/badge.jsx";
import { Card } from "./ui/card.jsx";
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "600"] });
const NoteCard = ({ note, date, category, title }) => {
  return (
    <Card className="  flex flex-col justify-center items-center lg:w-[330px] w-[340px] h-56 ">
      <div className=" w-[90%] cursor-pointer h-[20%] flex justify-between items-center ">
        <span className=" edu text-base ">{title}</span>
        <Badge className={" justify-center items-center flex "}>
          <span>{category}</span>
        </Badge>
      </div>
      <h2 className=" h-[60%] overflow-hidden text-sm w-[90%] ">{note}</h2>
      <div className=" h-[20%] w-[90%] flex justify-between items-center ">
        <span className={`${robotoMono.className} font-bold text-xs  `}>
          09:38 PM
        </span>
        <span className=" font-[500] text-xs  ">07 JANUARY 2023</span>
      </div>
    </Card>
  );
};

export default NoteCard;
