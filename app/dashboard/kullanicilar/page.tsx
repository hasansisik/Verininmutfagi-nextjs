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
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Shield, Trash2, UserCog } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function KullanicilarPage() {
    const dispatch = useAppDispatch()
    const { allUsers, usersLoading, user: currentUser } = useAppSelector((state) => state.user)

    const [searchTerm, setSearchTerm] = useState("")
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

    const filteredUsers = allUsers?.filter((user: any) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "admin":
                return <Badge variant="destructive">Admin</Badge>
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

            <Card>
                <CardHeader>
                    <CardTitle>Kullanıcılar</CardTitle>
                    <CardDescription>
                        Toplam {filteredUsers.length} kullanıcı
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Kullanıcı ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Kullanıcı</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead>Kayıt Tarihi</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
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
                                    filteredUsers.map((user: any) => (
                                        <TableRow key={user._id}>
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
