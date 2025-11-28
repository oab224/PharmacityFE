import React from "react";
import { Package, AlertCircle, CheckCircle, X } from "lucide-react";
import { PrescriptionInfo } from "../types";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ResultSectionProps {
  transcript: string;
  prescriptionInfo: PrescriptionInfo[] | null;
  warnings: string[];
  savePrescription: () => void;
  clearCurrent: () => void;
  validDrug: any;
  setPrescriptionInfo: any;
}

const ResultSection: React.FC<ResultSectionProps> = ({
  transcript,
  prescriptionInfo,
  warnings,
  savePrescription,
  clearCurrent,
  validDrug,
  setPrescriptionInfo,
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
              {prescriptionInfo.map((drug, idx) => {
              const matched = validDrug?.find(
                (item: any) =>
                  item?.name?.toLowerCase() === drug?.name?.toLowerCase() ||
                  item?.aliases?.some(
                    (alias: string) =>
                      alias?.toLowerCase() === drug?.name?.toLowerCase()
                  )
              );

              // Lấy giá trị mặc định là phần tử đầu tiên
              const defaultUnit = matched?.units?.[0] || "";

              return (
                <div key={idx} className="info-item drugs-info">
                  <strong>Thuốc kê đơn:</strong>
                  <div className="drug-item">
                    <div className="drug-name">{drug?.name}</div>
                    <div className="drug-dosage">{drug?.dosage}</div>

                    <div className="drug-details flex align-center ">
                      Số lượng: {drug?.quantity}{" "}
                      {drug?.unit == null ? (
                       <select
                       
                        value={drug?.unit || defaultUnit}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const newUnit = e.target.value;

                          setPrescriptionInfo((prev: any) => {
                            const updated = [...prev];
                            updated[idx] = {
                              ...updated[idx],
                              unit: newUnit,
                            };
                            return updated;
                          });
                        }}
                      >
                        {matched?.units?.map((u: string, i: number) => (
                          <option 
                            key={i} 
                            value={u}
                            className="rounded-sm cursor-pointer hover:bg-blue-50 transition-colors"
                          >
                            {u}
                          </option>
                        ))}
                      </select>
                      ) : (
                        <span className="ml-[2px]">
                          {drug?.unit}
                        </span>
                      )}
                      {drug.dosage && (
                        <span className="drug-dosage text-gray-600"> ({drug.dosage})</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
              <div className="action-buttons justify-end">
                <Button onClick={savePrescription} variant="default">
                  <CheckCircle size={20} />
                  Lưu Đơn
                </Button>
                <Button onClick={clearCurrent} variant="secondary">
                  <X size={20} />
                  Hủy
                </Button>
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
