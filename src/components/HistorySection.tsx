import React from "react";
import { Users } from "lucide-react";
import { PrescriptionRecord } from "../types";
import { formatDate } from "../utils/formatters";
import { useNavigate } from "react-router-dom";     

interface HistorySectionProps {
  history: PrescriptionRecord[];
  voice: (audio_id: string) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history,voice }) => {
  const navigate = useNavigate();

  const goToEstimate = (item: PrescriptionRecord) => {
    navigate("/estimate", {
      state: { item },        
    });
  };


  return (
    <div className="card">
      <h2 className="card-title">
        <Users className="icon" />
        Lịch Sử Đơn Thuốc
      </h2>

      <div className="history-list">
        {history.length > 0 ? (
          history.map((item, idx) => (
            <div key={idx} className="history-item">
              <div className="history-time">{formatDate(item.timestamp)}</div>

              <div className="history-text">"{item.text}"</div>

              {item.prescription_info?.length > 0 && (
                <div className="history-drugs">
                  {item.prescription_info
                    .map(
                      (d) => `${d.name}: ${d.quantity || "?"} ${d.unit || "?"}`
                    )
                    .join(" • ")}
                </div>
              )}

              <button
                onClick={() => goToEstimate(item)}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg"
              >
                Xem Estimate
              </button>
                {item.audio_id && (
            <button onClick={() => voice(item.audio_id as any)}>Play</button>
          )}
            </div>
          ))
        ) : (
          <div className="empty-state">Chưa có đơn thuốc nào</div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;
