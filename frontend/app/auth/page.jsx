"use client";
import { FaGoogle } from "react-icons/fa";
// firebase
import { Button } from "@/components/ui/button.jsx";
import { useToast } from "@/hooks/use-toast.js";
import axios from "axios";
import { getAuth, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../(states)/userState.js";
import { app, provider } from "../../firebase/config.js";

const Auth = () => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const [clicked, setClicked] = useState(false);
  const btnText = clicked ? "Sign In with Google" : "Continue with Google";
  const { toast } = useToast();
  const router = useRouter();
  const authorize = async () => {
    try {
      const userInfo = await signInWithPopup(auth, provider);
      if (btnText === "Continue with Google") {
        try {
          setLoading(true);
          const { data } = await axios.post(
            "http://localhost:5000/api/user/create",
            {
              _id: userInfo.user.uid,
              email: userInfo.user.email,
              fullName: userInfo.user.displayName,
              pfp: userInfo.user.photoURL,
              password: userInfo.user.uid,
            },
            { withCredentials: true }
          );
          toast({
            title: "Account Created successfully",
            description: "Redirecting...",
            variant: "success",
          });
          setLoading(false);

          setUser(data);
          router.push("/");
        } catch (error) {
          setLoading(false);

          toast({
            title: "An error occurred",
            description: err?.response?.data?.message || err.message,
          });

          window.location.reload();

          console.log(error.message);
        }
      } else {
        try {
          setLoading(true);
          const data = await axios.post(
            "http://localhost:5000/api/user/login",
            {
              email: userInfo.user.email,

              password: userInfo.user.uid,
            },
            { withCredentials: true }
          );
          setLoading(false);
          setUser(data);
          toast({
            title: " Signed In successfully",
            description: "Redirecting...",
            variant: "success",
          });
          router.push("/");
        } catch (error) {
          setLoading(false);

          toast({
            title: "An error occurred",
            description: err?.response?.data?.message || err.message,
          });
          window.location.reload();
          console.log(error);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center w-[100%] items-center h-screen">
      <div className=" flex flex-col justify-center items-center gap-4">
        <FaGoogle size={30} />
        <Button
          onClick={authorize}
          isLoading={loading}
          variant="outline"
          size="sm"
        >
          {btnText}
        </Button>
        <Button onClick={() => setClicked(!clicked)} variant="link" size="sm">
          {clicked ? "Sign Up" : "Sign In"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
