import { groupNotes } from "@/app/(states)/groupNotes.js";
import { notesState } from "@/app/(states)/notesState.js";
import { reloadState } from "@/app/(states)/reloadState.js";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { useRecoilState } from "recoil";
import { Button } from "./ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog.jsx";

const DeleteConfirmation = ({ children, id, callback = () => {} }) => {
  const [notes, setNotes] = useRecoilState(notesState);
  const [reload, setReload] = useRecoilState(reloadState);

  const [groupNotesData, setGroupNotesData] = useRecoilState(groupNotes);
  const { toast } = useToast();

  const deleteNote = async () => {
    try {
      const { data } = await axios.delete(
        ` ${process.env.NEXT_PUBLIC_API}/notes/${id}`,
        {
          withCredentials: true,
        }
      );
      if (notes) {
        setNotes(notes.filter((note) => note._id !== data.id));
      }

      if (groupNotesData) {
        setGroupNotesData(
          groupNotesData.filter((note) => note._id !== data.id)
        );
      }
      callback();
      setReload(!reload);
      toast({
        title: "Note Deleted",
        description: data.message,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className=" overflow-hidden w-[300px] lg:w-full rounded-md ">
        <div className=" flex flex-col  justify-center items-center">
          <h1 className=" text-center  font-roboto_mono font-[600]">
            Are you sure you want to delete this note?
          </h1>
        </div>
        <Button
          onClick={() => {
            deleteNote();
          }}
          className="cursor-pointer  "
        >
          Yes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmation;
