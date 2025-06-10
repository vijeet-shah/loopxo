"use client";

import React, { useRef} from "react";
import { motion, useInView } from "framer-motion";

export default function DeliverableCard ({ tool, index }: { tool: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px 0px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card rounded-lg p-6 border border-border hover:border-blue-500/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-semibold text-foreground">{tool.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </motion.div>
  );
};

