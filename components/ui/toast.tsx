"use client"

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end space-y-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="pointer-events-auto flex items-center space-x-3 px-5 py-3 rounded-xl bg-[#141414]/90 border border-[#CC5500]/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md"
                        >
                            <div className={`p-1 rounded-full ${t.type === "success" ? "bg-[#CC5500]/20 text-[#CC5500]" :
                                    t.type === "error" ? "bg-red-500/20 text-red-500" :
                                        "bg-blue-500/20 text-blue-500"
                                }`}>
                                {t.type === "success" && <Check className="w-4 h-4" />}
                                {t.type === "error" && <AlertCircle className="w-4 h-4" />}
                                {t.type === "info" && <Info className="w-4 h-4" />}
                            </div>
                            <span className="text-sm font-medium text-white">{t.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
