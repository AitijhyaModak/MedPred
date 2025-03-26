import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Textarea } from "../ui/textarea";
import { FaMicrophone } from "react-icons/fa";

function VoiceRecogTextArea({
  userDetails,
  setUserDetails,
  error,
  setDisabled,
}) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const onMicClick = () => {
    if (listening) {
      setDisabled(false);
      SpeechRecognition.stopListening();
    } else {
      setDisabled(true);
      SpeechRecognition.startListening({ continuous: true });
    }
    resetTranscript();
  };

  useEffect(() => {
    if (listening) {
      setUserDetails({ ...userDetails, problemDescription: transcript });
    }
  }, [transcript]);

  return (
    <div className="flex items-center gap-5">
      <Textarea
        placeholder="Start writing or speaking..."
        value={userDetails.problemDescription}
        onChange={(e) =>
          setUserDetails({
            ...userDetails,
            problemDescription: e.target.value,
          })
        }
        className={`input-box h-20 ${!error.symptoms ? "input-error" : ""}`}
      ></Textarea>
      <FaMicrophone
        className={`size-6 cursor-pointer ${
          listening ? "fill-green-500 animate-pulse" : "fill-primary"
        }`}
        onClick={onMicClick}
      ></FaMicrophone>
    </div>
  );
}

export default VoiceRecogTextArea;
