import { Card } from "./ui/card.jsx";

const SearchCard = ({ title, content }) => {
  return (
    <>
      <Card className=" w-full rounded-sm  cursor-pointer h-[20%] flex justify-between items-start flex-col ">
        <h1 className=" overflow-ellipsis  mt-6 ml-3 font-semibold text-md ">
          {title[0]}
          <span className=" font-bold bg-yellow-600 ">{title[1]}</span>
          {title[2]}
        </h1>
        <p className=" mt-2 mb-6  ml-3 text-sm ">{content}</p>
      </Card>
    </>
  );
};

export default SearchCard;
