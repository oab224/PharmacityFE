import React from "react";
import { Users } from "lucide-react";
import { PrescriptionRecord } from "../types";
import { formatDate } from "../utils/formatters";

interface HistorySectionProps {
  history: PrescriptionRecord[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
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
