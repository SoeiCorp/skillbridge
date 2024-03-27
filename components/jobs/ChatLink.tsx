import getChatroomId from "@/actions/chat/getChatRoomId";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
    studentId?: string;
    employerId?: string;
    jobId: string;
    className?: string;
};

function ChatLink({
    studentId = "",
    employerId = "",
    jobId,
    className = "",
}: Props) {
    const [chatroomId, setChatroomId] = useState<string>("");
    const userId = useSession().data?.user?.id ?? "";

    if (studentId === "") {
        useEffect(() => {
            const getChatroom = async () => {
                const chatroom = await getChatroomId(userId, employerId, jobId);
                setChatroomId(chatroom);
            };
            getChatroom();
        }, []);
    } else {
        useEffect(() => {
            const getChatroom = async () => {
                const chatroom = await getChatroomId(studentId, userId, jobId);
                setChatroomId(chatroom);
            };
            getChatroom();
        }, []);
    }
    return (
            <Link className={className} href={`/chat/${chatroomId}`}>
                <Image
                    src={"/icons/chat.svg"}
                    alt="chat"
                    width={13}
                    height={13}
                    className="mr-[3px]"
                />
                <p className="text-[#334155]">แชท</p>
            </Link>
    );
}

export default ChatLink;
