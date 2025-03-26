import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Textarea } from "../ui/textarea";
import { FaMicrophone } from "react-icons/fa";

function VoiceRecogTextArea({ userDetails, setUserDetails, error }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecogntion,
  } = useSpeechRecognition();

  const onMicClick = () => {
    if (listening) SpeechRecognition.stopListening();
    else {
      SpeechRecognition.startListening({ continuous: true });
      resetTranscript();
    }
  };

  useEffect(() => {
    setUserDetails({ ...userDetails, problemDescription: transcript });
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
        className={`fill-primary size-6 cursor-pointer ${
          listening ? "animate-ping" : ""
        }`}
        onClick={onMicClick}
      ></FaMicrophone>
    </div>
  );
}

export default VoiceRecogTextArea;
