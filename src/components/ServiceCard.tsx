import type { IconType } from "react-icons";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ServiceCardProps = {
  Icon: IconType;
  title: string;
  text: string;
};

export default function ServiceCard({ Icon, title, text }: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="h-12 w-12 self-center">
          <Icon className="text-primary h-full w-full" />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-poppins font-bold capitalize  text-center">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed tracking-wide break-words text-center my-4">
          {text}
        </p>
      </CardContent>
    </Card>
  );
}
