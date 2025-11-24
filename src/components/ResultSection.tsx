import React from "react";
import { Package, AlertCircle, CheckCircle, X } from "lucide-react";
import { PrescriptionInfo } from "../types";

interface ResultSectionProps {
  transcript: string;
  prescriptionInfo: PrescriptionInfo[] | null;
  warnings: string[];
  savePrescription: () => void;
  clearCurrent: () => void;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  transcript,
  prescriptionInfo,
  warnings,
  savePrescription,
  clearCurrent,
}) => {
  return (
    <div className="card">
      <h2 className="card-title">
        <Package className="icon" />
        Kết Quả Nhận Dạng
      </h2>

      {transcript ? (
        <div>
          <div className="transcript-box">{transcript}</div>

          {prescriptionInfo && (
            <div className="prescription-info">
              {/* Patient Info */}
              {/* {prescriptionInfo.patients &&
                prescriptionInfo.patients.length > 0 && (
                  <div className="info-item patient-info">
                    <strong>👤 Bệnh nhân:</strong>
                    <div>{prescriptionInfo.patients.join(", ")}</div>
                  </div>
                )} */}

              {/* Drugs */}
              {prescriptionInfo && (
                <div className="info-item drugs-info">
                  <strong>💊 Thuốc kê đơn:</strong>
                  {prescriptionInfo.map((drug, idx) => (
                    <div key={idx} className="drug-item">
                      <div className="drug-name">{drug.name}</div>
                      <div className="drug-dosage">{drug.dosage}</div>
                      <div className="drug-details">
                        Số lượng: {drug.quantity || "?"} {drug.unit || "?"}
                        {drug.dosage && (
                          <span className="drug-dosage"> ({drug.dosage})</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Warnings */}
              {warnings && warnings.length > 0 && (
                <div className="warnings">
                  <div className="warning-title">
                    <AlertCircle size={20} />
                    Cảnh báo:
                  </div>
                  {warnings.map((warning, idx) => (
                    <div key={idx} className="warning-item">
                      • {warning}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons">
                <button onClick={savePrescription} className="btn btn-success">
                  <CheckCircle size={20} />
                  Lưu Đơn
                </button>
                <button onClick={clearCurrent} className="btn btn-secondary">
                  <X size={20} />
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">Chưa có dữ liệu...</div>
      )}
    </div>
  );
};

export default ResultSection;
