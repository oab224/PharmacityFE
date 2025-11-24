import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatsSectionProps {
  stats: {
    total: number;
    today: number;
    avg_confidence: number;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="card">
      <h2 className="card-title">
        <TrendingUp className="icon" />
        Thống Kê
      </h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Đơn đã nhập</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.today}</div>
          <div className="stat-label">Đơn hôm nay</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{Math.round(stats.avg_confidence * 100)}%</div>
          <div className="stat-label">Độ chính xác</div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;