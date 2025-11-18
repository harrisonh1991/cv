import { LoaderCircle } from "lucide-react";
import clsx from "clsx";

interface LoadingProps {
  size?: number;
  color?: string;
  className?: string;
}

const Loading = ({ size = 30, color = "", className = "" }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle
        className={clsx("animate-spin", className)}
        size={size}
        color={color}
      />
    </div>
  );
};

export default Loading;
