import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "@/app/components/conversations/conversationId/Header";
import Body from "@/app/components/conversations/conversationId/Body";
import Form from "@/app/components/conversations/conversationId/Form";

interface ConversationIdParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: ConversationIdParams }) => {
  const [
    conversation,
    messages
  ] = await Promise.all([getConversationById(params.conversationId), getMessages(params.conversationId)]);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation}/>
        <Body initialMessages={messages}/>
        <Form />
      </div>
    </div>
  );
}
export default ConversationId;
