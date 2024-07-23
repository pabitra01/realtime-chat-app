"use client";
import { IChat, IUser } from "@/src/interface/user";
import { useState, useEffect, useRef } from "react";
import { SendSvg, ServerSvg, UserSvg } from "../common/svgs/SvgPack";

const HomeBody = ({ user }: HomeBodyProps) => {
  const [messages, setMessages] = useState<Array<IChat>>(
    user.chatHistory || []
  );
  const [input, setInput] = useState("");
  const [ws, setWs] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessage = (e: any) => {
    e.preventDefault();
    if (ws && input) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "User", message: input },
      ]);

      ws.send(input);
      setInput("");
    }
  };
  const updateUser = () => {
    const currentUser = { ...user };
    currentUser.chatHistory = [...(user?.chatHistory || []), ...messages];
    const users = JSON.parse(localStorage.getItem("users") || "[]") as IUser[];
    const currentUserIndex = users.findIndex(
      (item) => item.email === user.email
    );
    users[currentUserIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
  };
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:1337");

    socket.onopen = () => {
      setWs(socket);
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "Server", message },
      ]);
    };

    socket.onerror = (error) => {
      console.error(error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, []);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = ""; // Reset height to auto to get scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
    }
  }, [input]);
  useEffect(() => {
    scrollToBottom();
    updateUser();
  }, [messages]);
  // The server is ready to chat. Go ahead, start the conversation!
  return (
    <div className="h-[calc(100%-60px)]">
      <div className="container mx-auto  h-full flex flex-col xl:px-80 lg:px-40 px-10">
        <div className="h-[80px]  w-full"></div>
        <div className=" h-full px-5   overflow-auto scroll-0">
          {messages.map((item, i) => (
            <div className="flex gap-5 mb-10  " key={i}>
              <div
                className={`w-12 h-12 rounded-full flex justify-center items-center ${
                  item.type === "User"
                    ? "border-2 uppercase font-bold text-[#4A25E1] border-black/5"
                    : "bg-gradient-to-tr from-[#4A25E1] to-[#7B5AFF]"
                }  shrink-0 `}
              >
                {item.type === "User" ? user.username : <ServerSvg />}{" "}
              </div>
              <div className="">
                <div className="text-black  font-semibold mb-1">
                  {item.type === "User" ? user.username : item.type}{" "}
                </div>
                <div className="text-black/80">{item.message}</div>
              </div>
            </div>
          ))}
          <div className="" ref={chatBoxRef}></div>
        </div>
        <div className="pb-20 pt-5 ">
          <form
            onSubmit={sendMessage}
            className="bg-white w-full items-center flex py-1 pr-1  rounded-[16px] shadow-lg shadow-slate-400/10"
          >
            <input
              type="text"
              placeholder="Type here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full py-1 bg-transparent outline-none focus:ring-0 text-black px-10"
            />
            <button
              type="submit"
              className="h-14 aspect-square flex justify-center items-center bg-slate-100 hover:bg-slate-200 mt-auto rounded-[12px]"
            >
              <SendSvg />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
type HomeBodyProps = {
  user: IUser;
};
export default HomeBody;
