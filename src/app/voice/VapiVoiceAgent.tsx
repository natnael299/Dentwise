"use client"
import { vapi } from "@/lib/actions/vapi";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
function VapiVoiceAgent() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const messageContainerRef = useRef<HTMLDivElement>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    //scroll to the bottom message with every message
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages])

  //setup event functions for vapi ai agent
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call Started");
      setConnecting(false);
      setCallActive(true)
      setCallEnded(false)
    };

    const handleCallEnd = () => {
      console.log("Call Ended");
      setConnecting(false);
      setCallEnded(true);
      setCallActive(false);
      setIsSpeaking(false);
    };

    //track messages
    const handleMessage = (message: any) => {
      console.log("A new Message!!");
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    //track the ai's speech start
    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    //track the ai's speech ending
    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };

    //track possible errors
    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("message", handleMessage)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("error", handleError)

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, [])

  if (!isLoaded) return null;

  const toggleCall = () => {
    if (callActive) vapi.stop();
    else {
      try {
        vapi.start(process.env.VAPI_ASSISTANT_ID);
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);
      } catch (error) {
        console.log("error" + error);
        setConnecting(false);
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl">Talk to Your<span className="text-primary uppercase">AI Dental Assistant</span></h1>
    </div>
  )
}

export default VapiVoiceAgent