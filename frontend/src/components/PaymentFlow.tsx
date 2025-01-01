import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function PaymentFlow() {
  return (
    <Card className="mr-5 ml-5 xl:-ml-1 col-span-3 lg:col-span-4 xl:col-span-1 ">
      <CardHeader>
        <CardTitle>Payment Flow</CardTitle>
        <CardDescription>How payments are processed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {[
            {
              step: 1,
              title: "Initiation",
              description: "System initiates salary disbursement based on schedule",
            },
            {
              step: 2,
              title: "Verification",
              description: "Employee bank details and amount verification",
            },
            {
              step: 3,
              title: "Processing",
              description: "Razorpay processes the payment transfer",
            },
            {
              step: 4,
              title: "Confirmation",
              description: "Transaction status update and notification",
            },
          ].map((step) => (
            <div key={step.step} className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                {step.step}
              </div>
              <ArrowRight className="mx-2 text-muted-foreground" />
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}