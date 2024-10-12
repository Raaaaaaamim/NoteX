import { Card } from "./ui/card.jsx";

const SearchCard = ({ title, content, id, index }) => {
  return (
    <>
      
        <Card className=" w-full rounded-sm  cursor-pointer h-[20%] flex justify-between items-start flex-col ">
          <h1 className=" mb-2 overflow-ellipsis  mt-6 ml-3 font-semibold text-md ">
            {title ? (
              <>
                {title[0]}
                <span className=" bg-yellow-700 ">{title[1]}</span>
                {title[2]}
              </>
            ) : (
              "No title matched"
            )}
          </h1>
          <div className=" w-full bg-border h-[1px] "></div>
          <p className=" mt-2 mb-6  ml-3 text-sm ">
            {content ? (
              <>
                {content[0]}
                <span className=" bg-yellow-700 ">{content[1]}</span>
                {content[2]}
              </>
            ) : (
              "No content matched"
            )}
          </p>
        </Card>
      
    </>
  );
};

export default SearchCard;
