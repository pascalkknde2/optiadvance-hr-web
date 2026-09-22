import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

/**
 * Shell for all persona routes. Session/capability verification is TBD
 * (docs/decisions, WEB-03); route placement here does not grant access —
 * every server action, handler and backend operation must recheck.
 */
export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="dashboard-body flex-1 flex flex-col gap-6 p-4 md:p-6">
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
