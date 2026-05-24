import {
  LayoutDashboard,
  UserCog,
  FileText,
  Home,
  Video,
  Info,
  PlayCircle,
  Bot,
  Mail,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export type AdminSection =
  | "overview"
  | "users"
  | "posts"
  | "home"
  | "watch"
  | "about"
  | "trailer"
  | "chatbot"
  | "newsletter";

const items: { id: AdminSection; title: string; icon: typeof Home }[] = [
  { id: "overview", title: "Overview", icon: LayoutDashboard },
  { id: "users", title: "Users", icon: UserCog },
  { id: "posts", title: "Posts", icon: FileText },
  { id: "home", title: "Home Page", icon: Home },
  { id: "watch", title: "Watch Page", icon: PlayCircle },
  { id: "about", title: "About Page", icon: Info },
  { id: "trailer", title: "Trailer Button", icon: Video },
  { id: "chatbot", title: "Arc Chatbot", icon: Bot },
  { id: "newsletter", title: "Newsletter", icon: Mail },
];

interface AdminSidebarProps {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
}

export const AdminSidebar = ({ active, onChange }: AdminSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-neon-blue/20">
      <SidebarContent className="pt-20">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onChange(item.id)}
                      tooltip={item.title}
                      className={
                        isActive
                          ? "bg-neon-blue/15 text-neon-blue hover:bg-neon-blue/20 hover:text-neon-blue"
                          : "hover:bg-neon-blue/10"
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
