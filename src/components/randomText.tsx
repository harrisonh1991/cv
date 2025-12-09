import { useEffect, useState, useRef, useDeferredValue } from 'react';
import { getRandomTexts, DebugLog } from '@/utils/utils';
import clsx from 'clsx';

interface IRandomTextProps {
  word: string;
}

const RandomText = ({ word }: IRandomTextProps) => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const deferDisplayWords = useDeferredValue(displayWords);
  const [displayIndex, setDisplayIndex] = useState<number[]>([]);
  const interval = useRef<number>(0);

  useEffect(() => {
    DebugLog('RamdomText init');
    const splitedWords: string[] = word.split('');
    const len = splitedWords.length;
    const _displayWords: string[] = getRandomTexts(len);
    let unchagedIndexs = Array.from({ length: len }, (_, i) => i);

    const updateDisplayWords = () => {
      const randomIndex = Math.floor(Math.random() * unchagedIndexs.length);
      const unchangeIndex = unchagedIndexs[randomIndex];
      setDisplayIndex((prev) => [...prev, unchangeIndex]);
      _displayWords[unchangeIndex] = splitedWords[unchangeIndex];
      setDisplayWords([..._displayWords]);
      unchagedIndexs = unchagedIndexs.filter((e) => e !== unchangeIndex);

      setTimeout(() => {
        setDisplayWords([..._displayWords]);
      }, 500);
      if (unchagedIndexs.length === 0) clearInterval(interval.current);
    };

    interval.current = setInterval(() => {
      updateDisplayWords();
    }, 500);

    return () => clearInterval(interval.current);
  }, [word]);

  return deferDisplayWords.map((e, i) => (
    <span className="relative" key={i}>
      <span className={clsx(displayIndex.includes(i) && 'animate-flicker')}>{e}</span>
    </span>
  ));
};

export default RandomText;
