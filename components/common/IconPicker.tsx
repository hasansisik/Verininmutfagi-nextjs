"use client";

import { useState, useMemo } from "react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
}

// 1. Static List of Icons to prevent runtime reflection errors (Object.keys) on the module
const STATIC_ICON_LIST = [
    "Activity", "Airplay", "AlertCircle", "AlertOctagon", "AlertTriangle", "AlignCenter", "AlignJustify", "AlignLeft", "AlignRight",
    "Anchor", "Aperture", "Archive", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "AtSign", "Award", "BarChart", "BarChart2",
    "Battery", "BatteryCharging", "Bell", "BellOff", "Bluetooth", "Bold", "Book", "BookOpen", "Bookmark", "Box", "Briefcase",
    "Calendar", "Camera", "CameraOff", "Cast", "Check", "CheckCircle", "CheckSquare", "ChevronDown", "ChevronLeft", "ChevronRight", "ChevronUp",
    "ChevronsDown", "ChevronsLeft", "ChevronsRight", "ChevronsUp", "Chrome", "Circle", "Clipboard", "Clock", "Cloud", "CloudDrizzle", "CloudLightning",
    "CloudOff", "CloudRain", "CloudSnow", "Code", "Codepen", "Codesandbox", "Coffee", "Columns", "Command", "Compass", "Copy", "CornerDownLeft",
    "CornerDownRight", "CornerLeftDown", "CornerLeftUp", "CornerRightDown", "CornerRightUp", "CornerUpLeft", "CornerUpRight", "Cpu", "CreditCard",
    "Crop", "Crosshair", "Database", "Delete", "Disc", "DollarSign", "Download", "DownloadCloud", "Droplet", "Edit", "Edit2", "Edit3",
    "ExternalLink", "Eye", "EyeOff", "Facebook", "FastForward", "Feather", "Figma", "File", "FileMinus", "FilePlus", "FileText", "Film",
    "Filter", "Flag", "Folder", "FolderMinus", "FolderPlus", "Framer", "Frown", "Gift", "GitBranch", "GitCommit", "GitMerge", "GitPullRequest",
    "Github", "Gitlab", "Globe", "Grid", "HardDrive", "Hash", "Headphones", "Heart", "HelpCircle", "Hexagon", "Home", "Image", "Inbox",
    "Info", "Instagram", "Italic", "Key", "Layers", "Layout", "LifeBuoy", "Link", "Link2", "Linkedin", "List", "Loader", "Lock",
    "LogIn", "LogOut", "Mail", "Map", "MapPin", "Maximize", "Maximize2", "Meh", "Menu", "MessageCircle", "MessageSquare", "Mic",
    "MicOff", "Minimize", "Minimize2", "Minus", "MinusCircle", "MinusSquare", "Monitor", "Moon", "MoreHorizontal", "MoreVertical", "MousePointer",
    "Move", "Music", "Navigation", "Navigation2", "Octagon", "Package", "Paperclip", "Pause", "PauseCircle", "PenTool", "Percent", "Phone",
    "PhoneCall", "PhoneForwarded", "PhoneIncoming", "PhoneMissed", "PhoneOff", "PhoneOutgoing", "PieChart", "Play", "PlayCircle", "Plus", "PlusCircle",
    "PlusSquare", "Pocket", "Power", "Printer", "Radio", "RefreshCcw", "RefreshCw", "Repeat", "Rewind", "RotateCcw", "RotateCw", "Rss",
    "Save", "Scissors", "Search", "Send", "Server", "Settings", "Share", "Share2", "Shield", "ShieldOff", "ShoppingBag", "ShoppingCart",
    "Shuffle", "Sidebar", "SkipBack", "SkipForward", "Slack", "Slash", "Sliders", "Smartphone", "Smile", "Speaker", "Square", "Star",
    "StopCircle", "Sun", "Sunrise", "Sunset", "Tablet", "Tag", "Target", "Terminal", "Thermometer", "ThumbsDown", "ThumbsUp", "ToggleLeft",
    "ToggleRight", "Tool", "Trash", "Trash2", "Trello", "TrendingDown", "TrendingUp", "Triangle", "Truck", "Tv", "Twitch", "Twitter",
    "Type", "Umbrella", "Underline", "Unlock", "Upload", "UploadCloud", "User", "UserCheck", "UserMinus", "UserPlus", "UserX", "Users",
    "Video", "VideoOff", "Voicemail", "Volume", "Volume1", "Volume2", "VolumeX", "Watch", "Wifi", "WifiOff", "Wind", "X",
    "XCircle", "XOctagon", "XSquare", "Youtube", "Zap", "ZapOff", "ZoomIn", "ZoomOut", "Code2", "Palette", "GraduationCap", "Library", "School"
];

export const IconPicker = ({ value, onChange }: IconPickerProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Use a safe fallback for the selected icon
    const SelectedIcon = (LucideIcons as any)[value] || LucideIcons.HelpCircle;

    const filteredIcons = useMemo(() => {
        if (!search) return STATIC_ICON_LIST;
        const lowerSearch = search.toLowerCase();
        return STATIC_ICON_LIST.filter((name) => name.toLowerCase().includes(lowerSearch));
    }, [search]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-between" type="button">
                    <span className="flex items-center gap-2">
                        {SelectedIcon ? <SelectedIcon className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                        {value || "İkon Seç"}
                    </span>
                    <span className="opacity-50 text-xs">Değiştir</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl h-[80vh] flex flex-col overflow-hidden">
                <DialogHeader>
                    <DialogTitle>İkon Seç</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="İkon ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <div className="flex-1 p-2 border rounded-md overflow-y-auto">
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
                        {filteredIcons.map((name) => {
                            const Icon = (LucideIcons as any)[name];
                            if (!Icon) return null; // Skip if icon is not found in the module

                            return (
                                <button
                                    key={name}
                                    className={`p-2 rounded-md flex flex-col items-center justify-center gap-1 hover:bg-accent transition-colors ${value === name ? "bg-accent border-primary border" : ""
                                        }`}
                                    onClick={() => {
                                        onChange(name);
                                        setOpen(false);
                                    }}
                                    type="button"
                                >
                                    <Icon className="h-6 w-6" />
                                    <span className="text-[10px] truncate w-full text-center text-muted-foreground">
                                        {name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    {filteredIcons.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            Sonuç bulunamadı
                        </div>
                    )}
                </div>
                <div className="text-xs text-muted-foreground text-center">
                    Toplam {filteredIcons.length} ikon listeleniyor
                </div>
            </DialogContent>
        </Dialog>
    );
};
