import { Github, Twitter, Mail, Globe } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-screen bg-background border-t mt-10 mb-20 lg:mb-2">
      <div className="px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold">Paybursement</h3>
            <p className="text-sm text-muted-foreground">
              Automated salary disbursement platform powered by Razorpay
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Dashboard</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Employees</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Transactions</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Reports</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Documentation</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">API Reference</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Status</a></li>
              <li><a href="#" className="hover:text-primary dark:hover:text-primarylight">Help Center</a></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Connect to owner</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/gamandeepsingh/paybursement" className="text-muted-foreground hover:text-primary dark:hover:text-primarylight">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/GamandeepSingh4" className="text-muted-foreground hover:text-primary dark:hover:text-primarylight">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:gamandeepsingh^@gmail.com" className="text-muted-foreground hover:text-primary dark:hover:text-primarylight">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://gamandeep.vercel.app/" className="text-muted-foreground hover:text-primary dark:hover:text-primarylight">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-start text-sm text-muted-foreground">
          <p className="text-xs">© 2024 Paybursement. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary dark:hover:text-primarylight text-xs">Privacy Policy</a>
            <a href="#" className="hover:text-primary dark:hover:text-primarylight text-xs">Terms of Service</a>
            <a href="#" className="hover:text-primary dark:hover:text-primarylight text-xs">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}