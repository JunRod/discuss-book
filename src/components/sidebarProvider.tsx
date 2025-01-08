'use client'

import "./../app/index.css";
import { use, useEffect, useReducer, useState } from "react";
import { SidebarProvider } from "./ui/sidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar"
import {
    Smile,
    Sparkles,
    LogOut,
    Plus,
    FileSpreadsheet,
    User,
    Globe,
} from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { ThemeContext } from "../app/[book]/state/context";
import { initialState, reducer } from "../app/[book]/state/reducer";

const data = {
    projects: [
        {
            name: "William Smith",
            email: "williamsmith@example.com",
            subject: "Meeting Tomorrow",
            date: "09:34 AM",
            teaser:
                "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },
        {
            name: "Alice Smith",
            email: "alicesmith@example.com",
            subject: "Re: Project Update",
            date: "Yesterday",
            teaser:
                "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
        },
        {
            name: "Bob Johnson",
            email: "bobjohnson@example.com",
            subject: "Weekend Plans",
            date: "2 days ago",
            teaser:
                "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
        },
        {
            name: "Emily Davis",
            email: "emilydavis@example.com",
            subject: "Re: Question about Budget",
            date: "2 days ago",
            teaser:
                "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
        },
        {
            name: "Michael Wilson",
            email: "michaelwilson@example.com",
            subject: "Important Announcement",
            date: "1 week ago",
            teaser:
                "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
        },
        {
            name: "Sarah Brown",
            email: "sarahbrown@example.com",
            subject: "Re: Feedback on Proposal",
            date: "1 week ago",
            teaser:
                "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
        },
        {
            name: "David Lee",
            email: "davidlee@example.com",
            subject: "New Project Idea",
            date: "1 week ago",
            teaser:
                "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
        },
        {
            name: "Olivia Wilson",
            email: "oliviawilson@example.com",
            subject: "Vacation Plans",
            date: "1 week ago",
            teaser:
                "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
        },
        {
            name: "James Martin",
            email: "jamesmartin@example.com",
            subject: "Re: Conference Registration",
            date: "1 week ago",
            teaser:
                "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
        },
        {
            name: "Sophia White",
            email: "sophiawhite@example.com",
            subject: "Team Dinner",
            date: "1 week ago",
            teaser:
                "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
        },
        {
            name: "awdawd",
            email: "wadadw",
            subject: "Team Dinner",
            date: "wadwad",
            teaser:
                "wadad",
        },
    ],
    secondary: [
        {
            icon: Sparkles,
            title: "Upgrade to Pro",
            url: "#",
        },
        {
            icon: Smile,
            title: "Support",
            url: "#",
        },
        {
            icon: LogOut,
            title: 'Logout',
            url: '#'
        }

    ]
}

export function CustomSidebarProvider({ children }: Readonly<{ children: React.ReactNode }>) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [open, setOpen] = useState(false);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            <SidebarProvider
                onOpenChange={setOpen}
                open={open}
                style={
                    {
                        "--sidebar-width": "25.3rem",
                    } as React.CSSProperties
                }
            >
                <Sidebar
                    variant="floating"
                    onMouseOver={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >
                    <SidebarHeader className="border-b-[1px] border-b-[--neutral800]">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild >
                                    <div className="flex flex-row p-4 "> {/* hover:bg-sidebar-accent hover:text-sidebar-accent-foreground */}
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                        <span className="font-testSohneKraftig text-[1.4rem] ">JunRod</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" asChild>
                                    <div className="flex flex-row border-y-neutral-800 p-4 cursor-pointer hover:bg-[#162F50] bg-[#0c1d2c] ">
                                        <span><Plus size={20} /></span>
                                        <span className="font-testSohneKraftig text-[1.2rem]">Create a new discussion space</span>
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent className="scrollbar">
                        <SidebarGroup className="group-data-[collapsible=icon]:hidden" >
                            {data.projects.map(project => (
                                <a
                                    href="#"
                                    key={project.email}
                                    className="first:border-t-none last:border-b-[0px] border-b-[1px] border-y-neutral-800 flex flex-col gap-4 whitespace-nowrap p-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground overflow-x-hidden font-testSohneKraftig"
                                >
                                    <div className="flex w-full items-center gap-4">
                                        <FileSpreadsheet size={20} />
                                        <span className="text-[1.2rem]">{project.subject}</span>
                                    </div>
                                    <div className="flex w-full items-center gap-4">
                                        <User size={20} />
                                        <span className="text-[1.2rem]">{project.name}</span>{" "}
                                    </div>
                                    <div className="flex w-full items-center gap-4">
                                        <Globe size={20} />
                                        <span className="line-clamp-2 w-[230px] whitespace-break-spaces text-[1.2rem]">
                                            {project.teaser}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className="border-t-[1px] border-t-[--neutral800]">
                        <SidebarMenu>
                            {data.secondary.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="lg" className="flex flex-row cursor-pointer border-y-neutral-800 gap-4">
                                        <a href={item.url} className="flex flex-row font-[1.2rem]">
                                            <span><item.icon size={20} /></span>
                                            <span className="cursor-pointer font-testSohneKraftig text-[1.2rem]">{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                {children}
            </SidebarProvider>
        </ThemeContext.Provider>
    );
}