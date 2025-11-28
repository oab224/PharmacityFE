import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import RecordingSection from "./components/RecordingSection";
import ResultSection from "./components/ResultSection";
import StatsSection from "./components/StatsSection";
import HistorySection from "./components/HistorySection";
import Sidebar from "./components/Sidebar";
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
  const [audio,setAudio] = useState<string | null>(null)
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
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const validDrugs = [
    {
      name: "Osaphine",
      units: ["hộp", "vỉ"],
      aliases: ["o sa phin", "osaphin", "osa phin"],
    },
    {
      name: "Alpha Choay",
      units: ["hộp", "vỉ"],
      aliases: ["alpha choy", "anfa choay", "alfa choay"],
    },
    {
      name: "Efferalgan 500mg",
      units: ["hộp", "vỉ", "gói"],
      aliases: ["effe", "effe 500", "efferalgan"],
    },
    {
      name: "Paracetamol",
      units: ["hộp", "vỉ", "chai", "ống"],
      aliases: ["para", "paracet"],
    },
    {
      name: "Paracetamol 500mg",
      units: ["hộp", "vỉ", "gói"],
      aliases: ["para 500", "para500"],
    },
    {
      name: "Hapacol 250mg",
      units: ["hộp", "vỉ", "gói"],
      aliases: ["hapa 250", "hapacol250"],
    },
    {
      name: "Hapacol 500mg",
      units: ["hộp", "vỉ", "gói"],
      aliases: ["hapa 500", "hapacol500"],
    },
    {
      name: "Decolgen",
      units: ["hộp", "vỉ"],
      aliases: ["de con gen", "đê cô gèn", "decongen"],
    },
  ];
  
  const listValidDrugs = validDrugs.map((value, index) => {
    return value;
  });

  useEffect(() => {
    checkConnection();
    loadHistory();
    loadStats();
    
    // Check window size for sidebar default state
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        setTranscript(data?.text);
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

  // Function mới để xử lý text input
 const processTextInput = async (text: string): Promise<void> => {
  setIsProcessing(true);
  setTranscript(text);

  try {
    // Gửi text để parse thông tin đơn thuốc
    const response = await fetch(`${API_URL}/api/texttoorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data: TranscriptionResponse = await response.json();
    if (data.success) {
      setPrescriptionInfo(data.prescription_info as any);
      setWarnings(data.warnings);
    } else {
      alert("Lỗi xử lý: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    alert("Không thể kết nối server. Đảm bảo server đã chạy!");
    console.error("Error processing text:", error);
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
        alert("Đã lưu đơn thuốc thành công!");
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Reset collapsed state khi đóng sidebar
    if (sidebarOpen) {
      setSidebarCollapsed(false);
    }
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />
      
      {/* Trang Home - App với Sidebar */}
      <Route
        path="/"
        element={
          <div className="app-wrapper">
            <Sidebar 
              isOpen={sidebarOpen} 
              onToggle={toggleSidebar}
              isCollapsed={sidebarCollapsed}
              onCollapse={toggleSidebarCollapse}
            />
            
            <div className={`app-content ${sidebarOpen ? 'with-sidebar' : ''} ${sidebarCollapsed ? 'with-sidebar-collapsed' : ''}`}>
              {/* Hamburger menu button */}
              <button className="hamburger-btn" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
              </button>

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
                    onTextInput={processTextInput}
                  />
                  <ResultSection
                    transcript={transcript}
                    prescriptionInfo={prescriptionInfo}
                    warnings={warnings}
                    savePrescription={savePrescription}
                    clearCurrent={clearCurrent}
                    validDrug={listValidDrugs}
                    setPrescriptionInfo={setPrescriptionInfo}
                  />
                </div>
                <StatsSection stats={stats} />
                <HistorySection history={history} />
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;