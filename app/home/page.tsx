import { ChatBotComponent } from "@/components/ChatBotComponent";
import FileUpload from "@/components/UploadForm";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[50%] h-[96%]">
        <ChatBotComponent />
        {/* <FileUpload /> */}
      </div>
    </div>
  );
}
