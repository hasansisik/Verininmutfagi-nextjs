"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllBlogs, deleteBlog } from "@/redux/actions/blogActions"
import { toast } from "react-toastify"
import Link from "next/link"
import Image from "next/image"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react"

export default function BlogPage() {
    const dispatch = useAppDispatch()
    const { blogs, loading } = useAppSelector((state) => state.blogManagement)

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getAllBlogs({ status: statusFilter === "all" ? undefined : statusFilter }))
    }, [dispatch, statusFilter])

    const handleDeleteBlog = async () => {
        if (!selectedBlogId) return

        try {
            await dispatch(deleteBlog(selectedBlogId)).unwrap()
            toast.success("Blog başarıyla silindi")
            setDeleteDialogOpen(false)
            setSelectedBlogId(null)
            dispatch(getAllBlogs({}))
        } catch (error: any) {
            toast.error(error || "Blog silinirken hata oluştu")
        }
    }

    const filteredBlogs = blogs?.filter((blog: any) =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "published":
                return <Badge className="bg-green-600">Yayında</Badge>
            case "draft":
                return <Badge variant="secondary">Taslak</Badge>
            case "archived":
                return <Badge variant="outline">Arşivlendi</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Blog Yönetimi</h2>
                    <p className="text-muted-foreground">
                        Blog yazılarını görüntüleyin ve yönetin
                    </p>
                </div>
                <Link href="/dashboard/blog/yeni">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Blog
                    </Button>
                </Link>
            </div>

            <Card className="border-none shadow-none bg-transparent">
                <CardHeader>
                    <CardTitle>Bloglar</CardTitle>
                    <CardDescription>
                        Toplam {filteredBlogs.length} blog
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Blog başlığı veya içeriği ile ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 h-11"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Durum" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Durumlar</SelectItem>
                                <SelectItem value="published">Yayında</SelectItem>
                                <SelectItem value="draft">Taslak</SelectItem>
                                <SelectItem value="archived">Arşivlendi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Görsel</TableHead>
                                    <TableHead>Başlık</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Durum</TableHead>
                                    <TableHead>Görüntülenme</TableHead>
                                    <TableHead>Tarih</TableHead>
                                    <TableHead className="text-right">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Yükleniyor...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredBlogs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Blog bulunamadı
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredBlogs.map((blog: any) => (
                                        <TableRow key={blog._id}>
                                            <TableCell>
                                                <Image
                                                    src={blog.thumb}
                                                    alt={blog.title}
                                                    width={60}
                                                    height={40}
                                                    className="rounded object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium max-w-xs">
                                                <div className="truncate">{blog.title}</div>
                                                <div className="text-sm text-muted-foreground truncate">
                                                    {blog.excerpt}
                                                </div>
                                            </TableCell>
                                            <TableCell>{blog.tag}</TableCell>
                                            <TableCell>{getStatusBadge(blog.status)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    {blog.viewCount}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/dashboard/blog/yeni?id=${blog._id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedBlogId(blog._id)
                                                            setDeleteDialogOpen(true)
                                                        }}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
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
                            Bu blog yazısı arşivlenecektir.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteBlog} className="bg-red-600 hover:bg-red-700">
                            Sil
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
