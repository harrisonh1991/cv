import { useEffect, useRef } from "react";
import { getRamdomText, getRamdomTexts } from "@/utils/utils";

interface TypeTextRainItem {
  text: string[];
  fontSize: number;
  dropSpeed: number;
  x: number;
  y: number;
}

interface TypeColor {
  r: number;
  g: number;
  b: number;
}

interface TypeTextRainProps {
  count?: number;
  fontSize?: number;
  wordCount?: number;
  dropSpeed?: number;
  color?: TypeColor;
  className?: string;
}

export default function TextRain({
  count = 5,
  fontSize = 16,
  dropSpeed = 5,
  wordCount = 10,
  className,
  color = {
    r: 0,
    g: 255,
    b: 0,
  },
}: TypeTextRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 重置 canvas 尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 設定字元高度，用於計算超出畫面高度的限制
    const itemHeight = fontSize * wordCount;

    // 有機會隨機更換字元
    const ramdomSomeText = (texts: string[]) => {
      const isChange = Math.random() * 1 > 0.8;
      if (!isChange) return texts;
      const randNumber = Math.floor(Math.random() * wordCount);
      for (let i = 0; i < randNumber; i++) {
        const randomIndex = Math.floor(Math.random() * wordCount);
        texts[randomIndex] = getRamdomText();
      }
      return texts;
    };
    // 初始化字元
    const getItemInitData = (isForStart?: boolean) => {
      return {
        text: getRamdomTexts(wordCount),
        dropSpeed: dropSpeed * (Math.random() * 0.5 + 0.5),
        fontSize: fontSize,
        x: 0 + Math.random() * canvas.width,
        y: isForStart ? Math.random() * -canvas.height : 0,
      };
    };

    const items: TypeTextRainItem[] = [];
    for (let i = 0; i < count; i++) {
      items[i] = getItemInitData(true);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      items.forEach((e) => {
        e.y += e.dropSpeed;
        e.text = ramdomSomeText(e.text);
        if (e.y > canvas.height + itemHeight) {
          Object.assign(e, getItemInitData());
        }
        ctx.font = `${fontSize}px monospace`;
        e.text.forEach((t, i) => {
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${
            1 - (i / (wordCount - 1)) * 0.4
          })`;
          ctx.fillText(t, e.x, e.y - i * fontSize);
        });
      });

      // 持續請求下一幀動畫
      animationIdRef.current = requestAnimationFrame(draw);
    };

    // 開始動畫循環
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [count, dropSpeed, fontSize, wordCount, color]);

  return <canvas className={className} ref={canvasRef} />;
}
