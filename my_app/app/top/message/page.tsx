"use client"

import React, { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Message_list from "@/components/top_components/top/message_list";
import Chat_form from "@/components/top_components/top/chat_form";

export default function Message() {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-screen rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-screen items-center justify-center">
          <Message_list onSelectAccount={setSelectedAccount} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-screen items-start pb-15 justify-center">
          <Chat_form accountName={selectedAccount} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
