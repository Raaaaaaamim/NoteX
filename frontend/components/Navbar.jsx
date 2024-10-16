"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RiMenu4Fill } from "react-icons/ri";

import { groupState } from "@/app/(states)/groupState.js";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

import { groupNotes } from "@/app/(states)/groupNotes.js";
import { notesState } from "@/app/(states)/notesState.js";
import { reloadState } from "@/app/(states)/reloadState.js";
import { userState } from "@/app/(states)/userState.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { app } from "@/firebase/config.js";
import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { Loader, SearchIcon } from "lucide-react";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRecoilState } from "recoil";
import AddCategory from "./AddCategory.jsx";
import SearchCard from "./SearchCard.jsx";
import SideBar from "./SideBar.jsx";
import { ModeToggle } from "./mode-toggle.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Textarea } from "./ui/textarea.jsx";

const Navbar = () => {
  const [title, setTitle] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groupNotesData, setGroupNotesData] = useRecoilState(groupNotes);
  const [reload, setReload] = useRecoilState(reloadState);
  const [notes, setNotes] = useRecoilState(notesState);

  const { toast } = useToast();
  const [searchLoading, setSearchLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const handleLinkClick = () => {
    setIsDialogOpen(false); // This will close the dialog
  };
  const [note, setNote] = useState(null);
  const [group, setGroup] = useRecoilState(groupState);

  const addNote = async () => {
    if (!group || !title) {
      toast({
        title: "An error occurred   ",
        description: "Group and Title is required  ",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/notes/new`,
        {
          title,
          content: note,
          group,
        },
        {
          withCredentials: true,
        }
      );
      setReload(!reload);
      if (notes) {
        setNotes([data, ...notes]);
      }
      if (groupNotesData) {
        setGroupNotesData([data, ...groupNotesData]);
      }
      setLoading(false);

      toast({
        title: "Note Added",
        description: "Note added successfully",
      });
    } catch (err) {
      toast({
        title: "An error occurred",
        description: err?.response?.data?.message || err.message,
      });
      setLoading(false);
      console.log(err);
    }
  };
  let timeoutId;

  const searchInNotesDebounce = (e) => {
    if (e.target.value.length === 0) {
      setSearch(null);
      return;
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    timeoutId = setTimeout(() => {
      const searchNotes = async () => {
        try {
          setSearchLoading(true);
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API}/notes/search/${e.target.value}`,

            {
              withCredentials: true,
            }
          );
          setSearchLoading(false);

          console.log(data);
          setSearch(data);
        } catch (err) {
          setSearchLoading(false);
          toast({
            title: "An error occurred",
            description: err?.response?.data?.message || err.message,
          });
          console.log(err.message);
        }
      };

      searchNotes();
    }, 500);
  };
  const auth = getAuth(app);
  const logout = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/user/logout`,
        {
          withCredentials: true,
        }
      );

      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      console.log(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "An error occurred",
        description: err?.response?.data?.message || err.message,
      });
    }
  };
  const [isLoaded, setIsLoaded] = useState(false); // Track when user is loaded

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoaded(true); // Now that user is loaded, mark it
    console.log(user);
  }, []);
  return (
    <nav className=" fixed bg-background z-10 border-b-[1px] border-border w-[100%]  h-[10vh] flex justify-between items-center ">
      {isLoaded ? (
        <>
          <div className="  lg:flex flex-[2] justify-center items-center ">
            <div className=" hidden lg:flex gap-2 justify-center items-center ">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar variant="outline" className="  cursor-pointer  ">
                    <AvatarImage
                      src={user?.data?.pfp || "https://github.com/vercel.png"}
                    />
                    <AvatarFallback>
                      {user ? user?.fullName?.slice(0, 1) : "X"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className=" w-[140px] ">
                  <Button onClick={logout} className=" w-full text-left">
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>

              <span className=" hidden lg:flex font-[500] ">
                {user?.data?.fullName || "No Name"}
              </span>
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
                      <AvatarImage
                        src={user?.data?.pfp || "https://github.com/vercel.png"}
                      />
                      <AvatarFallback>
                        {user ? user?.data?.fullName?.slice(0, 1) : "X"}
                      </AvatarFallback>
                    </Avatar>

                    <span className=" text-sm  flex font-[500] ">
                      {user?.data?.fullName || "No Name"}
                    </span>
                    <Button
                      onClick={logout}
                      size="sm"
                      variant="outline"
                      className=" ml-3  text-sm w-fit p-2 text-left"
                    >
                      Logout
                    </Button>
                  </div>
                  <SideBar className={" flex w-[320px] "} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className=" flex justify-between flex-[8] items-center  ">
            <Link
              href="/"
              className=" cursor-pointer font-semibold flex-[2] hidden lg:flex "
            >
              All Notes
            </Link>
            <div className=" flex gap-4 justify-end flex-[8]  items-center ">
              <Dialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                className="  "
              >
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CiSearch size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className=" w-[350px] max-h-[90vh] overflow-auto flex justify-center items-center flex-col rounded-[1rem] lg:w-full ">
                  <div className=" gap-0 w-full flex justify-center items-center  ">
                    <SearchIcon className=" scale-[0.75] text-xl text-foreground" />
                    <Input
                      className=" h-4 pt-4  text-sm px-1 py-0 font-[600] border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  "
                      placeholder="Type here to Search..."
                      onChange={searchInNotesDebounce}
                    />
                  </div>
                  <div className=" w-full h-[1px] bg-border "></div>
                  <div className="  justify-center items-center overflow-auto max-h-[90%] w-full flex flex-col gap-2 ">
                    {searchLoading ? (
                      <Loader />
                    ) : (
                      search &&
                      search.map(({ _id, matches: { title, content } }, i) => {
                        const modifiedTitle = title ? title.context : null;
                        const modifiedContent = content
                          ? content.context
                          : null;

                        return (
                          <Link
                            onClick={handleLinkClick}
                            href={`/notes/${_id}`}
                            className={` ${
                              i === 0 && search.length > 4 ? "mt-28" : ""
                            } w-full `}
                          >
                            <SearchCard
                              index={i}
                              title={modifiedTitle}
                              key={_id}
                              id={_id}
                              content={modifiedContent}
                            />
                          </Link>
                        );
                      })
                    )}
                  </div>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Textarea
                    className=" text-sm  border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  "
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <AddCategory />
                  <Button
                    isLoading={loading}
                    disabled={loading}
                    onClick={addNote}
                    className=" ml-4 "
                  >
                    Add Note
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </>
      ) : null}
    </nav>
  );
};

export default Navbar;
