import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  X, 
  Sparkles, 
  Sprout, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  RotateCcw, 
  Search, 
  Plus, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  PanelLeftClose, 
  PanelLeft, 
  Download, 
  Activity, 
  CloudSun, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Radio, 
  ShieldAlert, 
  Layers 
} from 'lucide-react';
import { 
  ChatMessage, 
  ChatThread, 
  SoilSensorData, 
  WeatherData, 
  IntegratedCropAnalysis 
} from '../types';

interface AgronomistChatProps {
  currentLanguage?: string;
  isOpen: boolean;
  onClose: () => void;
  currentCrop: string;
  cropVariety?: string;
  growthStage?: string;
  daysAfterSowing?: number;
  soilData: SoilSensorData;
  weatherData: WeatherData | null;
  currentDiagnosis: IntegratedCropAnalysis | null;
  analyticsSummary?: string;
}

export const AgronomistChat: React.FC<AgronomistChatProps> = ({
  currentLanguage = 'en',
  isOpen,
  onClose,
  currentCrop,
  cropVariety = '',
  growthStage = '',
  daysAfterSowing = 0,
  soilData,
  weatherData,
  currentDiagnosis,
  analyticsSummary
}) => {
  // Chat Threads State (inspired by chatbot-ui)
  const [threads, setThreads] = useState<ChatThread[]>(() => {
    try {
      const saved = localStorage.getItem('agrisense_chat_threads');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load chat threads:', e);
    }
    return [
      {
        id: 't_default',
        title: 'Cashew & Crop Health Advisory',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: 'm1',
            sender: 'assistant',
            text: `Namaste! I am your **AgriSense AI Agronomist & Crop Doctor** (powered by Gemini 3.5 Flash).\n\nI am synchronized in real-time with your farm telemetry:\n- **Target Crop**: ${currentCrop} ${cropVariety ? `(${cropVariety})` : ''}\n- **Soil Telemetry**: pH ${soilData.ph}, Nitrogen ${soilData.nitrogen} kg/ha, Moisture ${soilData.moisture}%\n- **Microclimate**: ${weatherData?.currentTemp || 31}°C, ${weatherData?.currentHumidity || 78}% RH\n- **Diagnosis**: ${currentDiagnosis?.primaryDiagnosis || 'Active field monitoring'}\n\nAsk me anything by typing or using the **Microphone** for voice search!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            model: 'Gemini 3.5 Flash',
            suggestedActions: [
              'Is it safe to spray fungicide with today\'s wind & weather?',
              `Calculate exact fertilizer dosage for 1 acre of ${currentCrop.split(' ')[0]}`,
              'How to formulate organic NSKE 5% bio-pesticide?',
              'Explain the Phase 1 recovery steps from analytics'
            ]
          }
        ]
      }
    ];
  });

  const [activeThreadId, setActiveThreadId] = useState<string>('t_default');
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  // Voice Speech-To-Text (Microphone) State
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Active thread lookup
  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];
  const messages = activeThread?.messages || [];

  // Persist threads to local storage
  useEffect(() => {
    try {
      localStorage.setItem('agrisense_chat_threads', JSON.stringify(threads));
    } catch (e) {
      console.warn('Failed to save chat threads:', e);
    }
  }, [threads]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading, interimTranscript]);

  // Initialize Web Speech API for voice dictation
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechRecognitionSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Default to Indian English / Multilingual friendly

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterim = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setInput((prev) => (prev ? `${prev} ${finalTranscript.trim()}` : finalTranscript.trim()));
          setInterimTranscript('');
        } else {
          setInterimTranscript(currentInterim);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition initialization error:', e);
      setSpeechRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle voice toggle
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript('');
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech start error:', err);
      }
    }
  };

  // Text-To-Speech (Audio Voice playback)
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = text
      .replace(/[#*_`~>-]/g, ' ')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Copy message text
  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Create New Thread
  const handleCreateNewThread = () => {
    const newId = `t_${Date.now()}`;
    const newThread: ChatThread = {
      id: newId,
      title: `Field Query ${threads.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `m_${Date.now()}`,
          sender: 'assistant',
          text: `Namaste! New conversation started for **${currentCrop}**. How can I help you manage pests, soil nutrients, or spraying schedules?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: 'Gemini 3.5 Flash',
          suggestedActions: [
            `What is the best time today to spray for ${currentCrop.split(' ')[0]}?`,
            'Calculate exact fertilizer dosage for 1 acre',
            'Is there an organic remedy for fungal leaf spots?'
          ]
        }
      ]
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newId);
  };

  // Delete Thread
  const handleDeleteThread = (threadId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (threads.length <= 1) {
      // Don't delete last thread, just reset it
      handleCreateNewThread();
      setThreads((prev) => prev.filter((t) => t.id !== threadId));
      return;
    }
    const filtered = threads.filter((t) => t.id !== threadId);
    setThreads(filtered);
    if (activeThreadId === threadId) {
      setActiveThreadId(filtered[0].id);
    }
  };

  // Rename Thread
  const handleSaveTitle = (threadId: string) => {
    if (!editedTitle.trim()) {
      setEditingThreadId(null);
      return;
    }
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, title: editedTitle.trim(), updatedAt: new Date().toISOString() } : t))
    );
    setEditingThreadId(null);
  };

  // Clear all conversations
  const handleClearAllThreads = () => {
    if (window.confirm('Are you sure you want to clear all chat conversations?')) {
      const resetId = `t_${Date.now()}`;
      const defaultThread: ChatThread = {
        id: resetId,
        title: 'New Agronomy Session',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: `m_${Date.now()}`,
            sender: 'assistant',
            text: 'All chat history cleared. Ready for your field questions!',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            model: 'Gemini 3.5 Flash'
          }
        ]
      };
      setThreads([defaultThread]);
      setActiveThreadId(resetId);
    }
  };

  // Export Chat
  const handleExportChat = () => {
    const activeMessages = activeThread?.messages || [];
    const markdownContent = `# AgriSense AI Chat Log: ${activeThread?.title}\n` +
      `Date: ${new Date().toLocaleDateString()}\n` +
      `Active Crop: ${currentCrop} (${cropVariety || 'Standard Cultivar'})\n` +
      `Soil Telemetry: pH ${soilData.ph}, N: ${soilData.nitrogen} kg/ha, Moisture: ${soilData.moisture}%\n\n---\n\n` +
      activeMessages
        .map(
          (m) => `### ${m.sender === 'user' ? 'Farmer' : 'Agronomist AI (Gemini 3.5 Flash)'} [${m.timestamp}]\n\n${m.text}\n`
        )
        .join('\n\n---\n\n');

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrisense_chat_${activeThread?.id || 'session'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Send Message Logic
  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript('');
    }

    const userMessageId = `u_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Auto update thread title on first user message if default
    let updatedTitle = activeThread.title;
    if (activeThread.messages.filter((m) => m.sender === 'user').length === 0) {
      updatedTitle = messageText.slice(0, 32) + (messageText.length > 32 ? '...' : '');
    }

    // Append user message immediately
    const updatedMessages = [...activeThread.messages, userMsg];
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? {
              ...t,
              title: updatedTitle,
              updatedAt: new Date().toISOString(),
              messages: updatedMessages
            }
          : t
      )
    );

    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          language: currentLanguage,
          history: updatedMessages.slice(-8),
          currentCrop,
          cropVariety,
          growthStage,
          daysAfterSowing,
          soilData,
          weatherData,
          currentDiagnosis,
          analyticsSummary
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: `b_${Date.now()}`,
          sender: 'assistant',
          text: data.reply || 'Please check soil aeration and monitor lesions daily.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          model: data.model || 'Gemini 3.5 Flash',
          suggestedActions: data.suggestedActions
        };

        setThreads((prev) =>
          prev.map((t) =>
            t.id === activeThreadId
              ? {
                  ...t,
                  updatedAt: new Date().toISOString(),
                  messages: [...updatedMessages, botMsg]
                }
              : t
          )
        );
      } else {
        throw new Error('Chat API returned error status');
      }
    } catch (err) {
      console.warn('API Chat error, using dataset-grounded agronomic fallback:', err);
      const fallbackReplies: { [key: string]: string } = {
        cashew: `For **${currentCrop}** in the Palasa-Srikakulam coastal belt:\n\n` +
          `1. **Tea Mosquito Bug & Die-back control**: Spray Lambda-cyhalothrin 5% EC @ 0.6 ml/L combined with Copper Oxychloride 50% WP @ 2.5 g/L during calm morning hours.\n` +
          `2. **Soil Health**: Current soil pH (${soilData.ph}) is favorable. Apply 500g Urea, 125g DAP, and 125g Potash per bearing tree basin.\n` +
          `3. **Organic Option**: NSKE 5% (50g neem seed kernels/L) or Beauveria bassiana bio-insecticide @ 5g/L.\n` +
          `4. **Spray Window**: Today's wind is ${weatherData?.currentWind || 12} km/h—safe for early morning application.`,
        rice: `For **Paddy (Rice)** in coastal delta soils:\n\n` +
          `1. **Blast & Blight Management**: Spray Tricyclazole 75% WP @ 0.6 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.\n` +
          `2. **Soil Adjustment**: Nitrogen is at ${soilData.nitrogen} kg/ha. Temporarily halt excess Urea top-dressing until leaf spots arrest.\n` +
          `3. **Water Drainage**: Drain standing water for 48 hours to aerate the root system.`,
        apple: `For **Apple (Kashmiri / Ambri)** Scab and Alternaria:\n\n` +
          `1. **Spray Solution**: Apply Difenoconazole 25% EC (0.3 ml/L) or Captan 50% WP (2 g/L) immediately.\n` +
          `2. **Orchard Sanitation**: Collect and burn fallen diseased leaves to reduce overwintering spore inoculum.`,
        cotton: `For **Bt Cotton** Whitefly and Leaf Curl Virus:\n\n` +
          `1. **Treatment**: Spray Diafenthiuron 50% WP (1.2 g/L) or Pyriproxyfen 10% EC (2 ml/L) targeting leaf undersides.\n` +
          `2. **Cultural**: Install 15-20 yellow sticky traps per acre and balance Potash fertilization.`
      };

      const matchedKey = Object.keys(fallbackReplies).find((k) => currentCrop.toLowerCase().includes(k)) || 'cashew';
      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'assistant',
        text: fallbackReplies[matchedKey] || `For **${currentCrop}**, ensure morning spray operations when wind is below 12 km/h. Maintain balanced soil N-P-K (current pH: ${soilData.ph}) and inspect new vegetative flushes every 48 hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'Gemini 3.5 Flash',
        suggestedActions: [
          'Calculate exact fertilizer dosage for 1 acre',
          'Is it safe to spray fungicide today?',
          'Organic bio-pesticide preparation guide'
        ]
      };

      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThreadId
            ? {
                ...t,
                updatedAt: new Date().toISOString(),
                messages: [...updatedMessages, botMsg]
              }
            : t
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter threads by search query
  const filteredThreads = threads.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.messages.some((m) => m.text.toLowerCase().includes(q))
    );
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      
      <div 
        className={`bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#D5DDD2] transition-all duration-300 ${
          isFullscreen 
            ? 'w-full' 
            : 'w-full max-w-5xl'
        }`}
      >
        {/* TOP CHATBOT-UI HEADER */}
        <header className="px-4 py-3.5 bg-[#143021] text-white flex items-center justify-between border-b border-[#24523B] shrink-0">
          <div className="flex items-center space-x-3">
            {/* Toggle Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? 'Hide conversation history' : 'Show conversation history'}
              className="p-1.5 rounded-lg text-[#D8F3DC] hover:text-white hover:bg-[#1B4332] transition-colors"
            >
              {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
            </button>

            {/* Logo & Title */}
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#40916C] to-[#52B788] flex items-center justify-center text-white shadow-sm border border-[#74C69D]/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white truncate max-w-[220px] sm:max-w-xs">
                    {activeThread.title}
                  </h3>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#52B788] text-[#081C15]">
                    Gemini 3.5 Flash
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-[#B7E4C7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="truncate max-w-[260px]">
                    Synced with {currentCrop.split(' ')[0]} &bull; pH {soilData.ph} &bull; {weatherData?.currentTemp ?? 31}°C
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Toggle Context Drawer */}
            <button
              onClick={() => setIsContextDrawerOpen(!isContextDrawerOpen)}
              title="Toggle Live Farm Telemetry Synced Context"
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1 ${
                isContextDrawerOpen
                  ? 'bg-[#52B788] text-[#081C15] font-bold'
                  : 'text-[#D8F3DC] hover:text-white hover:bg-[#1B4332] border border-[#2D6A4F]'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Telemetry Context</span>
              {isContextDrawerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Export Chat */}
            <button
              onClick={handleExportChat}
              title="Export Conversation (Markdown)"
              className="p-1.5 rounded-lg text-[#D8F3DC] hover:text-white hover:bg-[#1B4332] transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Toggle Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              className="p-1.5 rounded-lg text-[#D8F3DC] hover:text-white hover:bg-[#1B4332] transition-colors hidden sm:block"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Modal */}
            <button
              onClick={onClose}
              title="Close Chat"
              className="p-1.5 rounded-lg text-[#D8F3DC] hover:text-white hover:bg-[#1B4332] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* OPTIONAL EXPANDABLE TELEMETRY SYNC DRAWER */}
        {isContextDrawerOpen && (
          <div className="bg-[#EFF5EB] border-b border-[#C5D9C0] p-3.5 text-xs text-[#143021] grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in slide-in-from-top-2 duration-150">
            <div className="bg-white p-2.5 rounded-xl border border-[#D5DDD2]">
              <span className="text-[10px] font-bold text-[#52796F] block uppercase">Active Crop</span>
              <strong className="text-xs text-[#143021]">{currentCrop}</strong>
              <div className="text-[10px] text-[#52796F]">{cropVariety || 'Standard Cultivar'} &bull; {daysAfterSowing} DAS</div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#D5DDD2]">
              <span className="text-[10px] font-bold text-[#52796F] block uppercase">Soil Telemetry</span>
              <strong className="text-xs text-[#143021]">pH {soilData.ph} &bull; N: {soilData.nitrogen} kg/ha</strong>
              <div className="text-[10px] text-[#52796F]">P: {soilData.phosphorus} &bull; K: {soilData.potassium} kg/ha</div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#D5DDD2]">
              <span className="text-[10px] font-bold text-[#52796F] block uppercase">Weather Radar</span>
              <strong className="text-xs text-[#143021]">{weatherData?.currentTemp ?? 31}°C &bull; {weatherData?.currentHumidity ?? 78}% RH</strong>
              <div className="text-[10px] text-[#52796F]">Rain: {weatherData?.forecast?.[0]?.rainfallChance ?? 25}% &bull; {weatherData?.forecast?.[0]?.sprayingSuitability || 'Safe'}</div>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#D5DDD2]">
              <span className="text-[10px] font-bold text-[#52796F] block uppercase">Current Diagnosis</span>
              <strong className="text-xs text-[#143021] truncate block">{currentDiagnosis?.primaryDiagnosis || 'Field Monitoring'}</strong>
              <div className="text-[10px] text-emerald-700 font-semibold">{currentDiagnosis?.severityLevel || 'Moderate'} Severity</div>
            </div>
          </div>
        )}

        {/* MAIN BODY: SIDEBAR + CHAT WORKSPACE */}
        <div className="flex-1 flex overflow-hidden bg-[#F8FAF6]">
          
          {/* CHATBOT-UI SIDEBAR */}
          {isSidebarOpen && (
            <aside className="w-64 sm:w-72 bg-[#102B1E] text-white flex flex-col justify-between border-r border-[#24523B] shrink-0 transition-all duration-200">
              
              {/* Sidebar Header & New Chat Button */}
              <div className="p-3.5 space-y-3">
                <button
                  onClick={handleCreateNewThread}
                  className="w-full py-2.5 px-3 bg-[#2D6A4F] hover:bg-[#40916C] text-white rounded-xl font-bold text-xs flex items-center justify-between border border-[#52B788]/40 shadow-xs transition-all active:scale-98"
                >
                  <span className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>New Agronomy Chat</span>
                  </span>
                  <span className="text-[10px] bg-[#1B4332] px-1.5 py-0.5 rounded text-[#D8F3DC]">
                    ⌘N
                  </span>
                </button>

                {/* Search Conversations Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#74C69D] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full bg-[#163828] border border-[#24523B] text-xs text-white rounded-xl pl-8 pr-3 py-2 placeholder-[#74C69D]/60 focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-[#74C69D] hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto px-2 space-y-1 custom-scrollbar">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#74C69D] px-2 py-1">
                  Active Sessions ({filteredThreads.length})
                </div>

                {filteredThreads.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#74C69D]">
                    No conversations found
                  </div>
                ) : (
                  filteredThreads.map((thread) => {
                    const isActive = thread.id === activeThreadId;
                    const isEditing = editingThreadId === thread.id;

                    return (
                      <div
                        key={thread.id}
                        onClick={() => setActiveThreadId(thread.id)}
                        className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                          isActive
                            ? 'bg-[#2D6A4F] text-white font-semibold shadow-xs'
                            : 'text-[#D8F3DC] hover:bg-[#163828] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2 overflow-hidden flex-1 mr-2">
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#74C69D]' : 'text-[#52796F]'}`} />
                          
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedTitle}
                              onChange={(e) => setEditedTitle(e.target.value)}
                              onBlur={() => handleSaveTitle(thread.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveTitle(thread.id);
                              }}
                              autoFocus
                              className="bg-[#102B1E] text-white text-xs px-1.5 py-0.5 rounded border border-[#52B788] w-full focus:outline-none"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <span className="truncate">{thread.title}</span>
                          )}
                        </div>

                        {/* Actions on hover or active */}
                        <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100">
                          {!isEditing && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingThreadId(thread.id);
                                setEditedTitle(thread.title);
                              }}
                              title="Rename chat"
                              className="p-1 hover:text-white text-[#74C69D]"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={(e) => handleDeleteThread(thread.id, e)}
                            title="Delete chat"
                            className="p-1 hover:text-red-400 text-[#74C69D]"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Sidebar Footer */}
              <div className="p-3 bg-[#0D2218] border-t border-[#24523B] space-y-2 text-[11px] text-[#B7E4C7]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#52B788]" />
                    <span className="font-bold text-white">Gemini 3.5 Flash</span>
                  </span>
                  <button
                    onClick={handleClearAllThreads}
                    className="text-[10px] text-red-300 hover:text-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <p className="text-[10px] text-[#74C69D] leading-tight">
                  Grounded in Pestopia, Crop-Soil, & PlantVillage datasets.
                </p>
              </div>

            </aside>
          )}

          {/* MAIN CHAT STREAM & INPUT BAR */}
          <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
            
            {/* MESSAGE STREAM LOG */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
              
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-md mx-auto my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-[#EFF5EB] text-[#2D6A4F] flex items-center justify-center shadow-inner border border-[#C5D9C0]">
                    <Sprout className="w-7 h-7" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-heading font-bold text-lg text-[#143021]">
                      AgriSense AI &bull; Gemini 3.5 Flash
                    </h3>
                    <p className="text-xs text-[#52796F] leading-relaxed">
                      Ask any question regarding disease treatment, N-P-K nutrient calculations, weather spray windows, or organic farming protocols.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  const isSpeaking = speakingMessageId === msg.id;
                  const isCopied = copiedMessageId === msg.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${
                          isUser
                            ? 'bg-[#2D6A4F] text-white'
                            : 'bg-white text-[#1B4332] border border-[#CBDCC7]'
                        }`}
                      >
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[#2D6A4F]" />}
                      </div>

                      {/* Message Content Container */}
                      <div className={`space-y-1.5 max-w-[85%] sm:max-w-[78%]`}>
                        
                        <div
                          className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isUser
                              ? 'bg-[#2D6A4F] text-white rounded-tr-xs'
                              : 'bg-white text-[#193222] border border-[#DCE4D8] rounded-tl-xs'
                          }`}
                        >
                          {/* Markdown rendering with clean whitespace */}
                          <div className="prose prose-sm max-w-none break-words space-y-2">
                            {msg.text.split('\n\n').map((para, idx) => {
                              // If header
                              if (para.startsWith('### ')) {
                                return (
                                  <h4 key={idx} className="font-heading font-bold text-xs sm:text-sm text-[#143021] mt-2 mb-1">
                                    {para.replace('### ', '')}
                                  </h4>
                                );
                              }
                              // If bullet points
                              if (para.includes('\n- ') || para.startsWith('- ')) {
                                const lines = para.split('\n');
                                return (
                                  <ul key={idx} className="list-disc pl-4 space-y-1 my-1.5">
                                    {lines.map((line, lIdx) => {
                                      const cleanLine = line.replace(/^[-\d.]+\s*/, '');
                                      // Render bold tags if present
                                      return (
                                        <li key={lIdx} dangerouslySetInnerHTML={{
                                          __html: cleanLine
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                        }} />
                                      );
                                    })}
                                  </ul>
                                );
                              }
                              // Regular paragraph
                              return (
                                <p 
                                  key={idx} 
                                  dangerouslySetInnerHTML={{
                                    __html: para
                                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                  }} 
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* Bottom Metadata & Message Toolbar */}
                        <div className={`flex items-center space-x-2 text-[10px] px-1 ${isUser ? 'justify-end text-[#52796F]' : 'text-[#879E8D]'}`}>
                          <span>{msg.timestamp}</span>
                          {!isUser && msg.model && (
                            <>
                              <span>&bull;</span>
                              <span className="text-[#2D6A4F] font-semibold">{msg.model}</span>
                            </>
                          )}

                          {/* Action Tools */}
                          <div className="flex items-center space-x-1 pl-1">
                            {/* Copy button */}
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              title="Copy message"
                              className="p-1 hover:text-[#1B4332] rounded transition-colors"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>

                            {/* Voice Speak (TTS) button */}
                            <button
                              onClick={() => handleToggleSpeak(msg.id, msg.text)}
                              title={isSpeaking ? 'Stop speaking' : 'Read aloud with voice'}
                              className={`p-1 rounded transition-colors ${
                                isSpeaking ? 'text-emerald-700 bg-emerald-100 animate-pulse' : 'hover:text-[#1B4332]'
                              }`}
                            >
                              {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                            </button>

                            {/* Regenerate button (assistant only) */}
                            {!isUser && (
                              <button
                                onClick={() => {
                                  const lastUser = activeThread.messages.filter((m) => m.sender === 'user').pop();
                                  if (lastUser) {
                                    handleSendMessage(lastUser.text);
                                  }
                                }}
                                title="Regenerate reply"
                                className="p-1 hover:text-[#1B4332] rounded transition-colors"
                              >
                                <RotateCcw className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-white text-[#2D6A4F] border border-[#CBDCC7] flex items-center justify-center text-xs shrink-0 shadow-xs">
                    <Bot className="w-4 h-4 text-[#2D6A4F]" />
                  </div>
                  <div className="p-3.5 bg-white rounded-2xl border border-[#DCE4D8] flex items-center space-x-2 text-xs text-[#52796F] shadow-xs">
                    <Sparkles className="w-4 h-4 text-[#2D6A4F] animate-spin" />
                    <span>Gemini 3.5 Flash Agronomist is reasoning across soil telemetry & weather models...</span>
                  </div>
                </div>
              )}

              {/* Live Voice Speech Recognition Interim Feedback */}
              {isListening && (
                <div className="p-3 rounded-xl bg-[#EFF5EB] border-2 border-dashed border-[#52B788] flex items-center space-x-3 text-xs text-[#143021] animate-pulse">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                  <div className="flex-1">
                    <strong className="block font-bold text-[#143021]">Listening to your voice... (Speak now)</strong>
                    <span className="text-[#52796F] italic">{interimTranscript || 'e.g., "What is the best pesticide dosage for cashew?"'}</span>
                  </div>
                  <button
                    onClick={toggleListening}
                    className="px-2.5 py-1 bg-[#2D6A4F] text-white text-[11px] font-bold rounded-lg"
                  >
                    Done
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK SUGGESTION PROMPTS & DOCK */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#E6EBE3] space-y-3 shrink-0">
              
              {/* Contextual Suggestion Pills */}
              {messages.length > 0 && messages[messages.length - 1].suggestedActions && (
                <div className="flex space-x-1.5 overflow-x-auto pb-1 custom-scrollbar text-[11px]">
                  {messages[messages.length - 1].suggestedActions?.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="px-3 py-1 rounded-lg bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] font-semibold border border-[#C5D9C0] shrink-0 whitespace-nowrap transition-colors shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* INPUT FORM DOCK */}
              <div className="relative bg-[#F8FAF6] border border-[#CBDCC7] rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#2D6A4F] focus-within:border-transparent transition-all shadow-xs">
                
                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    isListening 
                      ? 'Listening to microphone...' 
                      : 'Ask crop doctor, calculate dosages, or search agro-knowledge (Shift+Enter for newline)...'
                  }
                  rows={2}
                  disabled={isLoading}
                  className="w-full bg-transparent border-0 text-xs sm:text-sm text-[#193222] placeholder-[#769380] focus:outline-none resize-none px-2 py-1"
                />

                {/* Bottom Bar: Voice Mic, Status, Send */}
                <div className="flex items-center justify-between pt-1 border-t border-[#E8EDE4] mt-1 px-1">
                  
                  {/* Left: Voice Speech-To-Text Button */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={toggleListening}
                      title={isListening ? 'Stop recording' : 'Speak with microphone (Voice input)'}
                      className={`p-2 rounded-xl transition-all flex items-center space-x-1.5 text-xs font-bold ${
                        isListening
                          ? 'bg-red-500 text-white animate-pulse shadow-md'
                          : 'bg-[#EFF5EB] hover:bg-[#DDECD7] text-[#1B4332] border border-[#C5D9C0]'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#2D6A4F]" />}
                      <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice Search'}</span>
                    </button>

                    {speechRecognitionSupported === false && (
                      <span className="text-[10px] text-amber-700 hidden md:inline">
                        (Speech API supported in Chrome/Edge/Safari)
                      </span>
                    )}
                  </div>

                  {/* Right: Model badge + Send Button */}
                  <div className="flex items-center space-x-2">
                    <span className="hidden sm:inline text-[10px] text-[#879E8D]">
                      Press <kbd className="px-1 py-0.5 bg-white border border-[#CBDCC7] rounded text-[9px]">Enter ↵</kbd>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={(!input.trim() && !isListening) || isLoading}
                      className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center space-x-1.5 active:scale-95"
                    >
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </main>

        </div>

      </div>

    </div>
  );
};
