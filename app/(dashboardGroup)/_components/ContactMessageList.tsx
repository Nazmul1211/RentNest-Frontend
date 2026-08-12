"use client";

import React, { useState } from "react";
import { Phone, Calendar, Inbox, CheckCheck, Reply } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MarkContactMessageAsRead, type ContactMessage } from "../_action/AdminAction";

interface ContactMessageListProps {
  messages: ContactMessage[];
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const topicLabels: Record<string, string> = {
  general: "General Question",
  tenant: "Tenant Application Help",
  landlord: "Landlord Listing Support",
  billing: "Payment & Deposit Issue",
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

export default function ContactMessageList({ messages = [] }: ContactMessageListProps) {
  const [messageList, setMessageList] = useState(messages);

  const handleMarkAsRead = async (message: ContactMessage) => {
    if (message.isRead) return;

    const result = await MarkContactMessageAsRead(message.id);

    if (result.success) {
      setMessageList((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, isRead: true } : m)),
      );
      toast.success("Message marked as read");
    } else {
      toast.error(result.message || "Failed to mark message as read");
    }
  };

  if (messageList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 border border-dashed border-border rounded-2xl bg-card/40 text-center space-y-3">
        <div className="size-12 rounded-full bg-teal-500/10 flex items-center justify-center">
          <Inbox className="size-6 text-teal-600" />
        </div>
        <h4 className="text-sm font-semibold text-foreground">No messages yet</h4>
        <p className="text-xs text-muted-foreground">
          Messages submitted from the contact page will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
      {messageList.map((message) => (
        <div
          key={message.id}
          className={`group rounded-2xl border bg-card p-5 flex flex-col gap-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
            message.isRead
              ? "border-border/60"
              : "border-teal-500/40 bg-teal-500/[0.04] ring-1 ring-teal-500/10"
          }`}
        >
          {/* Header: Avatar + Name + Status */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`size-11 rounded-xl flex items-center justify-center text-sm font-extrabold text-white shrink-0 ${message.isRead ? "bg-gradient-to-br from-slate-500 to-slate-600" : "bg-gradient-to-br from-teal-500 to-teal-700"}`}>
                {getInitials(message.name)}
              </div>
              <div className="min-w-0 space-y-0.5">
                <h4 className="text-sm font-bold text-foreground truncate">{message.name}</h4>
                <p className="text-[11px] text-muted-foreground truncate">{message.email}</p>
              </div>
            </div>

            {!message.isRead ? (
              <Badge variant="outline" className="bg-teal-500/15 text-teal-600 border-teal-500/30 text-[10px] font-bold shrink-0">
                <span className="size-1.5 rounded-full bg-teal-500 animate-pulse mr-1" />
                New
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-[10px] font-bold shrink-0">
                Read
              </Badge>
            )}
          </div>

          {/* Topic + Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Topic</span>
              <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/30 text-[10px] font-bold">
                {topicLabels[message.topic] || message.topic}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
              {message.phone && (
                <a href={`tel:${message.phone}`} className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
                  <Phone className="size-3.5" /> {message.phone}
                </a>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5" /> {formatDate(message.createdAt)}
              </span>
            </div>
          </div>

          {/* Message Body */}
          <div className="flex-1">
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed whitespace-pre-line border-l-2 border-teal-500/20 pl-3 py-0.5">
              {message.message}
            </p>
          </div>

          {/* Footer: Actions */}
          <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
            <a
              href={`mailto:${message.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              <Reply className="size-3.5" /> Reply
            </a>

            {!message.isRead && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMarkAsRead(message)}
                className="text-xs font-semibold gap-1.5 border-teal-500/30 text-teal-600 hover:bg-teal-500/10 rounded-lg"
              >
                <CheckCheck className="size-3.5" /> Mark as read
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}