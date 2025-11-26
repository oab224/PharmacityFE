import React, { useState } from "react";
import { Mic, Square, Loader, HelpCircle } from "lucide-react";

interface RecordingSectionProps {
  isRecording: boolean;
  isProcessing: boolean;
  recordingTime: number;
  transcript: string;
  startRecording: () => void;
  stopRecording: () => void;
  clearCurrent: () => void;
  formatTime: (seconds: number) => string;
  onTextInput: (text: string) => void;
}

const RecordingSection: React.FC<RecordingSectionProps> = ({
  isRecording,
  isProcessing,
  recordingTime,
  transcript,
  startRecording,
  stopRecording,
  clearCurrent,
  formatTime,
  onTextInput,
}) => {
  const [textInput, setTextInput] = useState("");
  const [showGuide, setShowGuide] = useState(false);

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onTextInput(textInput.trim());
      setTextInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <Mic className="icon" />
        Ghi Âm
        <div 
          className="guide-icon-wrapper"
          onMouseEnter={() => setShowGuide(true)}
          onMouseLeave={() => setShowGuide(false)}
        >
          <HelpCircle className="guide-icon" size={20} />
          {showGuide && (
            <div className="guide-tooltip">
              <div className="guide-title">Hướng dẫn:</div>
              <ul className="guide-list">
                <li>Nhấn micro để ghi âm</li>
                <li>Nói rõ: "Paracetamol 10 viên BN số 5"</li>
                <li>Nhấn lại để dừng</li>
                <li>Hoặc nhập text trực tiếp bên dưới</li>
              </ul>
            </div>
          )}
        </div>
      </h2>

      <div className="recording-section">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`mic-button ${isRecording ? "recording" : ""} ${
            isProcessing ? "disabled" : ""
          }`}
        >
          {isRecording ? <Square size={64} /> : <Mic size={64} />}
        </button>

        <div
          className={`status ${
            isRecording ? "recording" : isProcessing ? "processing" : ""
          }`}
        >
          {isProcessing ? (
            <div className="processing-status">
              <Loader className="spinner" size={24} />
              Đang xử lý...
            </div>
          ) : isRecording ? (
            "Đang ghi âm..."
          ) : (
            "Nhấn để bắt đầu"
          )}
        </div>

        <div className="timer">{formatTime(recordingTime)}</div>

        {transcript && (
          <button onClick={clearCurrent} className="btn btn-secondary">
            Xóa
          </button>
        )}
      </div>

      {/* Phần nhập text */}
      <div className="text-input-section">
        <div className="input-group">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Hoặc nhập text: Paracetamol 10 viên BN số 5..."
            disabled={isRecording || isProcessing}
            rows={3}
            className="text-input"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!textInput.trim() || isRecording || isProcessing}
            className="btn btn-primary"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingSection;