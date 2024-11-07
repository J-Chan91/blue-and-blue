import { Button } from "../ui/button";

type Props = {
  onLayoutUpdate: () => void;
};

export default function ReLayoutButton({ onLayoutUpdate }: Props) {
  return (
    <Button
      className="absolute bottom-1 left-1/2 z-10"
      onClick={onLayoutUpdate}
    >
      재검색
    </Button>
  );
}
