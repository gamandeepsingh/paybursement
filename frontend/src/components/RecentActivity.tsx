import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity() {
  return (
    <Card className="col-span-3 mx-5 lg:col-span-4 xl:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {[
            {
              name: "Olivia Martin",
              email: "olivia.martin@email.com",
              amount: "+$1,999.00",
              status: "success",
              date: "Apr 23, 2024",
            },
            {
              name: "Jackson Lee",
              email: "jackson.lee@email.com",
              amount: "+$1,499.00",
              status: "success",
              date: "Apr 23, 2024",
            },
            {
              name: "Isabella Nguyen",
              email: "isabella.nguyen@email.com",
              amount: "+$1,899.00",
              status: "failed",
              date: "Apr 23, 2024",
            },
          ].map((activity) => (
            <div key={activity.email} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.name}`} alt="Avatar" />
                <AvatarFallback>{activity.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.name}</p>
                <p className="text-sm text-muted-foreground">{activity.email}</p>
              </div>
              <div className="ml-auto font-medium">
                <span className={activity.status === "success" ? "text-green-500" : "text-red-500"}>
                  {activity.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}