import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();


  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, i) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={i === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};
export default Conversations;
