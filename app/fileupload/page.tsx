import Chatbot from "@/components/UploadForm";
import FileUpload from "@/components/UploadForm";

export default function TextFile() {
  const backgroundImageStyle = {
    backgroundImage:
      'url("/https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fai-background&psig=AOvVaw2ybbc9t65afJi_ywfB0kO2&ust=1699108745556000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJjn2MiHqIIDFQAAAAAdAAAAABAI")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh", // Adjust the height as needed
  };

  return (
    <div
      className="w-full h-full flex justify-center items-center bg-blue-100 "
      style={backgroundImageStyle}
    >
      <div className="h-[100%] w-[100%] bg-white bg-opacity-70 p-4 rounded-lg shadow-lg">
        {/* <FileUpload /> */}
        <Chatbot />
      </div>
    </div>
  );
}
