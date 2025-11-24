import React from 'react';
import { Mic, Square, Loader } from 'lucide-react';

interface RecordingSectionProps {
  isRecording: boolean;
  isProcessing: boolean;
  recordingTime: number;
  transcript: string;
  startRecording: () => void;
  stopRecording: () => void;
  clearCurrent: () => void;
  formatTime: (seconds: number) => string;
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
}) => {
  return (
    <div className="card">
      <h2 className="card-title">
        <Mic className="icon" />
        Ghi Âm
      </h2>

      <div className="recording-section">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`mic-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'disabled' : ''}`}
        >
          {isRecording ? <Square size={64} /> : <Mic size={64} />}
        </button>

        <div className={`status ${isRecording ? 'recording' : isProcessing ? 'processing' : ''}`}>
          {isProcessing ? (
            <div className="processing-status">
              <Loader className="spinner" size={24} />
              Đang xử lý...
            </div>
          ) : isRecording ? (
            'Đang ghi âm...'
          ) : (
            'Nhấn để bắt đầu'
          )}
        </div>

        <div className="timer">{formatTime(recordingTime)}</div>

        {transcript && (
          <button onClick={clearCurrent} className="btn btn-secondary">
            Xóa
          </button>
        )}
      </div>

      <div className="guide-box">
        <div className="guide-title">💡 Hướng dẫn:</div>
        <ul className="guide-list">
          <li>Nhấn micro để ghi âm</li>
          <li>Nói rõ: "Paracetamol 10 viên BN số 5"</li>
          <li>Nhấn lại để dừng</li>
        </ul>
      </div>
    </div>
  );
};

export default RecordingSection;