import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CgProfile } from "react-icons/cg";
import { RiMenu4Fill } from "react-icons/ri";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CiSearch } from "react-icons/ci";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GoTasklist } from "react-icons/go";
import { VscSettings } from "react-icons/vsc";
import AddCategory from "./AddCategory.jsx";
import SideBar from "./SideBar.jsx";
import { ModeToggle } from "./mode-toggle.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Textarea } from "./ui/textarea.jsx";
const Navbar = () => {
  return (
    <div className=" fixed bg-background z-10 border-b-[1px] border-border w-[100%]  h-[10vh] flex justify-between items-center ">
      <div className="  lg:flex flex-[2] justify-center items-center ">
        <div className=" hidden lg:flex gap-2 justify-center items-center ">
          <Avatar>
            <AvatarImage src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND6_DiIRY8CO25H_Er1HPUEL_Ir2C-fzXUg&s " />
            <AvatarFallback>TR</AvatarFallback>
          </Avatar>
          <span className=" hidden lg:flex font-[500] ">Tahmid Ramim</span>
        </div>

        <Sheet>
          <SheetTrigger className=" cursor-pointer " asChild>
            <div className=" flex justify-center items-center lg:hidden ">
              <RiMenu4Fill size={22} />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className=" w-[320px]   ">
            <div className=" flex w-full  justify-center items-start flex-col ">
              <div className="  lg:hidden flex gap-2 justify-center items-center ">
                <Avatar className=" cursor-pointer w-8 h-8 ">
                  <AvatarImage src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRND6_DiIRY8CO25H_Er1HPUEL_Ir2C-fzXUg&s " />
                  <AvatarFallback>TR</AvatarFallback>
                </Avatar>
                <span className=" text-sm  flex font-[500] ">Tahmid Ramim</span>
              </div>
              <SideBar className={" flex w-[320px] "} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className=" flex justify-between flex-[8] items-center  ">
        <h1 className=" flex-[2] hidden lg:flex ">Your Notes</h1>
        <div className=" flex gap-4 justify-end flex-[8]  items-center ">
          <Dialog className="  ">
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <CiSearch size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className=" w-[350px] rounded-[1rem] lg:w-full ">
              <Command>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem className=" flex justify-start items-center gap-1 ">
                      <FaRegNoteSticky />
                      <span>Notes</span>
                    </CommandItem>
                    <CommandItem className=" flex justify-start items-center gap-1 ">
                      <GoTasklist />

                      <span>Tasks</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem className=" flex justify-start items-center gap-1 ">
                      <CgProfile />

                      <span>Profile</span>
                    </CommandItem>
                    <CommandItem className=" flex justify-start items-center gap-1 ">
                      <VscSettings />

                      <span>Settings</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </Dialog>

          <ModeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button className=" mr-4 ">Add Note</Button>
            </DialogTrigger>
            <DialogContent className="  w-[350px] rounded-lg lg:w-full">
              <Input
                className=" text-xl font-[600] border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  "
                placeholder="Title"
              />
              <Textarea
                className=" text-sm  border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  "
                placeholder="Note"
              />
              <AddCategory />
              <Button className=" ml-4 ">Add Note</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
