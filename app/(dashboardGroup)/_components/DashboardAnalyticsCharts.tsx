"use client";

import React, { useState } from "react";
import { BarChart3, PieChart, TrendingUp, Users, Building2, ClipboardList } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AdminAnalytics } from "../_action/AdminAction";

interface AnalyticsChartsProps {
  role?: string;
  analytics: AdminAnalytics;
}

export default function DashboardAnalyticsCharts({
  role = "ADMIN",
  analytics,
}: AnalyticsChartsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "distribution">("overview");

  const { userCount, propertyCount, requestCount, stats, monthlyTrends } = analytics;

  const maxCount = Math.max(...monthlyTrends.map((d) => d.count), 1);

  // Distribution chart data
  const distributionData = [
    { label: "Pending Review", value: stats.pending, color: "bg-amber-500", text: "text-amber-600" },
    { label: "Approved / Active", value: stats.approved, color: "bg-teal-500", text: "text-teal-600" },
    { label: "Paid Leases", value: stats.paid, color: "bg-emerald-500", text: "text-emerald-600" },
    { label: "Rejected / Closed", value: stats.rejected, color: "bg-rose-500", text: "text-rose-600" },
  ];

  const totalDist = distributionData.reduce((acc, curr) => acc + curr.value, 0) || 1;

  return (
    <div className="bg-card rounded-2xl border border-border/60 p-6 shadow-xs space-y-6">
      {/* Top Header & Metrics Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <TrendingUp className="size-5 text-teal-600" /> Platform Analytics & Insights
          </h3>
          <p className="text-xs text-muted-foreground">
            Live metrics and performance trends for your {role.toLowerCase()} workspace.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-xl border border-border/40 shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeTab === "overview"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Activity Trends
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("distribution")}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              activeTab === "distribution"
                ? "bg-teal-600 text-white shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Status Breakdown
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Total Properties</span>
            <Building2 className="size-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-foreground">{propertyCount}</p>
          <span className="text-[10px] text-teal-600 font-bold">Active Listings</span>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Total Applications</span>
            <ClipboardList className="size-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-foreground">{requestCount}</p>
          <span className="text-[10px] text-amber-600 font-bold">Rental Applications</span>
        </div>

        <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Platform Users</span>
            <Users className="size-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-foreground">{userCount}</p>
          <span className="text-[10px] text-emerald-600 font-bold">Registered Accounts</span>
        </div>
      </div>

      {/* Main Visual Charts Container */}
      {activeTab === "overview" ? (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <BarChart3 className="size-4 text-teal-600" /> Monthly Application Trend (Last 8 Months)
            </h4>
            <Badge variant="outline" className="text-[10px] font-bold bg-teal-500/10 text-teal-600 border-teal-500/30">
              Live Real-Time Data
            </Badge>
          </div>

          {/* Bar Chart Container */}
          <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-border/40">
            {monthlyTrends.map((d, idx) => {
              const heightPercent = Math.round((d.count / maxCount) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-muted px-1.5 py-0.5 rounded">
                    {d.count}
                  </span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[36px] bg-teal-600/80 hover:bg-teal-600 rounded-t-md transition-all shadow-xs group-hover:shadow-md"
                    title={`${d.month}: ${d.count} applications`}
                  />
                  <span className="text-[10px] font-semibold text-muted-foreground">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <PieChart className="size-4 text-teal-600" /> Application Status Distribution
            </h4>
            <Badge variant="outline" className="text-[10px] font-bold bg-amber-500/10 text-amber-600 border-amber-500/30">
              {totalDist} Total Tracked
            </Badge>
          </div>

          {/* Distribution Progress Bars */}
          <div className="space-y-3 pt-2">
            {distributionData.map((item, idx) => {
              const percent = Math.round((item.value / totalDist) * 100);
              return (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">{item.label}</span>
                    <span className={item.text}>{item.value} ({percent}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}