import ChatRoomHeader from "./ChatRoomHeader"
import ChatMessageList from "./ChatMessageList"
import ChatInput from "./ChatInput"
import { getChatRoomInfo } from "@/actions/chat/getChatRoomInfo"

type Props = {
    isStudent: boolean,
    chatroomId: string,
}

export default async function ChatRoom({ isStudent, chatroomId }: Props) {
    const chatRoomInfo = await getChatRoomInfo(chatroomId)

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-neutral-100 border border-[#CBD5E1] lg:h-[80vh]">
            <ChatRoomHeader isStudent={isStudent} chatRoomInfo={chatRoomInfo} />
            <ChatMessageList isStudent={isStudent} chatroomId={chatroomId} />
            <ChatInput isStudent={isStudent} chatroomId={chatroomId} />
        </div>
    )
}