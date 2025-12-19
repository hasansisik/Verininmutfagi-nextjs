"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllUsers, deleteUser, updateUserRole } from "@/redux/actions/userActions"
import { toast } from "react-toastify"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SimplePagination } from "@/components/common/SimplePagination"

const ITEMS_PER_PAGE = 10
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { X, Filter, Search, MoreHorizontal, Shield, Trash2, UserCog } from "lucide-react"

export default function KullanicilarPage() {
    const dispatch = useAppDispatch()
    const { allUsers, usersLoading, user: currentUser } = useAppSelector((state) => state.user)

    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getAllUsers({}))
    }, [dispatch])

    const handleDeleteUser = async () => {
        if (!selectedUserId) return

        try {
            await dispatch(deleteUser(selectedUserId)).unwrap()
            toast.success("Kullanıcı başarıyla silindi")
            setDeleteDialogOpen(false)
            setSelectedUserId(null)
            dispatch(getAllUsers({}))
        } catch (error: any) {
            toast.error(error || "Kullanıcı silinirken hata oluştu")
        }
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await dispatch(updateUserRole({ id: userId, role: newRole })).unwrap()
            toast.success("Kullanıcı rolü güncellendi")
            dispatch(getAllUsers({}))
        } catch (error: any) {
            toast.error(error || "Rol güncellenirken hata oluştu")
        }
    }

    const filteredUsers = allUsers?.filter((user: any) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesRole = roleFilter === "all" || user.role === roleFilter
        const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? user.status === "active" : user.status !== "active")

        return matchesSearch && matchesRole && matchesStatus
    }) || []

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const clearFilters = () => {
        setSearchTerm("")
        setRoleFilter("all")
        setStatusFilter("all")
        setCurrentPage(1)
    }

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge className="bg-black text-white hover:bg-black/90">Admin</Badge>
            case "moderator":
                return <Badge variant="default">Moderator</Badge>
            default:
                return <Badge variant="secondary">Kullanıcı</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        return status === "active" ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Aktif
            </Badge>
        ) : (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Pasif
            </Badge>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h2>
                    <p className="text-muted-foreground">
                        Tüm kullanıcıları görüntüleyin ve yönetin
                    </p>
                </div>
            </div>

            <Card className="border-none shadow-none bg-transparent">
                <CardHeader>
                    <CardTitle>Kullanıcılar</CardTitle>
                    <CardDescription>
                        Toplam {filteredUsers.length} kullanıcı
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                            <Input
                                placeholder="İsim, kullanıcı adı veya email ile ara..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value)
                                    setCurrentPage(1)
                                }}
                                className="pl-9 h-11 bg-white border-gray-200 focus:ring-1 focus:ring-gray-200 transition-all shadow-sm rounded-xl"
                            />
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center gap-2 bg-white p-1 px-2 rounded-xl border border-gray-200 focus-within:ring-1 focus-within:ring-gray-200 transition-all shadow-sm">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v); setCurrentPage(1); }}>
                                    <SelectTrigger className="w-[110px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                        <SelectValue placeholder="Rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tüm Roller</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="user">Kullanıcı</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="w-[1px] h-4 bg-gray-300 mx-1" />

                                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                                    <SelectTrigger className="w-[130px] h-9 border-none bg-transparent shadow-none focus:ring-0">
                                        <SelectValue placeholder="Durum" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tüm Durumlar</SelectItem>
                                        <SelectItem value="active">Aktif</SelectItem>
                                        <SelectItem value="inactive">Pasif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(searchTerm || roleFilter !== "all" || statusFilter !== "all") && (
                                <Button
                                    variant="ghost"
                                    onClick={clearFilters}
                                    className="h-11 px-4 text-muted-foreground hover:text-red-500 hover:bg-red-50/50 transition-all rounded-xl"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Filtreleri Temizle
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold text-foreground/80">Kullanıcı</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Email</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Rol</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Durum</TableHead>
                                    <TableHead className="font-semibold text-foreground/80">Kayıt Tarihi</TableHead>
                                    <TableHead className="text-right font-semibold text-foreground/80">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Yükleniyor...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            Kullanıcı bulunamadı
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedUsers.map((user: any) => (
                                        <TableRow key={user._id} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0">
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <div className="font-medium">{user.name} {user.surname}</div>
                                                        <div className="text-sm text-muted-foreground">@{user.username}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                                            <TableCell>
                                                {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Menüyü aç</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        {user._id !== currentUser?._id && (
                                                            <>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleRoleChange(user._id, user.role === "admin" ? "user" : "admin")}
                                                                >
                                                                    <Shield className="mr-2 h-4 w-4" />
                                                                    {user.role === "admin" ? "Admin Yetkisini Kaldır" : "Admin Yap"}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setSelectedUserId(user._id)
                                                                        setDeleteDialogOpen(true)
                                                                    }}
                                                                    className="text-red-600"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Kullanıcıyı Sil
                                                                </DropdownMenuItem>
                                                            </>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <SimplePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu işlem geri alınamaz. Kullanıcı kalıcı olarak silinecektir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
                            Sil
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
