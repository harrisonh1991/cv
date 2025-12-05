import { useEffect, useState, useRef, useDeferredValue } from "react";
import { getRamdomTexts, DebugLog } from "@/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface IRandomTextProps {
  word: string;
  className?: string;
}

const RamdomText = ({ word, className }: IRandomTextProps) => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const deferDisplayWords = useDeferredValue(displayWords);
  const interval = useRef<number>(0);

  // 每隔一段時間隨機「修正」一個位置的字母
  useEffect(() => {
    DebugLog("RamdomText init");
    const splitedWords: string[] = word.split("");
    const len = splitedWords.length;
    const _displayWords: string[] = getRamdomTexts(len);
    let unchagedIndexs = Array.from({ length: len }, (_, i) => i);

    const updateDisplayWords = () => {
      if (unchagedIndexs.length === 0) return clearInterval(interval.current);
      DebugLog("updateDisplayWords");
      const randomIndex = Math.floor(Math.random() * unchagedIndexs.length);
      const unchangeIndex = unchagedIndexs[randomIndex];
      _displayWords[unchangeIndex] = splitedWords[unchangeIndex];
      unchagedIndexs = unchagedIndexs.filter((e) => e !== unchangeIndex);
      setDisplayWords([..._displayWords]);
    };

    interval.current = setInterval(() => {
      updateDisplayWords();
    }, 300);

    return () => clearInterval(interval.current);
  }, [word]);

  return (
    <AnimatePresence>
      {deferDisplayWords.map((e, i) => (
        <span className="relative" key={i}>
          <motion.span
            key={`ramdomText-${e}-${i}`}
            className={clsx(className, "top-0 left-0")}
            initial={{ opacity: 0, display: "absolute" }}
            animate={{ opacity: 1, display: "relative" }}
            exit={{ opacity: 0, display: "absolute" }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            {e}
          </motion.span>
        </span>
      ))}
    </AnimatePresence>
  );
};

export default RamdomText;
