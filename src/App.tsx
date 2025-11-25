import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import RecordingSection from "./components/RecordingSection";
import ResultSection from "./components/ResultSection";
import StatsSection from "./components/StatsSection";
import HistorySection from "./components/HistorySection";
import { formatTime } from "./utils/formatters";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import {
  TranscriptionResponse,
  PrescriptionInfo,
  PrescriptionRecord,
  Stats,
  ConnectionStatus,
} from "./types";
import Register from "./pages/Signup";

const API_URL = "http://localhost:5000";

const App: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>("");
  const [prescriptionInfo, setPrescriptionInfo] = useState<
    PrescriptionInfo[] | null
  >(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [history, setHistory] = useState<PrescriptionRecord[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    avg_confidence: 0.95,
  });
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkConnection();
    loadHistory();
    loadStats();
  }, []);

  const checkConnection = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("error");
      }
    } catch (error) {
      setConnectionStatus("error");
      console.error("Connection error:", error);
    }
  };

  const loadHistory = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/api/prescriptions?limit=10`);
      const data: any = await response.json();
      if (data.success) {
        setHistory(data.prescriptions);
      }
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const loadStats = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/api/stats`);
      const data: Stats = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        await processAudio(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      alert("Không thể truy cập microphone. Vui lòng cho phép truy cập!");
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const processAudio = async (audioBlob: Blob): Promise<void> => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await fetch(`${API_URL}/api/transcribe`, {
        method: "POST",
        body: formData,
      });

      const data: TranscriptionResponse = await response.json();
      if (data.success) {
        setTranscript(data.text);

        // Map the 'products' array into 'prescriptionInfo'

        setPrescriptionInfo(data.prescription_info as any);
        setWarnings(data.warnings);
      } else {
        alert("Lỗi xử lý: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Không thể kết nối server. Đảm bảo server đã chạy!");
      console.error("Error processing audio:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const savePrescription = async (): Promise<void> => {
    try {
      const data: PrescriptionRecord = {
        text: transcript,
        prescription_info: prescriptionInfo!,
        warnings: warnings,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(`${API_URL}/api/prescriptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Đã lưu đơn thuốc thành công!");
        clearCurrent();
        loadHistory();
        loadStats();
      }
    } catch (error) {
      alert("Lỗi khi lưu: " + (error as Error).message);
    }
  };

  const clearCurrent = (): void => {
    setTranscript("");
    setPrescriptionInfo(null);
    setWarnings([]);
    setRecordingTime(0);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      {/* Trang Home - App hiện tại */}
      <Route
        path="/"
        element={
          <div className="app">
            <div className="connection-status">
              <div
                className={`status-dot ${
                  connectionStatus === "connected"
                    ? "connected"
                    : "disconnected"
                }`}
              />
              <span className="status-text">
                {connectionStatus === "connected"
                  ? "Đã kết nối"
                  : "Mất kết nối"}
              </span>
            </div>

            <div className="container">
              <Header />
              <div className="main-grid">
                <RecordingSection
                  isRecording={isRecording}
                  isProcessing={isProcessing}
                  recordingTime={recordingTime}
                  transcript={transcript}
                  startRecording={startRecording}
                  stopRecording={stopRecording}
                  clearCurrent={clearCurrent}
                  formatTime={formatTime}
                />
                <ResultSection
                  transcript={transcript}
                  prescriptionInfo={prescriptionInfo}
                  warnings={warnings}
                  savePrescription={savePrescription}
                  clearCurrent={clearCurrent}
                />
              </div>
              <StatsSection stats={stats} />
              <HistorySection history={history} />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
