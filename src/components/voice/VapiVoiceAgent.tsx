"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/actions/vapi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
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
        vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
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
    <div className="max-w-5xl mx-auto px-4 flex flex-col items-center mb-10">
      <h1 className="text-3xl">Talk to Your <span className="text-primary uppercase">AI Dental Assistant</span></h1>
      <p className="text-muted-foreground mt-2">
        Have a voice conversation with our AI assistant for dental advice and guidance
      </p>


      {/* VIDEO CALL AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-2">
        {/* AI Card */}
        <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
            {/* AI VOICE ANIMATION */}
            <div
              className={`absolute inset-0 ${isSpeaking ? "opacity-30" : "opacity-0"
                } transition-opacity duration-300`}
            >
              {/* voice wave animation when speaking */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 h-16 w-1 bg-primary rounded-full ${isSpeaking ? "animate-soundWave" : ""
                      }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* AI LOGO */}
            <div className="relative size-32 mb-4">
              <div
                className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${isSpeaking ? "animate-pulse" : ""
                  }`}
              />

              <div className="relative w-full h-full rounded-full bg-card flex items-center justify-center border border-border overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5"></div>
                <Image
                  src="/logo.png"
                  alt="AI Dental Assistant"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground">DentWise AI</h2>
            <p className="text-sm text-muted-foreground mt-1">Dental Assistant</p>

            {/* SPEAKING INDICATOR */}
            <div
              className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border ${isSpeaking ? "border-primary" : ""
                }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
              />

              <span className="text-xs text-muted-foreground">
                {isSpeaking
                  ? "Speaking..."
                  : callActive
                    ? "Listening..."
                    : callEnded
                      ? "Call ended"
                      : "Waiting..."}
              </span>
            </div>
          </div>
        </Card>


        {/* USER Card */}
        <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden relative">
          <div className="aspect-video flex flex-col items-center justify-center relative py-6 px-8">
            <div className="relative size-32 mb-4">
              <Image
                src={user?.imageUrl!}
                alt="User"
                width={128}
                height={128}
                className="size-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl font-bold text-foreground">You</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user ? (user.firstName + " " + (user.lastName || "")).trim() : "Guest"}
            </p>
            <div className="bg-card flex gap-2 items-center border px-3 py-1 mt-4 rounded-full">
              <div className={`w-2 h-2 rounded-full bg-muted`} />
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Messages*/}
      {messages.length > 0 && (
        <div
          ref={messageContainerRef}
          className="w-full bg-card/90 backdrop-blur-sm border border-border rounded-xl p-4 mb-8 h-64 overflow-y-auto transition-all duration-300 scroll-smooth space-y-3">
          {messages?.map((msg, index) => (
            <div key={index} className="message-item animate-in fade-in duration-300">
              <div className="font-semibold text-xs text-muted-foreground mb-1">
                {msg.role === "assistant" ? "DentWise AI" : "You"}:
              </div>
              <p className="text-foreground">{msg.content}</p>
            </div>
          )
          )}

          {callEnded && (
            <div className="message-item animate-in fade-in duration-300">
              <div className="font-semibold text-xs text-primary mb-1">System:</div>
              <p className="text-foreground">Call ended. Thank you for using DentWise AI!</p>
            </div>
          )}
        </div>
      )}

      {/* Call controll*/}
      <Button
        onClick={toggleCall}
        disabled={connecting}
        className={`w-44 h-10 text-lg rounded-xl ${callActive
          ? "bg-destructive hover:bg-destructive/90"
          : callEnded
            ? "bg-red-500 hover:bg-red-700"
            : "bg-primary hover:bg-primary/90"
          } text-white relative`}>
        <span>
          {callActive
            ?
            "End Call"
            : connecting
              ? "Connecting..."
              : "Start Call"}
        </span>
      </Button>
    </div>
  )
}

export default VapiVoiceAgent